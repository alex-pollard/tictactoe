import React from "react";
import { Button } from "antd";

const PogButton = () => {
  return (
    <Button type="primary" onClick={() => alert("POG")}>
      POG
    </Button>
  );
};

export default PogButton;
