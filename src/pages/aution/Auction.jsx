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
import { useState } from "react";
import UserSection from "../../components/userSection";
const { Option } = Select;
import { Typography } from "antd";

function Auction() {
  const [submit, setSubmit] = useState([]);
  const handleOnFinish = (e) => {
    console.log("số tiền cược: ", e);
  };
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
    <section className="auction-page">
      <Row className="auction-page__col">
        <Col span={11} className="auction-page__box-img">
          <div>
            <Image
              className="auction-page__box-img--img"
              width={450}
              // src = img của sản phẩm cược
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiIpAB9oLzJu8_xIyVftZTkkoxkOUoAPeJkA&s"
            />
          </div>
          <h4 className="img-name" style={{ fontWeight: "100" }}>
            Tên món hàng: <strong>món hàng</strong>
          </h4>
        </Col>
        <Col span={8}>
          <Card
            title="Diễn biến cuộc đấu giá"
            className="bet-card"
            bordered={false}
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
            <h1>Cược</h1>
            <Form
              name="basic"
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 12,
              }}
              onFinish={handleOnFinish}
            >
              <Form.Item name="money" label="số tiền Cược">
                {/* defaultValue = số tiền đặt cược cao nhất */}
                <InputNumber addonAfter={selectAfter} defaultValue={100} />
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
                  Cược
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={5}>
          <Card
            className="auction-page__realtime"
            title=""
            style={{ height: "370px" }}
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
                height: "280px",
              }}
            >
              <div
                style={{ overflowY: "auto", padding: "0px 10px 0px 0px" }}
                className="scroll-bar"
              >
                <UserSection />
                <UserSection isMe />
                <UserSection />
                <UserSection />
                <UserSection />
                <UserSection />
                <UserSection />
                <UserSection />
                <UserSection />
                {/* khi nhấn Cược thì isMe */}
                <UserSection isMe />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default Auction;
