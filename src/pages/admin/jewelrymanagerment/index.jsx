import { Button, Form, Input, Modal, Table, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";

function JewelryManagement() {
  const [Data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentJewelry, setCurrentJewelry] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const response = await api.get("/jewelry");
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
      await api.delete(`/jewelry/${values.id}`);
      setData(Data.filter((data) => data.id !== values.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateJewelry = (jewelry) => {
    setIsUpdate(true);
    setCurrentJewelry(jewelry);
    form.setFieldsValue({
      title: jewelry.title,
      low_estimated_price: jewelry.low_estimated_price,
      high_estimated_price: jewelry.high_estimated_price,
      weight: jewelry.weight,
      description: jewelry.description,
      category_id: jewelry.category_id,
      conditionReport: jewelry.conditionReport,
    });
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentJewelry(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      console.log("Form Values:", values); // Debug: Log form values
      if (isUpdate && currentJewelry) {
        const response = await api.put(`/jewelry/${currentJewelry.id}`, values);
        console.log("Update Response:", response.data); // Debug: Log update response
        const updatedJewelry = Data.map((jewelry) =>
          jewelry.id === currentJewelry.id ? { ...jewelry, ...values } : jewelry
        );
        setData(updatedJewelry);
      } else {
        const response = await api.post("/jewelry", values);
        console.log("Create Response:", response.data); // Debug: Log create response
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Low Estimated Price",
      dataIndex: "low_estimated_price",
      key: "low_estimated_price",
    },
    {
      title: "High Estimated Price",
      dataIndex: "high_estimated_price",
      key: "high_estimated_price",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
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
      title: "Condition Report",
      dataIndex: "conditionReport",
      key: "conditionReport",
    },
    {
      title: "Action",
      render: (values) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => handleUpdateJewelry(values)}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete the jewelry"
            description="Are you sure to delete this jewelry?"
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
        Add new jewelry
      </Button>
      <Modal
        footer={false}
        title={isUpdate ? "Update Jewelry" : "Add new Jewelry"}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="jewelryForm"
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
            label="Low Estimated Price"
            name="low_estimated_price"
            rules={[
              {
                required: true,
                message: "Please input the low estimated price!",
              },
            ]}
          >
            <Input />
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Weight"
            name="weight"
            rules={[{ required: true, message: "Please input the weight!" }]}
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Category ID"
            name="category_id"
            rules={[
              { required: true, message: "Please input the category ID!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Condition Report"
            name="conditionReport"
            rules={[
              { required: true, message: "Please input the condition report!" },
            ]}
          >
            <Input />
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

export default JewelryManagement;
