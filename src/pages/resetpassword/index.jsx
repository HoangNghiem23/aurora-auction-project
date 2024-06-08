import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Space } from "antd";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import "./index.scss";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [form] = useForm();

  const onFinish = async (values) => {
    try {
      const response = await api.post("/reset-password", {
        ...values,
        token,
      });
      if (response.status === 200) {
        toast.success("Password has been reset successfully");
        navigate("/login");
      } else {
        toast.error("Failed to reset password");
      }
    } catch (error) {
      toast.error("Error resetting password");
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
        <Form
          onFinish={onFinish}
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <h2>Reset your password</h2>
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password style={{ borderRadius: "20px" }} />
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
      </div>
    </div>
  );
};

export default ResetPassword;
