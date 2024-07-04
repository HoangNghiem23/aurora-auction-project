import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Image,
  InputNumber,
  Row,
  Select,
} from "antd";
import "./aution.scss";
import { DollarOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import UserSection from "../../components/userSection";
const { Option } = Select;
import { useParams } from "react-router-dom";
import api from "../../config/axios";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import Header from "../../components/header";
import { toast } from "react-toastify";
import MoneyCurrent from "../moneycurrent";

function Auction() {
  const [submit, setSubmit] = useState([]);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);
  const lastItemRef = useRef(null);

  const fetch = async () => {
    try {
      const response = await api.get(`/auction/${id}`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnFinish = async (values) => {
    try {
      const response = await api.post(`/bid/addhigherBid/${id}`, {
        amountofmoney: values.amountofadd,
      });
      console.log("Bid successfully placed: ", response.data);
      // Re-fetch data to get the updated bid list

      toast.success("Bid successfully placed");
      form.resetFields();
      fetch();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data?.bid]);

  const selectAfter = (
    <Select
      defaultValue="USD"
      style={{
        width: 60,
      }}
    >
      <Option value="USD">$</Option>
      <Option value="EUR">€</Option>
      <Option value="GBP">£</Option>
      <Option value="CNY">¥</Option>
    </Select>
  );

  return (
    <div>
      <Header />
      <section className="auction-page">
        <Row className="auction-page__col">
          <Col span={10} className="auction-page__box-img">
            <div>
              <Image
                className="auction-page__box-img--img"
                width={450}
                // src = img của sản phẩm cược
                src={data?.image}
              />
            </div>
            <h4 className="img-name" style={{ fontWeight: "100"}}>
              Tên món hàng: <strong>món hàng</strong>
            </h4>
          </Col>

          <Col span={8}>
            <div
              style={{
                marginBottom: "20px",
                
              }}

            >
              <MoneyCurrent
                currentMoney={data?.jewelry?.last_price}
                totalUser={data?.totalUser}
              />
            </div>
            <Card
              title="Diễn biến cuộc đấu giá"
              className="bet-card"
              bordered={false}
              style={{ height: "400px" }}
            >
              <Descriptions title="User Info">
                <Descriptions.Item label="status" span={24}>
                  status
                </Descriptions.Item>
                <Descriptions.Item label={<EyeOutlined />}>
                  people
                </Descriptions.Item>
                <Descriptions.Item label={<DollarOutlined />}>
                  money
                </Descriptions.Item>
              </Descriptions>
              <Form
                form={form}
                name="basic"
                labelCol={{
                  span: 5,
                }}
                wrapperCol={{
                  span: 12,
                }}
                onFinish={handleOnFinish}
              >
                <Form.Item
                  name="amountofadd"
                  label="số tiền Cược"
                  rules={[
                    { required: true, message: "Please input your bid!" },
                  ]}
                >
                  {/* defaultValue = số tiền đặt cược cao nhất */}
                  <InputNumber addonAfter={selectAfter} defaultValue={1000} />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ background: " rgb(37, 35, 44)" }}
                  >
                    Bid
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={5}>
            <Card
              className="auction-page__realtime"
              title=""
              style={{ height: "500px" }}
            >
              <h3
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  color: "red",
                  fontWeight: "400",
                  margin: "5px",
                }}
              >
                Diễn biến cuộc đấu giá
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  height: "400px",
                }}
              >
                <div
                  style={{ overflowY: "scroll", padding: "0px 10px 0px 0px" }}
                  className="scroll-bar"
                >
                  {data?.bid
                    ?.sort((a, b) => a.amountofmoney - b.amountofmoney)
                    .map((item, index, array) => (
                      <div
                        key={item.id}
                        ref={index === array.length - 1 ? lastItemRef : null}
                      >
                        <UserSection
                          isMe={user?.id === item?.account.id}
                          name={item?.account.lastname}
                          money={item?.amountofmoney}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default Auction;
