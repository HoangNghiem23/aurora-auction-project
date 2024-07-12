import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/header";
import MoneyCurrent from "../moneycurrent";
import UserSection from "../../components/userSection";
import { formatMoney } from "../../assets/hook/useFormat";
import useRealtime from "../../assets/hook/useRealtime";
import api from "../../config/axios";
import { selectUser } from "../../redux/features/counterSlice";
import TimeCountDown from "../../components/timeCountDown";
import "./aution.scss";
import { CgKey } from "react-icons/cg";
import moment from "moment";
import ShowFirework from "../../components/confetti";

const { Option } = Select;

function Auction() {
  const [balance, setBalance] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [winner, setShowWinner] = useState(false);
  const [nameWin, setNameWin] = useState("");
  const [expired, setExpired] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);
  const lastItemRef = useRef(null);
  const audioRef = useRef(null);

  function getAccountsByHighestBid(highestBidValue) {
    return data?.bid
      .filter((bid) => bid.thisIsTheHighestBid === highestBidValue)
      .map((bid) => bid.account);
  }

  useRealtime(async (body) => {
    console.log(body);
    if (
      body.body === "addBid" ||
      body.body === "BidSuccessfully" ||
      body.body === "time"
    ) {
      await fetch();
      if (body.body === "BidSuccessfully") {
        try {
          const response = await api.get(`/auction/${id}`);
          const latestData = response.data;
          latestData?.bid?.forEach((bid) => {
            if (bid.thisIsTheHighestBid === "TWO") {
              if (bid.account.id === user.id) setShowWinner(true);
              setNameWin(bid.account.username);
            }
          });
        } catch (error) {
          console.error("Failed to fetch latest auction data", error);
        }
      }
    }
  });

  useEffect(() => {
    const checkIfExpired = () => {
      const endDate = moment(data.end_date); // Ensure end_date is parsed correctly
      const currentTime = moment(); // Get the current time
      const isExpired = currentTime.isAfter(endDate); // Check if current time is after end_date
      setExpired(isExpired); // Update the state based on the comparison
    };

    checkIfExpired(); // Initial check
    const intervalId = setInterval(checkIfExpired, 1000); // Check every second
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [data.end_date]);

  useEffect(() => {
    const playSound = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    };

    if (winner) {
      playSound();
    }
  }, [winner]);

  const fetch = async () => {
    try {
      const response = await api.get(`/auction/${id}`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentMoney = async () => {
    try {
      const response = await api.get(`/wallet/walletDetail/${user?.id}`);
      setBalance(formatMoney(response.data.amount));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    getCurrentMoney();
  }, [data]);

  const handleOnFinish = async (values) => {
    try {
      const response = await api.post(`/bid/addhigherBid/${id}`, {
        amountofmoney: values.amountofadd,
      });
      toast.success("Bid successfully placed");
      form.resetFields();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

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

  console.log(nameWin);
  return (
    <div>
      <Header />

      {winner && (
        <>
          <ShowFirework />
          <Modal
            onCancel={() => {
              setShowWinner(false);
              setShowModal(false);
            }}
            className="animate__animated animate__flip"
            open={showModal}
          >
            <div>{nameWin} is a winner</div>
          </Modal>
          <audio
            ref={audioRef}
            src="/sounds/mixkit-conference-audience-clapping-strongly-476.wav"
            preload="auto"
          ></audio>
        </>
      )}

      <section className="auction-page">
        <Row className="auction-page__col">
          <Col span={10} className="auction-page__box-img">
            <div>
              <Image
                className="auction-page__box-img--img"
                width={450}
                src={data?.image}
              />
            </div>
            <h4 className="img-name" style={{ fontWeight: "100" }}>
              Jewelry Name: <strong>{data?.title}</strong>
            </h4>
          </Col>

          <Col span={8}>
            <h5 className="text-white">
              {!expired
                ? data?.auctionsStatusEnum === "ISOPENED" && (
                    <TimeCountDown
                      status={data?.auctionsStatusEnum}
                      endDate={data?.end_date}
                    />
                  )
                : `Auction Ended, the Winning Bidder is : ${nameWin}`}

              {data.auctionsStatusEnum == "UPCOMING" && (
                <TimeCountDown
                  status={data?.auctionsStatusEnum}
                  endDate={data?.start_date}
                />
              )}
            </h5>
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
              title={`Current Balance: ${balance}$`}
              className="bet-card"
              bordered={false}
              style={{ height: "fitContent" }}
            >
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
                initialValues={{
                  amountofadd: data?.jewelry?.last_price,
                }}
              >
                <Form.Item
                  name="amountofadd"
                  label="Bet Amount"
                  rules={[
                    { required: true, message: "Please input your bid!" },
                  ]}
                >
                  <InputNumber
                    addonAfter={selectAfter}
                    style={{ width: "100%", paddingLeft: "20px" }}
                  />
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
              <h3> Starting Price : {data?.minPriceBeforeStart}</h3>

              <h3
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  color: "red",
                  fontWeight: "400",
                  margin: "5px",
                }}
              >
                Auction Progress
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
                          name={item?.account.username}
                          money={formatMoney(item?.amountofmoney)}
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
