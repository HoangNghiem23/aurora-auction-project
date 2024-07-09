import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, Image, Table, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../config/axios";

import Header from "../../components/header";
import Footer from "../../components/footer";
import "./index.scss";
import uploadFile from "../../utils/upload";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import Item from "antd/es/list/Item";

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
  // const response = await api.get("/categoty")
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
      const response = await api.get("/request-buy");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const user = useSelector(selectUser);

  const onFinish = async (values) => {
    try {
      const url = fileList[0]?.originFileObj
        ? await uploadFile(fileList[0].originFileObj)
        : fileList[0].url;
      values.image_url = url;
      // const data = {
      //   ...values,
      //   userid: user.id,
      // };
      // console.log(data);
      // await api.post(`/request-buy/${user.id}`, values);
      await api.post("/request-buy", values);
      form.resetFields();
      setFileList([]);
      fetchData(); // Refresh the data after submitting a new request
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptPreliminary = async (id) => {
    try {
      await api.put(`/request-buy/acpPrelimary/${id}`);
      fetchData(); // Refresh the data after accepting a request
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptFinal = async (id) => {
    try {
      await api.put(`/request-buy/acceptToAuction/${id}`);
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
          <Button type="default" disabled>
            Đang xử lí
          </Button>
        );
      case "PRELIMARY":
        return (
          <Button
            type="primary"
            onClick={() => handleAcceptPreliminary(record.id)}
          >
            Chấp Nhận Định Giá + Gửi Trang Sức
          </Button>
        );
      case "WAITINGMANAGER":
        return (
          <Button type="default" disabled>
            Đang xử lí
          </Button>
        );
      case "FINALVALUATION":
        return (
          <Button type="primary" onClick={() => handleAcceptFinal(record.id)}>
            Chấp Nhận
          </Button>
        );
      case "COMPLETED":
        return (
          <Button type="primary" disabled>
            Hoàn Tất
          </Button>
        );
      default:
        return null;
    }
  };

  const columns = [
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
      title: "Category ID",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Min Price",
      dataIndex: "minPrice",
      key: "minPrice",
    },
    {
      title: "Max Price",
      dataIndex: "maxPrice",
      key: "maxPrice",
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
      key: "action",
      render: (text, record) => {
        return getStatusAction(record);
      },
    },
  ];

  return (
    <div>
      <Header />
      <div className="form-request-sell">
        <div className="title-first">Tell us about your item</div>
        <div className="form-main">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input />
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
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="CategoryName"
              name="category_name"
              rules={[{ required: true, message: "Please select a category!" }]}
            >

              <Select
                options={cate?.map((item) => ({
                  label: item.category_name,
                  value: item.id,
                }))}
              ></Select>

            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          style={{ marginTop: 20 }}
        />
      </div>
      <Footer />
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

export default SellPage;
