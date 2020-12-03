import { container } from "../../styles/layout";
import { themeBg } from "../../styles/theme";

export default theme => ({
  container: {
    position: "relative",
    ...container,
    paddingTop: "30px",
    marginTop: "-120px",
    marginBottom: "30px",    

  },
  inner: {
    flexGrow: 1,
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    paddingLeft: 120,
    paddingRight: 120,
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
    bottom: 0,
    transform: "translate(-50%,50%)",
    color: "white",
    fontWeight: 800,
  },
  paper: {
    height: 170,
    width: 170,
    [theme.breakpoints.down("sm")]: {
      height: 150,
      width: 150,
    },
  },
  grid: {
    padding: 30,
  },
  centerImg: {
    width: "40%",
    top: "40%",
    left: "30%",
  },
  tileBar: {
    textAlign: "center",
    color: "#0070bf",
    backgroundColor: "#0070bf",
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },  
  searchRoot: {
    padding: '2px 4px',
    margin: '40px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
  },  
});
