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
const { Option } = Select;
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
        <Col span={12} className="auction-page__box-img">
          <div>
            <Image
              width={450}
              // src = img của sản phẩm cược
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>
          <Descriptions>
            <Descriptions.Item label="name">Tên món hàng</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Card title="Diễn biến cuộc đấu giá">
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
          </Card>
          <Card title="Cược">
            <Form
              name="basic"
              labelCol={{
                span: 4,
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
                <Button type="primary" htmlType="submit">
                  Cược
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default Auction;