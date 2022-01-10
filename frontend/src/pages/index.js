import React, { useEffect, useState } from 'react';
import { useIntl } from "react-intl";
import Footer from "../components/Footer";
import AboutDataBrokers from "../components/AboutDataBrokers";
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
  const [dataBrokers, setDataBrokers] = useState([]);
  const intl = useIntl();
  const BaseURL = "";
  const Description = intl.formatMessage({id: "index.description", defaultMessage: "The largest publicly available dataset of data brokers made available to the wider research community."});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDataBrokers();
      response.DataBrokers.forEach(org => {
        if (org["Company Geo Lat"] && org["Company Geo Lng"]) {
          org.latlng = [parseFloat(org["Company Geo Lat"]),parseFloat(org["Company Geo Lng"])];
        }
      });
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
        <Hero dataBrokers={dataBrokers}/>
        <DataBrokersDB dataBrokers={dataBrokers} />
        <AboutDataBrokers />
        <Social />
        <Donations />
        <Footer />
      </div>
    </div>
  );
};

export default withStyles(styles)(withRouter(Index));