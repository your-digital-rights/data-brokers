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
            gutterBottom={true}
            component="h1"
            id="hero-heading"
          >
            <FormattedMessage
              id="hero.heading"
              defaultMessage="Data Brokers Watch"
            />
          </Typography>
          <Typography
            color="inherit"
            className={classes.intro}
            component="h1"
            variant="h3"
            gutterBottom={true}
          >  
            <FormattedMessage
              id="hero.headerText"
              defaultMessage="Data Brokers are companies which collect personal data from various soruces and then licanse this data to other organizations, typically without your knowledge or consent. Our mission is to track and map the data broker ecosystem, bellow is the largest publiclly avialble dataset of data brokers."
              values={{
                num: dbCount
              }}
            />
          </Typography>
          {children}
        </div>
      </div>
    </div>
  );
};
export default withStyles(styles)(Hero);
