import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Upload,
  Image,
  Table,
  Select,
  Tabs,
  Alert,
  Steps,
  Tooltip,
  Drawer,
  Divider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../config/axios";

import "./index.scss";
import uploadFile from "../../utils/upload";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function SellPage() {
  const [fileList, setFileList] = useState([]);
  const [cate, setCate] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const fetchCategory = async () => {
    try {
      const response = await api.get("/category");
      setCate(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/request-buy/getRequestByAccountID");
      setData(response.data.sort((b, a) => a.id - b.id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (values) => {
    try {
      const url = fileList[0]?.originFileObj
        ? await uploadFile(fileList[0].originFileObj)
        : fileList[0].url;
      values.image_url = url;

      await api.post("/request-buy", values);
      toast.success("Add new request sell successfully");

      form.resetFields();
      setFileList([]);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptPreliminary = async (id) => {
    try {
      await api.put(`/request-buy/acpPrelimary/${id}`);
      toast.success("Accept Prelimary successfully");
      fetchData(); // Refresh the data after accepting a request
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptFinal = async (id) => {
    try {
      await api.put(`/request-buy/acceptToAuction/${id}`);
      toast.success("Accept to auction successfully");

      fetchData(); // Refresh the data after accepting a request
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await api.put(`/request-buy/complete/${id}`);

      fetchData(); // Refresh the data after completing a request
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusAction = (record) => {
    const latestProcess = record.processes[record.processes.length - 1];
    switch (latestProcess.requestBuyEnum) {
      case "PENDING":
        return (
          <Button type="default" disabled className="btn_request_sell">
            In Progress
          </Button>
        );
      case "PRELIMARY":
        return (
          <Tooltip
            placement="bottom"
            title="Accept Valuation + Send jewelry to company"
          >
            <Button
              type="primary"
              className="btn_request_sell"
              onClick={() => handleAcceptPreliminary(record.id)}
            >
              Accept
            </Button>
          </Tooltip>
        );
      case "WAITINGMANAGER":
        return (
          <Button type="default" disabled className="btn_request_sell">
            In Progress
          </Button>
        );
      case "FINALVALUATION":
        return (
          <Button
            type="primary"
            className="btn_request_sell"
            onClick={() => handleAcceptFinal(record.id)}
          >
            Accept
          </Button>
        );
      case "COMPLETED":
        return (
          <Button type="primary" disabled className="btn_request_sell">
            Completed
          </Button>
        );
      default:
        return null;
    }
  };

  // const columns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Image",
  //     dataIndex: "image",
  //     key: "image",
  //     render: (abc) => (
  //       <Image src={abc} alt="photo" style={{ width: "100px" }} />
  //     ),
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     key: "description",
  //   },
  //   {
  //     title: "Category ID",
  //     dataIndex: "category_id",
  //     key: "category_id",
  //   },
  //   {
  //     title: "Weight",
  //     dataIndex: "weight",
  //     key: "weight",
  //   },
  //   {
  //     title: "Material",
  //     dataIndex: "material",
  //     key: "material",
  //   },
  //   {
  //     title: "Min Price",
  //     dataIndex: "minPrice",
  //     key: "minPrice",
  //   },
  //   {
  //     title: "Max Price",
  //     dataIndex: "maxPrice",
  //     key: "maxPrice",
  //   },
  //   {
  //     title: "Status",
  //     key: "status",
  //     render: (text, record) => {
  //       const latestProcess = record.processes[record.processes.length - 1];
  //       return latestProcess.requestBuyEnum;
  //     },
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (text, record) => {
  //       return getStatusAction(record);
  //     },
  //   },
  // ];

  const columns = [
    {
      title: "ITEM DESCRIPTION",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const category = cate.find((item) => item.id === record.category_id);
        const categoryName = category ? category.category_name : "Unknown";

        return (
          <div>
            <div className="item_description_sell_request">
              <div className="item_description_sell_request_img">
                <Image src={record.image} alt="photo" />
              </div>
              <div className="item_description_sell_request_text">
                <h1 className="item_description_sell_request_text_h1">
                  {record.name}
                </h1>
                <p className="item_description_sell_request_text_cate">
                  {categoryName} • Jewellery
                </p>
                <p className="item_description_sell_request_text_date_submit">
                  Submitted: 29 thg 7, 2024
                </p>
              </div>
            </div>
          </div>
        );
      },
    },

    {
      title: "Status",
      key: "status",
      render: (text, record) => {
        const latestProcess = record.processes[record.processes.length - 1];
        const steps = [
          { title: "Pending", status: "PENDING" },
          { title: "Preliminary", status: "PRELIMARY" },
          { title: "Accepted by User", status: "ACPBYUSER" },
          { title: "Waiting for Manager", status: "WAITINGMANAGER" },
          { title: "Final Valuation", status: "FINALVALUATION" },
          { title: "Completed", status: "COMPLETED" },
        ];

        const currentStep = steps.findIndex(
          (step) => step.status === latestProcess.requestBuyEnum
        );

        return (
          <Steps current={currentStep} size="small" labelPlacement="vertical">
            {steps.map((step, index) => (
              <Steps.Step key={index} title={step.title} />
            ))}
          </Steps>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return getStatusAction(record);
      },
    },
    {
      title: "Detail",
      key: "detail",
      render: (text, record) => {
        return (
          <div
            type="primary"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              color: isHovered ? "#0a678f" : "#00253e",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={() => {
              setDrawerData(record);
              setDrawerVisible(true);
            }}
          >
            Details
          </div>
        );
      },
    },
  ];

  const [isHovered, setIsHovered] = useState(false);

  const tabItems = [
    {
      key: "tab1",
      label: "Request Auction",
      children: (
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input placeholder="Please input name jewelry" />
          </Form.Item>

          <Form.Item
            label="CategoryName"
            name="category_id"
            style={{ width: 500 }}
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select
              placeholder="Please input name category jewelry"
              options={cate?.map((item) => ({
                label: item.category_name,
                value: item.id,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Weight"
            name="weight"
            rules={[
              { required: true, message: "Please input the weight!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Weight must be greater than 0")
                  );
                },
              }),
            ]}
          >
            <Input type="number" placeholder="Please input weight jewelry" />
          </Form.Item>
          <Form.Item
            label="Material"
            name="material"
            rules={[{ required: true, message: "Please input the material!" }]}
          >
            <Input placeholder="Please input name category jewelry" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <TextArea
              rows={5}
              placeholder="Please input your descripsion"
              maxLength={100}
            />
          </Form.Item>

          <Form.Item
            label="Photo"
            name="image_url"
            rules={[{ required: true, message: "Please upload a photo!" }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                fontSize: "18px",
                color: "#fff",
                backgroundColor: "#00253e",
                width: "500px",
                marginTop: "20px",
                marginBottom: "50px",
                height: "50px",
                backgroundColor: isHovered ? "#0a678f" : "#00253e",
              }}
            >
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "tab2",
      label: "Preliminary Valuation Done",
      children: (
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          style={{ marginTop: 20, marginBottom: 50 }}
          pagination={{
            defaultPageSize: 5,
            position: ["bottomCenter"],
          }}
        />
      ),
    },
  ];

  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  const description = "This is a description.";

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState({});

  return (
    <div>
      <div className="form-request-sell">
        <div className="title-first">Tell us about your item</div>
        <div className="form-main">
          <Tabs
            defaultActiveKey="tab1"
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            centered
            style={{ fontSize: 30 }}
          />
        </div>
      </div>
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
      <Drawer
        title="Details"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={500}
        style={{ textAlign: "center" }}
      >
        <Image src={drawerData.image} width={300} alt="photo" />
        <Divider
          plain
          style={{
            fontSize: "32px",
            color: "grey",
            fontWeight: "600",
            fontFamily:
              "Mercury Display A,Mercury Display B,MercuryDisplay-wb,Mercury Display,serif",
          }}
        >
          {drawerData.name}
        </Divider>

        <p className="detail_popup_request_sell">
          <strong>Description:</strong> {drawerData.description}
        </p>
        <p className="detail_popup_request_sell">
          <strong>Weight:</strong> {drawerData.weight}
        </p>
        <p className="detail_popup_request_sell">
          <strong>Material:</strong> {drawerData.material}
        </p>
        <p className="detail_popup_request_sell">
          <strong>Min Price:</strong> {drawerData.minPrice}
        </p>
        <p className="detail_popup_request_sell">
          <strong>Max Price:</strong> {drawerData.maxPrice}
        </p>
        <p className="detail_popup_request_sell">
          <strong>Category:</strong>{" "}
          {cate.find((item) => item.id === drawerData.category_id)
            ?.category_name || "Unknown"}
        </p>
        <p className="detail_popup_request_sell">
          <strong>Status:</strong> {drawerData.requestBuyEnum}
        </p>
      </Drawer>
    </div>
  );
}

export default SellPage;
