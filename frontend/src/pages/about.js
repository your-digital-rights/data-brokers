import { useIntl, FormattedMessage } from "react-intl";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Paper from "@material-ui/core/Paper";
import Social from "../components/Social";
import Typography from "@material-ui/core/Typography";
import { container } from "../styles/layout";
import { withStyles } from "@material-ui/core/styles";
import Donations from "../components/Donations";
import { NextSeo } from 'next-seo';
import {generateCanonical, generateLangLinks} from "../utils/langUtils";
import { withRouter } from "next/router";


const styles = (theme) => ({
  container: {
    position: "relative",
    ...container,
    paddingTop: "50px",
    marginTop: "60px",
  },
  inner: {
    paddingLeft: 120,
    paddingRight: 120,
    paddingTop: 50,
    paddingBottom: 50,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 30,
      paddingRight: 30,
    },
  },
});


const About = ({ classes, router }) => {
  const intl = useIntl();
  const Description = intl.formatMessage({id: "about.description", defaultMessage: "We track and map of the Data Broker ecosystem."});
  const BaseURL = "/about";

  return (
    <div>
      <NextSeo
        title = {intl.formatMessage({id: "about.title", defaultMessage: "About Us"})}
        canonical = {generateCanonical(BaseURL, router.locale)}
        description = {Description}
        openGraph = {{
          description: Description,
        }}
        languageAlternates = {generateLangLinks(BaseURL)}
      />   
      <Nav />
      <div className={classes.container}>
        <Paper className={classes.inner} elevation={2} >
          <Typography component="h1" variant="h4" gutterBottom={false}>
            <FormattedMessage id="about.aboutTitle" defaultMessage="Our mission" />
          </Typography>
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="about.missionBody1"
              defaultMessage="DataBrokersWatch.org was created in order to map the data broker ecosystem. We believe that Data Brokers are a key enabler of the growing loss of privacy, rampant surveillance capitalism, micro-targeting and misinformation, and the addictive nature of digital experiences."
              values={{
                gdpr: (
                  <a target="_blank" href="https://gdpr.eu/tag/gdpr/">
                    General Data Protection Regulations
                  </a>
                ),
                ccpa: (
                  <a target="_blank" href="https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180AB375">
                    California Consumer Privacy Act
                  </a>
                ),
              }}
            />
          </Typography>
          <br />
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="about.missionBody3"
              defaultMessage="This is a free service intended to serve the wider community. We are not a business and do not have a business model. This service is <a>Open Source</a>."
              values={{
                a: chunks =>  (
                  <a 
                    href='https://github.com/your-digital-rights/data-brokers'
                    target="_blank"
                  >
                    {chunks}
                  </a>
                ),
              }}
            />
          </Typography>
          <br />
          <Typography gutterBottom={true} component="h2" variant="h3">
            <FormattedMessage id="about.consciousDigital" defaultMessage="Who we are" />
          </Typography>
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="about.consciousDigital1"
              defaultMessage="DataBrokersWatch.org is a production of {cd}, a registered charity creating people centred digital initiatives promoting and advancing Digital Human Rights."
              values= {{
                cd: <a target="_blank" href="https://consciousdigital.org/">Conscious Digital</a>
              }}
            />
          </Typography>
          <br />    
          <Typography gutterBottom={true} component="h2" variant="h3">
            <FormattedMessage id="about.funding" defaultMessage="Funding" />
          </Typography>
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="about.fundingBody1"
              defaultMessage="This project is self funded by it’s creators, and with the help of your donations (so please donate bellow!)."
            />
          </Typography>
          <br />
          <Typography gutterBottom={true} component="h2" variant="h3">
            <FormattedMessage id="about.sponsors" defaultMessage="Sponsors" />
          </Typography>
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="about.sponsorsTitle"
              defaultMessage="We thank the following organizations for supporting our open source effort by providing a free or discounted version of their services:"
            />
          </Typography>
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="about.sponsorsBody4"
              defaultMessage="{innocraft} - for providing a hosted version of Matomo (Piwik), the open source and privacy minded web analytics platform."
              values={{
                innocraft: <a target="_blank" href="https://innocraft.cloud">Innocraft</a>,
              }}
            />
          </Typography>
        </Paper>
      </div>
      <Social offset={true} sourcePage="about" />
      <Donations />
      <Footer />
    </div>
  );
};

export default withStyles(styles)(withRouter(About));