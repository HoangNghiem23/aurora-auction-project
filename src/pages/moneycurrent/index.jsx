import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { MdAttachMoney } from "react-icons/md";

function MoneyCurrent({ currentMoney, totalUser }) {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Highest Money"
            value={currentMoney}
            valueStyle={{ color: "#3f8600" }}
            prefix={<MdAttachMoney />}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Total User"
            value={totalUser}
            valueStyle={{ color: "black" }}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default MoneyCurrent;
