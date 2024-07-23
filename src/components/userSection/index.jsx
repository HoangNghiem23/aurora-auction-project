import { Avatar, Divider } from "antd";
import React from "react";

function UserSection({ isMe = false, img, name, money }) {
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
          src="https://static.thenounproject.com/png/2643408-200.png"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h3>{name}</h3>
          <h4
            style={{
              marginLeft: "3px",
              color: "green",
            }}
          >
            {money}
          </h4>
        </div>
      </div>
    </>
  );
}

export default UserSection;
