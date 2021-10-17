import Head from "next/head";
import { Component } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import Donations from "../components/Donations";
import DataBrokersDB from "../components/DataBrokersDB";
import Social from "../components/Social";
import fetchSheetData from "../utils/sheets";
import pageWithIntl from "../components/PageWithIntl";
import tracking from "../utils/tracking";
import withRoot from "../withRoot";
import { withStyles } from "@material-ui/core/styles";
import fetchData from "../utils/sheets";

const styles = theme => ({
  topOfPagePlaceholder: {
    height: '72px',
  },
  mainContainer: {
    position: 'relative',
  },
  desktopSearchbar: {
    display: 'block',
  }
});

const tabletBreakpoint = 960;

class Index extends Component {
  constructor(props) {
    super(props);
    //this.searchForm = React.createRef();

    this.state = {
      screenWidth: null,
      //sessions: [],
      //sessionsLoaded: false
    };
  }

  async componentDidMount() {
    const dataBrokers = await fetchData();
    this.setState({ dataBrokers }); 
    if (typeof window !== 'undefined') {
      this.setState({ screenWidth: window.innerWidth });
      window.addEventListener('resize', this.onScreenResize);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onScreenResize);
    }
  }

  componentDidUpdate() {
    if (typeof window !== 'undefined' && this.infoForm) {
      let scrollTop = this.infoForm.getBoundingClientRect().top + window.pageYOffset - 122;
      window.scrollTo({ top: scrollTop });
    }
  }

  onScreenResize = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  onSessionsSelected = (selectedSessions) => {
    this.setState({ 
      sessions: selectedSessions,
      sessionsLoaded: true 
    });
    //tracking.trackSelectedCompany(selectedCompany.url);
  };

  focusSearch() {
    let state = Object.assign({}, this.state);
    window.location.hash = "hero";
    //this.searchForm.current.focus();
  }

  render() {
    const { classes } = this.props;
    const { screenWidth, sessions, dataBrokers } = this.state;

    const Title = "Data Broker Watch";
    const Description = "Tracking {{dataBrokers.length}} Data Brokers";
    const Canonical = "https://databrokerwatch.org/";


    return (
      <div>
        <Nav />
        <div className={classes.mainContainer}>
          <div className={classes.scrollableContainer}></div>
          <Head>
            <title>{Title}</title>
            <link rel="canonical" href={Canonical} />
            <meta name="description" content={Description} />
            <meta property="og:description" content={Description} />
            <meta property="og:title" content={Title} />
            <meta name="twitter:title" content={Title} />
            <meta name="twitter:description" content={Description} />
          </Head>
          <input
            id="topOfPage"
            className={classes.topOfPagePlaceholder}
            onFocus={() => {
              this.focusSearch();
            }}
          />
          <Hero dataBrokers={dataBrokers} />
          <DataBrokersDB dataBrokers={dataBrokers} />
          <Social />
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRoot(pageWithIntl(withStyles(styles)(Index)));
