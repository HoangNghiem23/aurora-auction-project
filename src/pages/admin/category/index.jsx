import { Button, Form, Input, Modal, Table, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";

function Category() {
  const [Data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const response = await api.get("/category");
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
      await api.delete(`/category/${values.id}`);
      setData(Data.filter((data) => data.id !== values.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCategory = (category) => {
    setIsUpdate(true);
    setCurrentCategory(category);
    form.setFieldsValue({ name: category.name });
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentCategory(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      console.log("Form Values:", values); // Debug: Log form values
      if (isUpdate && currentCategory) {
        const response = await api.put(
          `/category/${currentCategory.id}`,
          values
        );
        console.log("Update Response:", response.data); // Debug: Log update response
        const updatedCategories = Data.map((category) =>
          category.id === currentCategory.id
            ? { ...category, ...values }
            : category
        );
        setData(updatedCategories);
      } else {
        const response = await api.post("/category", values);
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
      title: "name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Action",
      render: (values) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => handleUpdateCategory(values)}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
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
        Add new category
      </Button>
      <Modal
        footer={false}
        title={isUpdate ? "Update Category" : "Add new Category"}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="categoryForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Category Name"
            name="category_name"
            rules={[
              { required: true, message: "Please input the category name!" },
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

export default Category;
