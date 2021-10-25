import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

const Hero = ({ classes, dataBrokers, children }) => {
  var dbCount = dataBrokers ? dataBrokers.length: "...";
  dbCount = dbCount != 0 ? dbCount : "...";
  return (
    <div className={classes.hero} >
      <div className={classes.container}>
        <div className={classes.heading}>
          <Typography
            variant="h4"
            color="inherit"
            component="h1"
            id="hero-heading"
            className={classes.title}
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
            className={classes.subTitle}
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
              defaultMessage="Our goal is to curate the largest publicly available dataset of data brokers and make it available to the wider research community. The full dataset currently includes up to 60+ data points on {num} organizations."
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
