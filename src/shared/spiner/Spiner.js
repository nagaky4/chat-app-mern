import React from "react";
import Radium from "radium";
import "./Spiner.css";

const Spiner = props => {
  const { width, height, background } = props;
  const styleSpiner = {
    width: width,
    height: height
  };
  const styleContain = {
    width: width,
    height: height,
    background: background || ""
  };
  return (
    <div className="lds-dual-ring" style={styleSpiner}>
      <div className="contain" style={styleContain}></div>
    </div>
  );
};
export default Radium(Spiner);
