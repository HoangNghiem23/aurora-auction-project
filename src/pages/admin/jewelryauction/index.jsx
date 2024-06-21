import { Button, Form, Input, Modal, Table, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";

function DiamondAuction() {
  const [Data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentAuction, setCurrentAuction] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const response = await api.get("/auctions");
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
      await api.delete(`/auctions/${values.id}`);
      setData(Data.filter((data) => data.id !== values.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAuction = (auction) => {
    setIsUpdate(true);
    setCurrentAuction(auction);
    form.setFieldsValue(auction);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentAuction(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      if (isUpdate && currentAuction) {
        await api.put(`/auctions/${currentAuction.id}`, values);
        const updatedAuctions = Data.map((auction) =>
          auction.id === currentAuction.id ? { ...auction, ...values } : auction
        );
        setData(updatedAuctions);
      } else {
        const response = await api.post("/auctions", values);
        setData([...Data, response.data]);
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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="product" width="50" />,
    },
    {
      title: "Starting Bid",
      dataIndex: "startingBid",
      key: "startingBid",
    },
    {
      title: "Bid Step",
      dataIndex: "bidStep",
      key: "bidStep",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Action",
      render: (values) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => handleUpdateAuction(values)}
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
  ];

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Add new auction
      </Button>
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
            label="Image URL"
            name="image"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Starting Bid"
            name="startingBid"
            rules={[
              { required: true, message: "Please input the starting bid!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Bid Step"
            name="bidStep"
            rules={[{ required: true, message: "Please input the bid step!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[
              { required: true, message: "Please input the start time!" },
            ]}
          >
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: "Please input the end time!" }]}
          >
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={Data} columns={columns} rowKey="id" />
    </div>
  );
}

export default DiamondAuction;
