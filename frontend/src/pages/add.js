import Head from "next/head";
import { FormattedDate, FormattedMessage } from "react-intl";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Paper from "@material-ui/core/Paper";
import Social from "../components/Social";
import Typography from "@material-ui/core/Typography";
import { container } from "../styles/layout";
import pageWithIntl from "../components/PageWithIntl";
import withRoot from "../withRoot";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    position: "relative",
    ...container,
    paddingTop: "50px",
    marginTop: "60px"
  },
  inner: {
    paddingLeft: 120,
    paddingRight: 120,
    paddingTop: 50,
    paddingBottom: 50,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 30,
      paddingRight: 30
    }
  }
});

// TODO: Make these string translatable
const Title = "Add a Session | Time for Me";
const Description =
  "Discover well-being sessions taking place online | Time for Me";
const Canonical = "https://timeforme.today/add";

const About = ({ classes }) => {
  return (
    <div>
      <Head>
        <title>{Title}</title>
        <link rel="canonical" href={Canonical} />
        <meta name="description" content={Description} />
        <meta property="og:description" content={Description} />
        <meta property="og:title" content={Title} />
        <meta name="twitter:title" content={Title} />
        <meta name="twitter:description" content={Description} />
      </Head>
      <Nav />
      <div className={classes.container}>
        <Paper className={classes.inner}>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScrBL7_qLNCZQS8F4OvWAMqKZllpyocFAx3q_NWUE8Tlcsc0Q/viewform?embedded=true&hl=en" width="100%" height="3200" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
        </Paper>
      </div>
      <Social />
      <Footer />
    </div>
  );
};

export default withRoot(pageWithIntl(withStyles(styles)(About)));
