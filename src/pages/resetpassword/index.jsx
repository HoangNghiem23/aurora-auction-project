import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
// import "./index.scss";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://152.42.226.77:8080/api/reset-password",
        {
          password: values.newPassword,
        },
        config
      );
      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error resetting password");
      console.log(error.response ? error.response.data.error : error.message);
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
          name="basic"
          labelCol={{
            span: 4,
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
          autoComplete="off"
        >
          <Form.Item
            label="New Password"
            labelCol={{ span: "24" }}
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password !",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            labelCol={{ span: "24" }}
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button
              className="btn btn-primary btn-lg"
              style={{
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
                paddingBottom: "2.5rem",
              }}
              type="primary"
              htmlType="submit"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
