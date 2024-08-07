import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  Upload,
  Image,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import api from "../../../config/axios";
import uploadFile from "../../../utils/upload";
import { toast } from "react-toastify";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function RequestAuctionManager() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [form] = useForm();

  const [real, setReal] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

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
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const fetchData = async () => {
    try {
      const response = await api.get("/request-buy");
      const res = response.data;
      const filter = res.filter(
        (item) =>
          item.processes[item.processes.length - 1].requestBuyEnum ==
          "WAITINGMANAGER"
      );
      // console.log(filter)
      setData(filter.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [real]);

  const handleReject = async (values) => {
    try {
      await api.put(`/request-buy/finalValuation/${values.id}`, {
        ...values,
        finalStatus: "REJECTED",
      });
      setData(
        data.map((item) =>
          item?.id === values.id ? { ...item, finalStatus: "REJECTED" } : item
        )
      );
      setReal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (values) => {
    try {
      await api.put(`/request-buy/finalValuation/${values.id}`, {
        ...values,
        finalStatus: "ACCEPTED",
      });

      toast.success("Accept request successfully");
      setData(
        data.map((item) =>
          item?.id === values.id ? { ...item, finalStatus: "ACCEPTED" } : item
        )
      );
      setReal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRequest = (request) => {
    setIsUpdate(true);
    setCurrentRequest(request);
    form.setFieldsValue({
      ...request,
      low_estimated_price: request.minPrice,
      high_estimated_price: request.maxPrice,
      description: request.description,
      category_id: request.category_id,
      conditionReport: request.jewelry?.conditionReport || "",
      image_url: [request.image],
    });
    setIsModalOpen(true);
    setFileList([
      {
        uid: "-1",
        name: "image",
        status: "done",
        url: request.image,
      },
    ]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentRequest(null);
    form.resetFields();
    setFileList([]);
  };

  const onFinish = async (values) => {
    try {
      const img_url = fileList[0]?.originFileObj
        ? await uploadFile(fileList[0].originFileObj)
        : fileList[0].url;

      const dataToSend = {
        ...values,
        image_url: [img_url],
      };

      if (isUpdate && currentRequest) {
        await api.put(
          `/request-buy/sendToManager/${currentRequest.id}`,
          dataToSend
        );
        const updatedRequests = data.map((request) =>
          request.id === currentRequest.id
            ? { ...request, ...dataToSend }
            : request
        );
        setData(updatedRequests);
      }
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "jewelry",
      key: "jewelry",
      render: (jewelry) => jewelry?.name || "",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Low Estimated Price",
      dataIndex: "minPrice",
      key: "minPrice",
    },
    {
      title: "High Estimated Price",
      dataIndex: "maxPrice",
      key: "maxPrice",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Category ID",
      dataIndex: "category_id",
      key: "category_id",
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image src={text} alt="request" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Action",
      render: (values) =>
        values.finalStatus ? (
          <Button type="primary" disabled>
            Accepted
          </Button>
        ) : (
          <>
            {/* {console.log(values.processes[values.processes.length-1])} */}
            <Button
              type="primary"
              style={{ marginRight: 8 }}
              onClick={() => handleAccept(values)}
            >
              Accept
            </Button>
          </>
        ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{
          defaultPageSize: 5,
          position: ["bottomCenter"],
        }}
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
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

export default RequestAuctionManager;
