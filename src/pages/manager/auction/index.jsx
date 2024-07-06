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
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useForm } from "antd/es/form/Form";
import uploadFile from "../../../utils/upload";
import moment from "moment";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/counterSlice";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function AuctionManager() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentAuction, setCurrentAuction] = useState(null);
  const [form] = useForm();
  const [stafflist, setStaffList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const fetchStaffList = async () => {
    const response = await api.get("/staff");
    setStaffList(response.data);
  };
  const navigate = useNavigate();
  useEffect(() => fetchStaffList(), []);

  const option = stafflist.map((staff) => {
    return {
      value: staff?.id,
      label: staff?.firstname,
    };
  });

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
      const response = await api.get("/auction");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleUpdateClick = (auction) => {
    setIsUpdate(true);
    setCurrentAuction(auction);
    setIsModalOpen(true);
    form.setFieldsValue({
      ...auction,
      start_date: auction.start_date ? moment(auction.start_date) : null,
      end_date: auction.end_date ? moment(auction.end_date) : null,
    });
    setFileList([{ url: auction.image }]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentAuction(null);
    form.resetFields();
    setFileList([]);
  };

  const onFinish = async (values) => {
    try {
      const url = fileList[0]?.originFileObj
        ? await uploadFile(fileList[0].originFileObj)
        : fileList[0].url;
      values.image = url;
      values.start_date = values.start_date
        ? values.start_date.toISOString()
        : null;
      values.end_date = values.end_date ? values.end_date.toISOString() : null;

      if (isUpdate && currentAuction) {
        await api.put(`/auction/${currentAuction.id}`, values);
        const updatedAuctions = data.map((auction) =>
          auction.id === currentAuction.id ? { ...auction, ...values } : auction
        );
        setData(updatedAuctions);
      } else {
        const response = await api.post("/auction", values);
        setData([...data, response.data]);
      }
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (values, checked) => {
    console.log(values);
    console.log(checked);
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
            Update
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
    {
      title: "changeAution",
      render: (values) => (
        <>
          <Switch
            defaultChecked={
              values.auctionsStatusEnum == "ISCLOSED" ? false : true
            }
            onChange={(checked) => {
              onChange(values, checked);
            }}
          />
          ;
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between m-3">
        <Button type="primary" onClick={handleOpenModal}>
          Add new auction
        </Button>
        <LogoutOutlined
          style={{ fontSize: "20px" }}
          onClick={() => {
            dispatch(logout());
          }}
        />
      </div>
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

export default AuctionManager;
