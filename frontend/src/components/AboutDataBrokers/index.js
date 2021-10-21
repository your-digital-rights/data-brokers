import Typography from "@material-ui/core/Typography";
import UpperSection from "./UpperSection";
import { indexStyles as styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import {
  Title,
  TitleImgAlt,
  WhatAreDataBroekrsTitle,
  WhatAreDataBroekrsBody,
  ImpactTitle,
  ImpactBody,
} from "./text";

const AboutDBs = ({ classes }) => {
  return (
    <div className={classes.root} id="whyDataBrokers">
     <div className={classes.inner} >
        <div className={classes.container}>
          <img
            src="images/img-howto.svg"
            alt={TitleImgAlt}
            className={classes.titleImg}
          />
          <div className={classes.content}>
            <Typography
              variant="h4"
              component="h2"
              className={classes.title}
              gutterBottom={true}
            >
              {Title}
            </Typography>
            <UpperSection title={WhatAreDataBroekrsTitle} body={WhatAreDataBroekrsBody} />
            <UpperSection title={ImpactTitle} body={ImpactBody} />
          </div>
        </div>
      </div> 
    </div>
  );
};
export default withStyles(styles)(AboutDBs);
