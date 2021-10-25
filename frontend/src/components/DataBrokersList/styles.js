import { container } from "../../styles/layout";
import { themeBg } from "../../styles/theme";

export default theme => ({
  container: {
    position: "relative",
    ...container,
    paddingTop: "30px",
    marginTop: "-120px",
    marginBottom: "30px",    
    [theme.breakpoints.down("sm")]: {
      marginBottom: "115px",
    },
  },
  inner: {
    flexGrow: 1,
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 50,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 30,
      paddingRight: 30,
    },
  },
  exportBtn: {
    borderRadius: "24px 24px 24px 24px",
    position: "absolute",
    left: "50%",
    marginTop: "10px",
    transform: "translate(-50%,50%)",
    fontWeight: 800,
  },
  paper: {
    height: 170,
    width: 170,
    [theme.breakpoints.down("sm")]: {
      height: 170,
      width: 150,
    },
  },
  searchRoot: {
    padding: '2px 4px',
    margin: '40px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
  }, 
  licanse: {
    marginTop: "35px",
  }
});