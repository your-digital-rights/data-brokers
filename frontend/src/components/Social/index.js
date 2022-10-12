import { FormattedMessage, injectIntl } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fab from '@material-ui/core/Fab';
import mailtoLink from "mailto-link";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import classNames from "classnames";
import tracking from "../../utils/tracking";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: "50px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "baseline",
    ...theme,
  },

  offset: {
    paddingTop: "240px",
    marginTop: -170,
  },

  offsetHome: {
    paddingTop: "50px",
    marginTop: -10,
  },

  shareHeading: {
    color: "white",
    marginBottom: "30px",
    flex: "1 0 100%",
    fontWeight: "bold",
  },

  extensionHelperPlaceHolder: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginBottom: "60px",
    paddingTop: "90px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-100px",
      paddingTop: "150px",
    },
  },

  extensionHelperContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "900px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  extensionHelpImgContainer: {
    display: "flex",
    marginTop: "40px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0",
      marginBottom: "30px",
    },
  },

  extensionHelpImg: {
    width: "390px",
    height: "197px",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },

  extensionHelpTextContainer: {
    display: "flex",
    flexDirection: "column",
    width: "430px",
    fontFamily: theme.palette.fontFamily,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  extensionHelpHeading: {
    marginBottom: "10px",
  },

  extensionHelpParagraph: {
    marginBottom: "30px",
  },

  extensionHelpButtonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  },

  extensionDownloadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "10px",
    paddingRight: "20px",
    height: "39px",
    borderRadius: "32px",
    backgroundColor: "#eaeaea",
    color: "#585858",
    marginBottom: "20px",
    fontSize: "16px",
    textTransform: "capitalize",
    fontWeight: "bold",
    textAlign: "left",
  },

  extensionDownloadButtonIcon: {
    width: "28px",
    height: "28px",
    marginRight: "10px",
    fontSize: "40px",
    textAlign: "left",
  },

  extensionDownloadButtonIconFireFox: {
    marginLeft: "3px",
  },

});

const Social = ({
  classes,
  intl,
  sourcePage = "homepage" /* default value */,
  style,
}) => {

  var rootClassName = (sourcePage === "homepage") ? classes.offsetHome : classes.offset;

  const emailSubject = intl.formatMessage({
    id: "social.emailSubject",
    defaultMessage:
      "Check out DataBrokersWatch.org",
  });
  const emailBody = intl.formatMessage({
    id: "social.emailBody",
    defaultMessage:
      "Check out DataBrokersWatch.org, the largest publicly available dataset of data brokers, a research project aiming to track and map the data broker ecosystem.",
  });
  const twitterTitle = intl.formatMessage({
    id: "social.twitterTitle",
    defaultMessage:
      "Check out DataBrokersWatch.org, the largest publicly available dataset of data brokers, a research project aiming to track and map the data broker ecosystem.",
  });
  const facebookQuote = intl.formatMessage({
    id: "social.facebookQuote",
    defaultMessage:
      "Check out DataBrokersWatch.org, the largest publicly available dataset of data brokers, a research project aiming to track and map the data broker ecosystem.",
  });
  const emailLink = mailtoLink({ subject: emailSubject, body: emailBody });

  const handleEmailClick = (e) => {
    e.preventDefault();
    window.open(emailLink);
  };

  const shareButtonProps = {
    className: "ss-btn",
  };

  const trackShare = (network) => {
    tracking.trackSocialShare(network, sourcePage);
  };

  const trackWebExtension = (brower) => {
    tracking.trackWebExtension(brower, sourcePage);
  };

  return (
    <div className={classNames(classes.root, rootClassName, "ss")} style={style}>
      <Typography
        variant="h6"
        gutterBottom={true}
        className={classes.shareHeading}
      >
        <FormattedMessage
          id="social.shareHeading"
          defaultMessage="Like this project? Help others find it."
        />
      </Typography>

      <FacebookShareButton
        additionalProps={shareButtonProps}
        beforeOnClick={trackShare.bind(null, "facebook")}
        url={
          "https://yourdigitalrights.org/?pk_campaign=siteshare&pk_kwd=facebook&pk_source=" +
          sourcePage
        }
        className="ss-btn"
        quote={facebookQuote}
      >
        <img src="/images/sh/fb.svg" />
      </FacebookShareButton>
      <LinkedinShareButton
        additionalProps={shareButtonProps}
        beforeOnClick={trackShare.bind(null, "linkedin")}
        url={
          "https://yourdigitalrights.org/?pk_campaign=siteshare&pk_kwd=linkedin&pk_source=" +
          sourcePage
        }
        className="ss-btn"
      >
        <img src="/images/sh/lin.svg" />
      </LinkedinShareButton>
      <TwitterShareButton
        additionalProps={shareButtonProps}
        beforeOnClick={trackShare.bind(null, "twitter")}
        url={
          "https://yourdigitalrights.org/?pk_campaign=siteshare&pk_kwd=twitter&pk_source=" +
          sourcePage
        }
        title={twitterTitle}
        hashtags={[
          "DataBrokers",
          "PersonalData",
          "SurveillanceCapitalism",
          "Privacy",
        ]}
        className="ss-btn"
      >
        <img src="/images/sh/tw.svg" />
      </TwitterShareButton>
      <a
        href={emailLink}
        onClick={handleEmailClick}
        className="ss-btn SocialMediaShareButton--email"
      >
        <img src="/images/sh/mail.svg" />
      </a>
    </div>
  );
};

export default withStyles(styles)(injectIntl(Social));
