import { container } from "../../styles/layout";
export const Style = (theme) => ({
  root: {
    backgroundColor: "#f2f2f2",
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "30px",
    ...container,
    [theme.breakpoints.down("sm")]: {
      marginTop: "-100px",
      paddingTop: "160px",
    },
  },  
  markerclusterMap: {
    height: "90vh",
  },
  markerLogo: {
    marginRight: "10px",
  },
  progressContainer: {
    display: "flex",
    justifyContent: "center",
  },
  progress: { 
    position: "absolute",
    color: "#1a90ff",
    zIndex: "1000",
    top: "5%",
  },
  renderGroupTitle: {
    marginBottom: "-15px",
    display: "flex",
  },
  optoutBtn: {
    marginTop: "10px",
    width: "100%",
  }
});
