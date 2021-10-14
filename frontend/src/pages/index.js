import React, { useEffect, useState } from 'react';
import { useIntl } from "react-intl";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import Social from "../components/Social";
import Donations from "../components/Donations";
import { withStyles } from "@material-ui/core/styles";
import {generateCanonical, generateLangLinks} from "../utils/langUtils";
import { NextSeo } from 'next-seo';
import { withRouter } from "next/router";
import fetchDataBrokers from "../utils/sheets";
import DataBrokersDB from "../components/DataBrokersList";  

const styles = (theme) => ({
  topOfPagePlaceholder: {
    height: "72px",
  },
  mainContainer: {
    position: "relative",
  },
  desktopSearchbar: {
    display: "block",
  },
});


function Index({ classes, router }) {
  const [dataBrokers, setDataBrokers] = useState(null);
  const intl = useIntl();
  const BaseURL = "";
  const Description = intl.formatMessage({id: "index.description", defaultMessage: "Data broker watch - track the trackers."});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDataBrokers();
      setDataBrokers(response.Organizations);
    };
    fetchData();
  });

  return (
    <div>
      <NextSeo
        title = {intl.formatMessage({id: "index.title", defaultMessage: "Data Broker Watch"})}
        canonical = {generateCanonical(BaseURL, router.locale)}
        description = {Description}
        openGraph = {{
          description: Description,
        }}
        languageAlternates = {generateLangLinks(BaseURL)}
      />   
      <Nav />
      <div className={classes.mainContainer}>
        <Hero dataBrokers={dataBrokers} />
        <DataBrokersDB dataBrokers={dataBrokers} />
        <Social />
        <Donations />
        <Footer />
      </div>
    </div>
  );
};

export default withStyles(styles)(withRouter(Index));