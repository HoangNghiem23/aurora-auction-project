import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Space } from "antd";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import api from "../../config/axios";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function RegisterPopup() {
  const navigate = useNavigate();
  const [form] = useForm();

  const onFinish = async (values) => {
    try {
      console.log(values);
      await api.post("/register", values);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
      console.log(error.response.data.error);
      form.resetFields();
    }
  };

  return (
    <div className="loginPage">
      <div className="loginPage__left">
        <img
          src="https://i.pinimg.com/originals/5e/47/a8/5e47a80fa0cbfb1e51034a17841d1d86.jpg"
          alt=""
        />
      </div>
      <div className="loginPage__right">
        <>
          <Form
            onFinish={onFinish}
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
          >
            <h2>Register Page</h2>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div className="horizontalForm">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="password_conform"
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                visibilityToggle={true}
              />
            </Form.Item>
            <Form.Item
              className="password_conform"
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                visibilityToggle={true}
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  htmlType="submit"
                  className="btnStyle"
                  form={form}
                  onClick={() => form.submit()}
                >
                  Sign Up
                </Button>
              </Space>
            </Form.Item>

            <Form.Item>
              <p className="signin">
                Already have an account? <Link to="/login">Signin</Link>
              </p>
            </Form.Item>
          </Form>
        </>
      </div>
    </div>
  );
}

export default RegisterPopup;
