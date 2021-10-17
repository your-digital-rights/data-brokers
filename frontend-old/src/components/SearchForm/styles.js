import { visuallyHidden } from "../../styles/layout";

export default (theme) => ({
  root: {
    alignItems: "center",
    position: "relative",
    height: "44px",
    display: "flex",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      marginTop: "10px",
    }
  },
  searchInputWrapper: {
    margin: 5,
  },
  search: {
    paddingLeft: "10px",
    width: "80%",
    [theme.breakpoints.down("xs")]: {
      width: "70%",
    }    
  },
  label: visuallyHidden,
  results: {
    position: "absolute",
    width: "100%",
    zIndex: 1000,
  },
  searchIcon: {
    marginRight: "16px",
  },
  list: {
    padding: 0,
  },
  timePeriod: {
    border: '0px solid white',
    display: "flex",
    marginRight: "10px",
    [theme.breakpoints.up("md")]: {
      marginLeft: "60px",
    }
  },
});
