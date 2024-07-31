import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Button,
  Row,
  Col,
  Typography,
  Collapse,
  Divider,
} from "antd";
import "./index.scss";
import { Link, useParams } from "react-router-dom";
import api from "../../config/axios";
import moment from "moment";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const AuctionItem = () => {
  const { id } = useParams();

  const [data, setData] = useState({});

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
  }, [id]);

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
              <strong>{data?.jewelry?.name}</strong>
              <br />
              {data?.description}
              <br />
              <br />
              {data?.jewelry?.conditionReport}
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
            <Title level={3}>{data?.name}</Title>
            <div className="lot-info">
              <Text>Lot closes</Text>
              <Text strong>
                {moment(data?.end_date).format("MMMM DD, YYYY hh:mm A")}
              </Text>
              <hr />
            </div>
            <div className="estimate">
              <Text>Estimate</Text>
              <Text strong>
                {data?.jewelry?.low_estimated_price} -{" "}
                {data?.jewelry?.high_estimated_price} USD
              </Text>
              <hr />
            </div>
            <div className="starting-bid">
              <Text>Starting Bid</Text>
              <Text strong>{data?.minPriceBeforeStart} USD</Text>
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
      <Divider   />
    </div>
  );
};

export default AuctionItem;
