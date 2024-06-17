import { Button, Form, Input, Modal, Table, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";

function Account() {
  const [Data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const response = await api.get("/Accounts");
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
      await api.delete(`/delete/${values.id}`);
      setData(Data.filter((data) => data.id !== values.id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAccount = (account) => {
    setIsUpdate(true);
    setCurrentAccount(account);
    form.setFieldsValue(account);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setCurrentAccount(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      if (isUpdate && currentAccount) {
        await api.put(`/update/${currentAccount.id}`, values);
        const updatedAccounts = Data.map((account) =>
          account.id === currentAccount.id ? { ...account, ...values } : account
        );
        setData(updatedAccounts);
      } else {
        const response = await api.post("/register", values);
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
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Action",
      render: (values) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => handleUpdateAccount(values)}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete the account"
            description="Are you sure to delete this account?"
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
        Add new account
      </Button>
      <Modal
        footer={false}
        title={isUpdate ? "Update Account" : "Add new Account"}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="accountForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input the last name!" }]}
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

export default Account;
