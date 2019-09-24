import React from "react";
import "./Spiner.css";

const Spiner = props => {
  const styleSpiner = {
    width: "20px",
    height: "20px"
  };
  return <div className="lds-dual-ring" style={styleSpiner}></div>;
};

export default Spiner;
