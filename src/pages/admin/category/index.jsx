import { Button, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";

function Category() {
  const handleDelete = async (values) => {
    try {
      await api.delete(`/category/${values.id}`);
      setData(Data.filter((data) => data.id !== values.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (values) => {
    setEditingCategory(values);
    setIsEditModalOpen(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "categoryName",
    },
    {
      title: "Action",
      render: (values) => (
        <span>
          <Button onClick={() => handleEdit(values)} type="primary">
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(values)}
            danger
            type="primary"
            style={{ marginLeft: "8px" }}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const [Data, setData] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await api.get("/category");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [Data]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };
  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await api.post("/category", values);
      setData([...Data, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onEditFinish = async (values) => {
    try {
      const response = await api.put(`/category/${editingCategory.id}`, values);
      setData(
        Data.map((data) =>
          data.id === editingCategory.id ? response.data : data
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add new category
      </Button>
      <Modal
        footer={false}
        title="Add New Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="category_name"
            rules={[
              { required: true, message: "Please input your category name!" },
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

      <Modal
        footer={false}
        title="Edit Category"
        open={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="edit"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ categoryName: editingCategory?.categoryName }}
          onFinish={onEditFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="category_name"
            rules={[
              { required: true, message: "Please input your category name!" },
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

      <Table dataSource={Data} columns={columns} />
    </div>
  );
}

export default Category;
