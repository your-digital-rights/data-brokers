import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        a: {
          color: '#00AE8D',
          fontWeight: '900',
        },
          "a:hover": {
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#00AE8D",
    },
    secondary: {
      main: "#EF6A6E",
    },
  },
  typography: {
    body1: {
      fontSize: "18px",
    },
    body2: {
      fontSize: '1.05em',
      fontWeight: "600",
    },
    body3: {
      fontWeight: "400",
    },
    h4: {
      fontWeight: "900",
      color: "#00AE8D",
      fontSize: "3rem",
    },    
    h6: {
      fontSize: "1.31rem",
    },
    h3: {
      fontWeight: "600",
      color: "#00AE8D",
      fontSize: "1.8rem",
      paddingTop: "10px",
      lineHeight: "1.13333em",
    },
    h5: {
      fontWeight: "bold",
      color: "#00AE8D",
    },
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
  },	  
  color: "white",
});

export default theme;
