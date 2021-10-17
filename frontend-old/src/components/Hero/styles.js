import { container } from "../../styles/layout";
import { themeBg } from "../../styles/theme";

export default theme => ({
  hero: {
    backgroundColor: theme.palette.primary.main,
    ...themeBg,
    [theme.breakpoints.down("sm")]: {
      paddingTop: "50px"
    }
  },
  heading: {
    maxWidth: "850px !important",
    margin: "auto auto 50px auto"
  },
  container: {
    padding: "10px 30px 30px 30px",
    boxSizing: "border-box",
    ...container,
    [theme.breakpoints.up("sm")]: {
      padding: "50px 30px 76px 30px",
      backgroundPosition: "right 160px top 100px",
      backgroundRepeat: "no-repeat"
    }
  },

  intro: {
    marginBottom: "15px",
    maxWidth: "800px",
    fontSize: "22px",
  },
  WhiteText: {
    color: "white"
  },
  introEnd: {
    marginBottom: "50px",
    maxWidth: "530px"
  },
  titleImg: {
    width: "200px",
    maxWidth: "75%"
  },
  title: {
    marginBottom: 0
  },
  introLink: {
    color: "#e89e15",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});
