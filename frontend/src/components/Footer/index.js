import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import { container } from "../../styles/layout";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...container
  },
  inner: {
    // borderTop: "2px solid #005ea5",
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 30,
    [theme.breakpoints.up("md")]: {
      paddingRight: 30,
      paddingLeft: 30
    }
  },
  innerLeft: {
    // borderTop: "2px solid #005ea5",
    width: "20%",
    float: "left",
    marginBottom: 30,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      textAlign: "center"
    }
  },
  innerRight: {
    // borderTop: "2px solid #005ea5",
    width: "80%",
    float: "right",
    marginBottom: 60,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  Copyright: {
    textAlign: "center"
  },
  WishList: {
    textAlign: "center"
  },
  wishButton: {
    marginTop: "-25px",
    borderRadius: "24px 24px 24px 24px",
    color: "white",
    fontWeight: "600",
    padding: "10px 20px",
    "&:hover": {
      background: "#cf8600"
    }
  },
  DisclaimerLink: {
    color: "#005ea5",
    fontWeight: "600",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

const WishButtonText = (
  <FormattedMessage id="WishList" defaultMessage="make a wish on our roadmap" />
);

const DisclaimerText = (
  <FormattedMessage
    id="footerDisclaimer"
    defaultMessage="{title} This service is provided as is, without warranty of any kind. Use of this service is entirely at your own risk. We cannot take responsibility for any direct or indirect damages resulting from the use of this service. The information provided by this service along with the content on our website related to legal matters is provided for your private use and does not constitute legal advice. If you need legal advice for a specific problem, you should consult with a licensed attorney."
    values={{
      title: (
        <span style={{ fontWeight: "bold", color: "black" }}>Disclaimer:</span>
      )
    }}
  />
);

const QueryText = (
  <FormattedMessage
    id="footerQuery"
    defaultMessage="For more information please contact us at {mail}. © Copyright 2020"
    values={{
      mail: (
        <a href="mailto:info@opt-out.eu" style={{ textDecoration: "none" }}>
          info@opt-out.eu
        </a>
      )
    }}
  />
);

const Footer = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.innerLeft}>
          <Typography component="p" variant="body2">
            <a href="/privacy" className={classes.DisclaimerLink}>
              Privacy Policy
            </a>
          </Typography>
        </div>
        This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.  <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons Licence" style={{borderWidth:0}} src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a>
        <br />
        <br />
        <div className={classes.innerRight}>
          <Typography gutterBottom={true} color="textSecondary" variant="body2">
            {DisclaimerText}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {QueryText}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Footer);
