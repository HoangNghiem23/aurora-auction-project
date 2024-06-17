import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import api from "../../../config/axios";

function ManagerJewelry() {
  const [form] = useForm();
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentJewelry, setCurrentJewelry] = useState(null);

  const handleDelete = async (values) => {
    await api.delete(`/jewelry/${values.id}`);
    setData(data.filter((item) => item.id !== values.id));
  };

  const handleUpdateJewelry = (jewelry) => {
    setIsUpdate(true);
    setCurrentJewelry(jewelry);
    setIsOpen(true);
    form.setFieldsValue(jewelry);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Jewelry Name",
      dataIndex: "jewelryName",
      key: "jewelryName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Estimate Price Min",
      dataIndex: "estimate_price_min",
      key: "estimate_price_min",
    },
    {
      title: "Estimate Price Max",
      dataIndex: "estimate_price_max",
      key: "estimate_price_max",
    },
    {
      title: "Action",
      key: "action",
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

  async function fetchJewelry() {
    try {
      const response = await api.get("/jewelry");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleHideModal = () => {
    setIsOpen(false);
    setIsUpdate(false);
    setCurrentJewelry(null);
    form.resetFields();
  };

  function handleOK() {
    form.submit();
  }

  async function handleSubmit(values) {
    if (isUpdate && currentJewelry) {
      await api.put(`/jewelry/${currentJewelry.id}`, values);
      const updatedJewelry = data.map((jewelry) =>
        jewelry.id === currentJewelry.id ? { ...jewelry, ...values } : jewelry
      );
      setData(updatedJewelry);
    } else {
      const response = await api.post("/jewelry", values);
      setData([...data, response.data]);
    }

    form.resetFields();
    handleHideModal();
  }

  useEffect(() => {
    fetchJewelry();
  }, []);

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Add New Jewelry
      </Button>
      <Table columns={columns} dataSource={data}></Table>

      <Modal
        title={isUpdate ? "Update Jewelry" : "Add New Jewelry"}
        open={isOpen}
        onCancel={handleHideModal}
        onOk={handleOK}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Jewelry Name"
            name="jewelryName"
            rules={[
              { required: true, message: "Please input the jewelry name!" },
            ]}
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
          <Form.Item
            label="Estimate Price Min"
            name="estimate_price_min"
            rules={[
              {
                required: true,
                message: "Please input the estimate price min!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Estimate Price Max"
            name="estimate_price_max"
            rules={[
              {
                required: true,
                message: "Please input the estimate price max!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagerJewelry;
