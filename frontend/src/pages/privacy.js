import Head from "next/head";
import { useIntl, FormattedDate, FormattedMessage } from "react-intl";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Paper from "@material-ui/core/Paper";
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
    padding: 30,
  },
});

const Privacy = ({ classes, router }) => {
  const intl = useIntl();
  const Description = intl.formatMessage({id: "privacy.description", defaultMessage: "You own your data, we exist to help you control who has access to it. This is our privay policy page."});
  const BaseURL = "/privacy";

  return (
    <div>
      <NextSeo
        title = {intl.formatMessage({id: "privacy.title", defaultMessage: "Privacy Policy"})}
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
          <Typography component="h1" variant="h4" gutterBottom={true}>
            <FormattedMessage
              id="privacy.privacyTitle"
              defaultMessage="Privacy Policy"
            />
          </Typography>
          <Typography gutterBottom={true}>
            <FormattedMessage id="privacy.lastUpdated" defaultMessage="Last updated:" />{" "}
            <FormattedDate
              value={new Date(2022, 3, 16)}
              year="numeric"
              month="long"
              day="2-digit"
            />
          </Typography>
          <br />
          <Typography gutterBottom={true} variant="body2">
            <FormattedMessage id="privacy.promise" defaultMessage="Our Promise" />
          </Typography>
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="privacy.promiseBody"
              defaultMessage="We do not collect personal data. If we ever decide to collect personal data in the future then we will let you know in this Privacy Policy, and limit the Personal Data collected to the absolute minimum required to deliver this Service (databrokerswatch.org). We will never sell or rent your personal information to anyone."
            />
          </Typography>
          <br />
          <Typography gutterBottom={true} variant="body2">
            <FormattedMessage
              id="privacy.personalData"
              defaultMessage="Personal Data"
            />
          </Typography>
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="privacy.personalDataBody1"
              defaultMessage='We do not collect Personal Data :)'
            />
          </Typography>
          <br />
          <Typography gutterBottom={true} variant="body2">
            <FormattedMessage id="usageData" defaultMessage="Usage Data" />
          </Typography>
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="privacy.usageDataBody"
              defaultMessage='We may collect anonymous usage data to help us understand how to improve this Service ("Usage Data"). We use the following third-party Service Provider to monitor and analyze the use of our Service:'
            />
            <ul>
              <li>
                <FormattedMessage
                  id="privacy.analyticsBodyOneA"
                  defaultMessage="Matomo: a privacy minded web analytics service by Innocraft. You can visit their { matomo } page."
                  values={{
                    matomo: (
                      <a href="https://www.innocraft.com/privacy">
                        Privacy Policy
                      </a>
                    ),
                  }}
                />
              </li>
            </ul>
          </Typography>
          <br />
          <Typography gutterBottom={true} variant="body2">
            <FormattedMessage id="privacy.contact" defaultMessage="Contact" />
          </Typography>
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="privacy.contactBody"
              defaultMessage="If you have questions or concerns about this Privacy Policy, please contact us at {mail}."
              values={{
                mail: <a href="mailto:info@consciousdigital.org">info@consciousdigital.org</a>,
              }}
            />
          </Typography>
        </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default withStyles(styles)(withRouter(Privacy));
