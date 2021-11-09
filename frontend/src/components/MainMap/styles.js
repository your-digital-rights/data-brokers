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
  } 
});
