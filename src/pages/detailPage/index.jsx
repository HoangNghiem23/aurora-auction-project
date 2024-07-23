import React, { useEffect, useState } from "react";
import { Card, Image, Button, Row, Col, Typography, Collapse } from "antd";
import "./index.scss";
import { Link, useParams } from "react-router-dom";
import api from "../../config/axios";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const AuctionItem = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const fetch = async () => {
    try {
      const response = await api.get(`/auction/${id}`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="auction-item">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={15}>
          <Card hoverable className="image-card">
            <Image
              width="738px"
              height="653px"
              src={data?.image} // replace with your main image path
              preview={false}
            />
          </Card>
          <div className="lot-details">
            <Title level={2}>Lot Details</Title>
            <Title level={3}>Description</Title>
            <Text>
              <strong>Echézeaux 1997</strong>
              <br />
              Domaine de la Romanée-Conti
              <br />
              Côte de Nuits, Grand Cru
              <br />
              Banded prior to inspection, u. 1x4cm, in consecutive bottle
              numbers, 1 very slightly scuffed label, slightly scuffed capsules,
              1 slightly raised cork, Swiss import back labels
              <br />
              <br />
              Lovely, perfumed strawberry nose. Stashed with scented red fruit
              on the palate. Lovely balancing acidity. Red cherries predominate.
              It is actually ready to drink but, of course, will last. Serena
              Sutcliffe, MW
              <br />
              <br />
              香水般的草莓氣息，令人悠然神往。此酒帶有成熟芳香的紅肉水果味，特別是紅櫻桃味，還有一份優雅平衡的酸香。此酒現已適宜享用，但絕對可以繼續陳年。施慧娜（葡萄酒大師M.W.）
              <br />
              <br />6 bts (owc)
            </Text>
            <Text italic>
              Please note that for Wine and Spirits Lots, the Buyer's Premium
              rate is 24% of the Hammer Price and the Overhead Premium rate is
              1% of the Hammer Price. The Buyer’s Premium and Overhead Premium
              are subject to any applicable VAT/GST and/or sales or use tax.
              Please refer to the Conditions of Business for further details.
            </Text>
          </div>
        </Col>
        <Col xs={24} md={9}>
          <div className="details fixed-right">
            <Title level={3}>
              Jayson Tatum Boston Celtics 2023 NBA All-Star Game Worn ‘3-Point
              Contest’ Statement Edition Jersey
            </Title>
            <div className="lot-info">
              <Text>Lot closes</Text>
              <Text strong>July 30, 11:04:00 AM +07</Text>
              <hr />
            </div>
            <div className="estimate">
              <Text>Estimate</Text>
              <Text strong>95,000 - 130,000 HKD</Text>
              <hr />
            </div>
            <div className="starting-bid">
              <Text>Starting Bid</Text>
              <Text strong>80,000 HKD</Text>
            </div>
            <Link
              to={`/auction/${data?.id}`}
              type="primary"
              size="large"
              className="btn_register"
            >
              Bid
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AuctionItem;
