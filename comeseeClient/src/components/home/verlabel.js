import React, { useEffect } from "react";

const verStyle = {
  width: "110px",
  height: "40px",
  borderRadius: "5px",
  backgroundColor: "#727366",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#F1EFE9",
  fontFamily: "Noto Sans TC",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "140%",
};

function VerLabel(props) {
  const { label, id } = props;

  return (
    <label id={id} style={verStyle}>
      {label}
    </label>
  );
}

export default VerLabel;
