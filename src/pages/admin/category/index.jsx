import { Button, Checkbox, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
// import axios from "axios";
function Category() {
  const handleDelete = (values) => {
    console.log(values);

    api.delete(
      `http://152.42.226.77:8080/swagger-ui/index.html#/category-api/deleteCategory${values.id}`
    );

    setData(Data.filter((data) => data.id != values.id));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Action",
      render: (values) => (
        <Button onClick={() => handleDelete(values)} danger type="primary">
          Delete
        </Button>
      ),
    },
  ];
  const [Data, setData] = useState([]);

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
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    console.log("Success:", values);

    const response = await api.post(
      "https://665d6f09e88051d604068e77.mockapi.io/category",
      values
    );
    console.log(response);
    // add xong - render lai man hinh

    setData([...Data, response.data]);
    setIsModalOpen(false);
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
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="categoryName"
            name="categoryName"
            rules={[
              {
                required: true,
                message: "Please input your categoryName!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={Data} columns={columns} />;
    </div>
  );
}

export default Category;
