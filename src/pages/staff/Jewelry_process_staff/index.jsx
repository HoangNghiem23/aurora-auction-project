import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Upload,
  Image,
  ConfigProvider,
  Popconfirm,
  Tabs,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../../config/axios";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
import { TinyColor } from "@ctrl/tinycolor";
import uploadFile from "../../../utils/upload";
import "./index.scss";
import { render } from "react-dom";
import { toast } from "react-toastify";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const colors1 = ["#6253E1", "#04BEFE"];
const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function RequestSellInStaff() {
  const [Data, setData] = useState([]);
  const [pricedData, setPricedData] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [priceForm] = useForm();
  const [form] = useForm();
  const [managerForm] = useForm();
  const [activeTab, setActiveTab] = useState("tab1");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [dataManager, setDataManager] = useState([]);
  const fetchData = async () => {
    try {
      const response = await api.get("/request-buy");
      const priced = response.data.filter(
        (item) => item.minPrice && item.maxPrice
      );
      const unpriced = response.data
        .sort((b, a) => a.id - b.id)
        .filter((item) => !item.minPrice && !item.maxPrice);
      console.log(
        response.data.map((item) =>
          item.processes.filter(
            (process) => process.requestBuyEnum === "WAITINGMANAGER"
          )
        )
      );
      const dataManager = response.data.map((item) =>
        item.processes.filter(
          (process) => process.requestBuyEnum === "WAITINGMANAGER"
        )
      );
      const listManager = [];
      console.log(
        dataManager.map((item) => {
          if (item.length > 0) {
            listManager.push(item[0]);
          }
        })
      );
      setDataManager(listManager);
      const managerRequests = response.data.filter(
        (item) => item.requestBuyEnum === "WAITINGMANAGER"
      );
      setData(unpriced);
      setPricedData(priced);
      setManagerData(managerRequests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenPriceModal = (request) => {
    setCurrentRequest(request);
    setIsPriceModalOpen(true);
  };

  const handleOpenManagerModal = (request) => {
    setCurrentRequest(request);
    setIsManagerModalOpen(true);
    managerForm.setFieldsValue({
      name: request.jewelry?.name || "",
      low_estimated_price: request.minPrice,
      high_estimated_price: request.maxPrice,
      weight: 0, // Default value, adjust if needed
      description: request.description,
      category_id: request.category_id,
      image_url: [request.image],
      conditionReport: request.jewelry?.conditionReport || "", // Add default or existing value if available
    });
    setFileList([
      {
        uid: "-1",
        name: "image",
        status: "done",
        url: request.image,
      },
    ]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsPriceModalOpen(false);
    setIsManagerModalOpen(false);
    setIsUpdate(false);
    setCurrentRequest(null);
    form.resetFields();
    priceForm.resetFields();
    managerForm.resetFields();
    setFileList([]);
  };

  const handlePriceSubmit = async (values) => {
    try {
      await api.put(`/request-buy/prelimary/${currentRequest.id}`, values);
      toast.success("Prelimary succesfullly");
      handleCancel();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleManagerSubmit = async (values) => {
    try {
      const img_url = fileList[0]?.originFileObj
        ? await uploadFile(fileList[0].originFileObj)
        : fileList[0].url;

      const dataToSend = {
        ...values,
        image_url: img_url,
      };

      console.log("Submitting data to manager:", dataToSend);

      await api.put(
        `/request-buy/sendToManager/${currentRequest.id}`,
        dataToSend
      );
      toast.success("Successfully");
      setPricedData(pricedData.filter((item) => item.id !== currentRequest.id));
      setManagerData([
        ...managerData,
        { ...currentRequest, ...dataToSend, requestBuyEnum: "SENT_TO_MANAGER" },
      ]);

      handleCancel();
    } catch (error) {
      console.log("Error submitting data to manager:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    try {
      const url = fileList[0]?.originFileObj
        ? await uploadFile(fileList[0].originFileObj)
        : fileList[0].url;
      values.image_url = url;

      if (isUpdate && currentRequest) {
        await api.put(`/request-buy/${currentRequest.id}`, values);
        const updatedRequests = Data.map((request) =>
          request.id === currentRequest.id ? { ...request, ...values } : request
        );
        setData(updatedRequests);
      } else {
        const response = await api.post("/request-buy", values);
        setData([...Data, response.data]);
      }
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8, width: 30 }}>Upload</div>
    </button>
  );

  const columnsTab1 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image src={text} alt="photo" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      render: (values) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8, width: 300 }}
            onClick={() => handleOpenPriceModal(values)}
          >
            Price Estimate
          </Button>
        </>
      ),
    },
  ];

  const columnsTab2 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image src={text} alt="photo" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Preliminary",
      render: (values) => `${values.minPrice} - ${values.maxPrice}`,
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => {
        const latestProcess = record.processes[record.processes.length - 1];
        return latestProcess.requestBuyEnum;
      },
    },
    {
      title: "Action",
      render: (values, record) => (
        <Button
          disabled={
            record.processes[record.processes.length - 1].requestBuyEnum !==
            "ACPBYUSER"
          }
          type="primary"
          onClick={() => handleOpenManagerModal(values)}
        >
          Send to Manager
        </Button>
      ),
    },
  ];

  const columnsTab3 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image src={text} alt="photo" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price Estimate",
      render: (values) =>
        `${values.low_estimated_price} - ${values.high_estimated_price}`,
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => {
        const latestProcess = record.processes[record.processes.length - 1];
        return latestProcess.requestBuyEnum;
      },
    },
  ];

  const columns = {
    tab1: columnsTab1,
    tab2: columnsTab2,
    tab3: columnsTab3,
  };

  const tabItems = [
    {
      key: "tab1",
      label: "Request Auction",
      children: (
        <Table
          dataSource={Data}
          columns={columns.tab1}
          rowKey="id"
          pagination={{
            defaultPageSize: 5,
          }}
        />
      ),
    },
    {
      key: "tab2",
      label: "Preliminary Valuation Done",
      children: (
        <Table
          dataSource={pricedData}
          columns={columns.tab2}
          rowKey="id"
          pagination={{
            defaultPageSize: 5,
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal} className="add-request">
        Add new request
      </Button>
      <Tabs
        defaultActiveKey="tab1"
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
      />
      <Modal
        footer={false}
        title={isUpdate ? "Update Request" : "Add new Request"}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="requestForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Photo" name="image_url">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Price Estimate"
        open={isPriceModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={priceForm}
          name="priceForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handlePriceSubmit}
        >
          <Form.Item
            label="Min Price"
            name="minPrice"
            rules={[{ required: true, message: "Please input the min price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Max Price"
            name="maxPrice"
            rules={[{ required: true, message: "Please input the max price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Send to Manager"
        open={isManagerModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={managerForm}
          name="managerForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleManagerSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Low Estimated Price"
            name="low_estimated_price"
            rules={[
              {
                required: true,
                message: "Please input the low estimated price!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="High Estimated Price"
            name="high_estimated_price"
            rules={[
              {
                required: true,
                message: "Please input the high estimated price!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Weight"
            name="weight"
            rules={[{ required: true, message: "Please input the weight!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Category ID"
            name="category_id"
            rules={[
              { required: true, message: "Please input the category ID!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Condition Report"
            name="conditionReport"
            rules={[
              { required: true, message: "Please input the condition report!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Image URL" name="image_url">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Send to Manager
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default RequestSellInStaff;
