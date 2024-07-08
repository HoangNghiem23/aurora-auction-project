import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Statistic,
  Form,
  InputNumber,
  Table,
} from "antd";
import "./index.scss";
import { LeftCircleTwoTone } from "@ant-design/icons";

import { Card } from "antd";
import api from "../../config/axios";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "../../redux/features/counterSlice";
import RoundedBtn from "../../components/rounded-button";
import ButtonPlan from "../../components/buttonPlan";
import TransactionHistory from "../../components/transaction";

function WalletPage() {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState(1);
  const [number2, setNumber2] = useState(1);
  const [check, setCheck] = useState(false);
  const [wallet, setWallet] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [widthdrawForm, setWithdrawForm] = useState({});
  const [openCofirm, setOpenConfirm] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef();
  const widthdraw = (e) => {
    console.log(e);
    setWithdrawForm(e);
    console.log(widthdrawForm);
    setOpenForm(false);
    form
      .validateFields()
      .then(() => {
        setOpenConfirm(true); // Mở form xác nhận khi tất cả các trường đã được nhập đầy đủ
      })
      .catch((error) => {
        console.log("Form validation failed:", error);
      });
  };

  const handleWithdraw = async () => {
    console.log(widthdrawForm);

    try {
      const res = await api.post("/withDraw", {
        accountNumber: widthdrawForm.accountNumber,
        accountName: widthdrawForm.accountName,
        bankName: widthdrawForm.bankName,
        amount: widthdrawForm.amount,
      });
      setOpenConfirm(false);

      //   alertSuccess("Send request successfully!");
      formRef.current.resetFields();
    } catch (e) {
      console.log(e);
      //   alertFail(e.response.data);
      setOpenConfirm(false);
      // formRef.current.resetFields();
    }
  };

  // useEffect(() => {
  //   if (balance <= (wallet?.amount == 0 ? 0 : wallet?.amount) - 1) {
  //     const id = setInterval(() => {
  //       setBalance(balance + 1000
  //       );
  //     }, 0.0005);
  //     return () => {
  //       clearInterval(id);
  //     };
  //   }
  // });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  console.log(id);
  const user = useSelector(selectUser);

  const handleCancel = () => {
    setOpen(false);
  };
  const handleCancel2 = () => {
    setOpen2(false);
  };

  useEffect(() => {
    if (id) {
      recharge();
    }
  }, [id]);

  useEffect(() => {
    getWalletDetail();
  }, []);

  const onFinish = async () => {
    setCheck(true);
    try {
      const res = await api.post("/wallet/request-recharge-vnpay", {
        amount: number,
      });
      console.log(res.data.data);
      window.location.href = res.data;
    } catch (e) {
      console.log(e);
    }
    setCheck(false);
  };
  const recharge = async () => {
    try {
      const res = await api.put(`/recharge/${id}`, {});
      setWallet(res.data.data);
      //   alertSuccess("Recharge Successfully");
    } catch (e) {
      console.log(e.response.data == "Reload");
    }
  };
  const getWalletDetail = async () => {
    try {
      const res = await api.get(
        `http://152.42.226.77:8080/api/wallet/walletDetail/${user?.id}`
      );
      console.log(res.data);
      setWallet(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const vnPayhandler = async () => {
    try {
      const res = await api.post("request-recharge-vnpay", {
        amount: number2,
      });
      console.log(res.data.data);
      window.location.href = res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
  console.log(user);
  return (
    <div className="wallet-section-wrapper">
      {user?.role == "CREATOR" ? (
        <div className="your-wallet-head">
          <Link to="/creator-manage/artworks">
            <LeftCircleTwoTone
              twoToneColor="#BBBBBB"
              style={{
                fontSize: "1.8em",
                cursor: "pointer",
              }}
            />
          </Link>
          <h1>Your Wallet</h1>
        </div>
      ) : null}

      <div className="wallet-section">
        <div className="wallet-section__left">
          <img
            src="https://i0.wp.com/www.swipemetal.co.uk/wp-content/uploads/2022/06/HighRoller-BlackBrass-1.png?fit=1024%2C576&ssl=1"
            alt="card-group"
          />
        </div>
        <div className="wallet-section__right">
          <div className="wallet-section__right__top">
            <h2>Current Balance</h2>
            <h3>{wallet.amount}$</h3>
          </div>
          <div
            className="wallet-section__right__bottom"
            onClick={() => setOpen(true)}
          >
            <ButtonPlan content="Deposit more money with Paypal" />
          </div>
          <div style={{ marginTop: "1em" }} onClick={() => setOpenForm(true)}>
            <ButtonPlan content="Withdraw" />
          </div>
        </div>
      </div>
      <TransactionHistory transaction="HistoryOfBid" />
      <Modal open={open} onCancel={handleCancel} footer={null}>
        <Form onFinish={onFinish}>
          <div style={{ fontFamily: "MediumCereal", marginBottom: "-2em" }}>
            <Form.Item name="amount">
              <h3
                style={{
                  fontFamily: "MediumCereal",
                  marginBottom: "1.2em",
                }}
              >
                Amount of money
              </h3>
              <Form.Item
                name="amount"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}
              >
                <InputNumber
                  addonBefore="+"
                  addonAfter="$"
                  defaultValue={number}
                  onChange={(e) => setNumber(e)}
                />
              </Form.Item>
            </Form.Item>
          </div>
          <Form.Item>
            <RoundedBtn
              color="#2C547F"
              style={{ width: "100%", transform: "translateY(1em)" }}
              htmlType="submit"
            >
              {check == true ? "Loading..." : "Submit"}
            </RoundedBtn>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={openForm}
        title={<div style={{ textAlign: "center" }}>WITHDRAWAL FORM</div>}
        footer={null}
        onCancel={() => setOpenForm(false)}
      >
        <Form layout="vertical" onFinish={widthdraw} ref={formRef}>
          <Form.Item
            label="Account Number"
            name="accountNumber"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Account Name"
            name="accountName"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Bank Name"
            name="bankName"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="amount"
            // noStyle
            label="Amount"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <InputNumber
              min={0}
              addonBefore="+"
              addonAfter="$"
              defaultValue={number}
              onChange={(e) => setNumber(e)}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <RoundedBtn
            color="#2C547F"
            style={{ width: "100%", transform: "translateY(1em)" }}
            htmlType="submit"
            // onClick={() => setOpenConfirm(true)}
          >
            {check == true ? "Loading..." : "Submit"}
          </RoundedBtn>
        </Form>
      </Modal>

      <Modal
        title={<div>Confirm</div>}
        open={openCofirm}
        footer={
          <div onClick={handleWithdraw}>
            <Button
              style={{
                width: "30%",
                backgroundColor: "black",
                color: "white",
                borderRadius: "50px",
                height: "2.5em",
              }}
            >
              Sure
            </Button>
          </div>
        }
        onCancel={() => setOpenConfirm(false)}
      >
        Are you sure withdraw
      </Modal>
    </div>
  );
}

export default WalletPage;
