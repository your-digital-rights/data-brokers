import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

const Hero = ({ classes, dataBrokers, children }) => {
  const dbCount = dataBrokers ? dataBrokers.length: "...";
  return (
    <div className={classes.hero} >
      <div className={classes.container}>
        <div className={classes.heading}>
          <Typography
            variant="h4"
            color="inherit"
            component="h1"
            id="hero-heading"
          >
            <FormattedMessage
              id="hero.heading"
              defaultMessage="Data Brokers Watch"
            />
          </Typography>
          <Typography
            variant="h3"
            color="inherit"
            gutterBottom={true}
            component="h2"
            id="hero-subheading"
          >
            <FormattedMessage
              id="hero.subheading"
              defaultMessage="Mapping the data broker ecosystem"
            />
          </Typography>          
          <Typography
            color="inherit"
            className={classes.intro}
            component="h1"
            variant="h2"
            gutterBottom={true}
          >  
            <FormattedMessage
              id="hero.headerText"
              defaultMessage="We curate the largest publiclly avialble dataset of data brokers, currently tracking {num} organizations. Data Brokers are companies which collect personal data from various soruces and then licanse this data to other organizations, typically without the knowledge or consent of the individual. The dataset is "
              values={{
                num: dbCount
              }}
            />
          </Typography>
          <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons Licence" style={{borderWidth: 0}} src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" /></a>This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
          {children}
        </div>
      </div>
    </div>
  );
};
export default withStyles(styles)(Hero);
