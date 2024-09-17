import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import tracking from "../../utils/tracking";
import { FormattedMessage } from "react-intl";

const Subscribe = ({ classes, children, page="thank-you"}) => {
  const trackSubscribe = () => {
    tracking.trackSubscribe(page);
  };

  return (
    <div className={classes.container}>
      <div className={classes.subscribe}>
        <div id="subscribe" className={classes.heading}>
        <div className={classes.text}>
          <Typography
              color="inherit" 
              variant="h3"
              component="h3"
              gutterBottom={true}
            >
              <FormattedMessage id="subscribe.title" defaultMessage="Subscribe To Privacy Alerts!" />
            </Typography>          
            <Typography 
              color="inherit" 
              className={classes.intro} 
              gutterBottom={true}
            >
              <FormattedMessage
                id="subscribe.alertsOneLiner1"
                defaultMessage="Stay ahead of online threats and take control of your personal data with Privacy Alerts! Our newsletter provides the latest expert advice, tips, and tricks to safeguard your privacy in the digital world. Subscribe now to stay informed and empowered!"
              />

            </Typography> 
          </div>
          <div className={classes.substack}>
          <iframe src="https://newsletter.yourdigitalrights.org/embed" width="350" height="150" frameborder="0" scrolling="no"></iframe>
          </div>    
        </div>
      </div>
    </div>
  );
};
export default withStyles(styles)(Subscribe);