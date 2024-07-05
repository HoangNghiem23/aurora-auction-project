import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Space } from "antd";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/counterSlice";
import { useForm } from "antd/es/form/Form";
import { auth, googleProvider } from "../../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function LoginPopup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = useForm();

  const onFinish = async (values) => {
    try {
      const response = await api.post("/login", values);
      if (response && response.data) {
        const user = response.data;
        console.log(user);
        dispatch(login(user));
        localStorage.setItem("token", user.token); // Save token to localStorage
        localStorage.setItem("role", user.roleEnum); // Save role to localStorage
        toast.success("Login success");
        if (user.roleEnum === "STAFF") {
          navigate("/staff");

        } else if (user.roleEnum === "MANAGER") {
          navigate("/manager");
        } else if (user.roleEnum === "ADMIN") {
          navigate("/admin");

        } else {
          navigate("/");
        }
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error) {
      if (!navigator.onLine) {
        toast.error("No internet connection");
      } else {
        toast.error("Login failed");
        console.log(error.response ? error.response.data.error : error.message);
      }
      form.resetFields();
    }
  };

  const handleLoginGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const token = result.user.accessToken;
        try {
          const response = await api.post("/api/loginGG", { token: token });
          if (response && response.data) {
            const user = response.data;
            dispatch(login(user));
            localStorage.setItem("token", user.token); // Save token to localStorage
            localStorage.setItem("role", user.role); // Save role to localStorage
            toast.success("Login success");
            navigate("/");
          } else {
            toast.error("Invalid response from server");
          }
        } catch (error) {
          toast.error("Login with Google failed");
          console.log(
            error.response ? error.response.data.error : error.message
          );
        }
      })
      .catch((error) => {
        toast.error("Google login failed");
        console.log(error);
      });
  };

  return (
    <div className="loginPage">
      <div className="loginPage__left">
        <img
          src="https://i.pinimg.com/originals/5e/47/a8/5e47a80fa0cbfb1e51034a17841d1d86.jpg"
          alt=""
        />
      </div>
      <div className="loginPage__right ">
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
            display: "flex",
            flexDirection: "column",
            paddingLeft: "100px",
          }}
          onFinish={onFinish}
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <h2
            style={{ textAlign: "start", fontSize: "40px", fontWeight: "1000" }}
          >
            Login Page
          </h2>
          <Form.Item
            name="username"
            label="User name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password className="passwordcss" />
            <div>
              <span
                onClick={() => navigate("/forget-password")}
                style={{ cursor: "pointer" }}
                className="forget-password"
              >
                Forget your password?
              </span>
            </div>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                htmlType="submit"
                className="btnStyle"
                form={form}
                onClick={() => form.submit()}
              >
                Login
              </Button>
            </Space>
          </Form.Item>

          <Form.Item>
            <p style={{ textAlign: "center", fontWeight: "700" }}>Or</p>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                onClick={handleLoginGoogle}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  cursor: "pointer",
                  borderRadius: "20px",
                }}
                form={form}
              >
                <img
                  width={30}
                  src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
                  alt=""
                />
                Login with Google
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <p className="login-footer">
          Do not have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPopup;
