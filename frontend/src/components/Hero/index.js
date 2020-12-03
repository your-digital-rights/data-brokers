import { IntroText, TitleText, DataBrokers} from "./text";
import { FormattedMessage } from "react-intl";
import Link from 'next/link'

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import { visuallyHidden } from "../../styles/layout";
import { withStyles } from "@material-ui/core/styles";

const Hero = ({ classes, onCompanySelected, children, dataBrokers }) => {
  const dbCount = dataBrokers ? dataBrokers.length: "...";
  return (
    <div className={classes.hero} id="hero">
      <div className={classes.container}>
        <div className={classes.heading}>
          <h2 className={classes.title}>
            <span style={visuallyHidden}>Data Broker Watch</span>
          </h2>
          <Typography
              variant="display1"
              color="inherit"
              gutterBottom={true}
              component="h1"
          >
            {TitleText}
          </Typography>
          <Typography color="inherit" component="h2" className={classes.intro}>
            <FormattedMessage
              id="intro"
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
