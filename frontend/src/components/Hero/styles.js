import { container } from "../../styles/layout";
import { theme } from "../../styles/theme";

const Theme = (theme) => ({
  hero: {
    backgroundColor: theme.palette.primary.main,
    ...theme,
    [theme.breakpoints.down("sm")]: {
      paddingTop: "50px"
    }
  },
  heading: {
    maxWidth: "850px !important",
    margin: "50px auto 50px auto",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "100px",
    }    
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
    fontWeight: "normal",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    }    
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
    [theme.breakpoints.down("xs")]: {
      fontSize: "2rem",
    }      
  },
  subTitle:{
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    }       
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

export default Theme;