import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Space } from "antd";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import "./index.scss";

const ForgetPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [form] = useForm();

  const onFinish = async (values) => {
    try {
      console.log(values);
      await api.post("/forget-password", values);
      setSubmitted(true);
      toast.success("Reset password link has been sent to your email");
    } catch (error) {
      toast.error("Error sending reset link");
      console.log(error.response ? error.response.data.error : error.message);
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
        {!submitted ? (
          <Form
            onFinish={onFinish}
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
          >
            <h2>Reset your password</h2>
            <p>
              Please enter your email address. You will receive a secure link to
              reset your password.
            </p>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  htmlType="submit"
                  className="btnStyle"
                  form={form}
                  onClick={() => form.submit()}
                >
                  Submit
                </Button>
              </Space>
            </Form.Item>
            <Form.Item>
              <Button type="link" onClick={() => navigate("/login")}>
                Back to log in
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div className="request-submitted">
            <h2>Request submitted</h2>
            <p>
              If an account exists for the provided email, you will receive an
              email with a secure link to reset your password. If you do not
              receive this email, check your spam folder or create an account.
            </p>
            <Button type="link" onClick={() => navigate("/login")}>
              Back to log in
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
