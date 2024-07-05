import React from "react";
import "./index.scss";
import chroma from "chroma-js";
import { Button } from "antd";

function RoundedBtn({ children, color, border, onClick, style }) {
  return (
    <Button
      className="rounded-button"
      htmlType="submit"
      style={{
        border: border ? "2px solid #EBEBED" : "",
        backgroundColor: color,
        color: chroma(color).get("lab.l") < 80 ? "white" : "#3C3C3C",
        ...style,
      }}
      onClick={onClick}
    >
      <span className="font-semibold">{children}</span>
    </Button>
  );
}

export default RoundedBtn;
