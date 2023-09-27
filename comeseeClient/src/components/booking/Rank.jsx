function Rank(props) {
  const { rank } = props;
  const defaultStyle = {
    marginLeft: "15px",
    borderRadius: "10px",
    backgroundColor: "#7dca84cc",
    color: "#f1efe9",
    textAlign: "center",
    fontFamily: "Noto Sans TC",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "22.5px",
    justifyContent: "center",
    padding: "5px 15px 5px 15px",
    whiteSpace: "nowrap",
  };

  const rankList = {
    icon_0: "普 0+",
    icon_6: "護 6+",
    icon_12: "輔 12+",
    icon_15: "輔 15+",
    icon_18: "限 18+",
  };

  const rankStyle = {
    icon_0: { ...defaultStyle },
    icon_6: { ...defaultStyle, backgroundColor: "#00ADEF" },
    icon_12: { ...defaultStyle, backgroundColor: "#e9bd1f" },
    icon_15: { ...defaultStyle, backgroundColor: "#F36717" },
    icon_18: { ...defaultStyle, backgroundColor: "#ED1C24" },
  };

  return <span style={rankStyle[rank]}>{rankList[rank]}</span>;
}

export default Rank;
