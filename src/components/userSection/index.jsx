import { Avatar, Divider } from "antd";
import React from "react";

function UserSection({ isMe = false }) {
  return (
    <>
      <Divider />
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center ",
          marginTop: "17px",
          flexDirection: isMe ? "row-reverse" : "row",
        }}
      >
        <Avatar
          size={50}
          src="https://life.thanhcong.vn/wp-content/uploads/2023/01/con-vat-yeu-thich-con-meo.jpg"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h3>Thinh</h3>
          <h4
            style={{
              marginLeft: "3px",
              color: "green",
            }}
          >
            300$
          </h4>
        </div>
      </div>
    </>
  );
}

export default UserSection;
