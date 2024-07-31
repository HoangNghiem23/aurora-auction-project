import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  Upload,
  Image,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useForm } from "antd/es/form/Form";
import uploadFile from "../../../utils/upload";
import moment from "moment";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function AuctionClose() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentAuction, setCurrentAuction] = useState(null);
  const [currentAuctionDetails, setCurrentAuctionDetails] = useState({});
  const [form] = useForm();
  const [staffList, setStaffList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isOpenJewelry, setIsOpenJewelry] = useState(false);
  const [jewelryData, setJewelryData] = useState([]);
  const [selectionType, setSelectionType] = useState("radio");
  const [jewelry, setJewelry] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isReceived, setIsReceived] = useState(false);
  const navigate = useNavigate();

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const fetchStaffList = async () => {
    try {
      const response = await api.get("/staff");
      setStaffList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStaffJewelry = async () => {
    try {
      const response = await api.get("/jewelry");
      console.log(response.data);
      setJewelryData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStaffList();
    fetchStaffJewelry();
  }, []);

  const option = staffList.map((staff) => {
    return {
      value: staff?.id,
      label: staff?.firstname,
    };
  });

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const fetchData = async () => {
    try {
      const response = await api.get("/auction/GetAuctionISSOLD");
      console.log(response.data);
      const filteredData = response.data.filter(
        (auction) => auction.auctionsStatusEnum == "ISSOLD"
      );
      const responseJewelry = await api.get("/jewelry/getJewelryReady");
      setData(filteredData.bid);
      console.log(filteredData.bid);  
      console.log(filteredData);
      setJewelryData(responseJewelry.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (values) => {
    try {
      await api.delete(`/auction/${values.id}`);
      setData(data.filter((data) => data.id !== values.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClick = async (auction) => {
    try {
      const response = await api.get(`/bid/SuccessfulBidAccount/${auction.id}`);
      setCurrentAuctionDetails(response.data);
      setIsDetailModalOpen(true);
      setIsReceived(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await api.put(`/jewelry/setSENDTOBUYER/${currentAuction.id}`);
      setStatusMessage("Đã nhận");
      setIsReceived(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentAuction(null);
    form.resetFields();
    setFileList([]);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalOpen(false);
    setCurrentAuctionDetails({});
    setStatusMessage("");
  };

  const onFinish = async (values) => {
    const newValue = { ...values, jewelry_id: jewelry.id };
    const startDate = moment(values.start_date.$d).format(
      "YYYY-MM-DDTHH:mm:ss"
    );
    const endDate = moment(values.end_date.$d).format("YYYY-MM-DDTHH:mm:ss");

    newValue.start_date = startDate;
    newValue.end_date = endDate;

    if (values.image.file != undefined) {
      const img = await uploadFile(values.image.file.originFileObj);
      newValue.image = img;
    }

    try {
      const url = fileList[0]?.originFileObj
        ? await uploadFile(fileList[0].originFileObj)
        : fileList[0].url;
      values.image = url;
      values.start_date = values.start_date
        ? values.start_date.toISOString()
        : null;
      values.end_date = values.end_date ? values.end_date.toISOString() : null;
      let response;
      if (isUpdate && currentAuction) {
        response = await api.put(`/auction/${currentAuction.id}`, values);
        const updatedAuctions = data.map((auction) =>
          auction.id === currentAuction.id ? { ...auction, ...values } : auction
        );
        setData(updatedAuctions);
      } else {
        response = await api.post("/auction", newValue);
        setData([...data, response.data]);
      }
      // Gọi API để đổi trạng thái thành UPCOMING
      await api.put(`/auction/UPCOMING/${response.data.id}`);
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Staff",
      dataIndex: "account",
      key: "account",
      render: (account) => (account ? account.firstname : "Unknown"),
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (text) =>
        text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) =>
        text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
    },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image src={text} alt="auction" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Action",
      render: (values) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => handleUpdateClick(values)}
          >
            View Detail
          </Button>
          <Popconfirm
            title="Delete the auction"
            description="Are you sure to delete this auction?"
            onConfirm={() => handleDelete(values)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const columnsJewelry = [
    {
      title: "Category name",
      dataIndex: "category",
      key: "category",
      render: (e) => e.category_name,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setJewelry(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <div>
      <Table dataSource={data} columns={columns} rowKey="id" />
      <Modal
        footer={false}
        title={isUpdate ? "Update Auction" : "Add new Auction"}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="auctionForm"
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
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Staff" name="staff_id">
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              onChange={(value) => console.log(value)}
              options={option}
            />
          </Form.Item>
          <Form.Item name="jewelry_id" label="Jewelry">
            <Button onClick={() => setIsOpenJewelry(true)}>
              {jewelry && jewelry.name ? jewelry.name : "Select Jewelry"}
            </Button>
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="start_date"
            rules={[
              { required: true, message: "Please input the start date!" },
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="end_date"
            rules={[{ required: true, message: "Please input the end date!" }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Image" name="image">
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
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <Modal
        open={isOpenJewelry}
        onCancel={() => setIsOpenJewelry(false)}
        title="Select Jewelry"
        onOk={() => {
          setIsOpenJewelry(false);
        }}
      >
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columnsJewelry}
          dataSource={jewelryData}
          rowKey="id"
        />
      </Modal>
      <Modal
        open={isDetailModalOpen}
        onCancel={handleDetailModalCancel}
        title="Auction Details"
        footer={null}
      >
        <div>
          <p>
            <strong>ID:</strong> {currentAuctionDetails.id}
          </p>
          <p>
            <strong>Name:</strong> {currentAuctionDetails.username}
          </p>
          <p>
            <strong>Amount of Money:</strong>{" "}
            {currentAuctionDetails.amountofmoney}
          </p>
          <p>
            <strong>Amount of Add:</strong> {currentAuctionDetails.amountofadd}
          </p>
          <p>
            <strong>Account Name:</strong>{" "}
            {currentAuctionDetails.account?.username}
          </p>

          {isReceived ? (
            <p>
              <strong>Status:</strong> {statusMessage}
            </p>
          ) : (
            <Button type="primary" onClick={handleStatusUpdate}>
              Đã nhận hàng
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default AuctionClose;
