import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function Button(props) {
  const BtnLayout = {
    display: "flex",
    justifyContent: "center",
    marginTop: "8px",
  };
  const BtnStyle = {
    width: "218px",
    height: "55.5px",
    backgroundColor: "#7EB496",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    fontSize: "17px",
    lineHeight: "174.2%",
  };

  return (
    <Link
      to="/list"
      onClick={() => window.location.reload()}
      style={{ textDecoration: "none" }}
    >
      <div className="btn_section" style={BtnLayout}>
        <div className="btn" style={BtnStyle}>
          {props.btn_text}
        </div>
      </div>
    </Link>
  );
}
