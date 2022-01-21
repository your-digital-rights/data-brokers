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
import DataBrokersList from "../components/DataBrokersList";  
import dynamic from 'next/dynamic'

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
  const [selectedDataBroker, setSelectedDataBroker] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDataBrokers();
      response.DataBrokers.forEach(org => {
        if (org["Company Geo Lat"] && org["Company Geo Lng"]) {
          org.latlng = [parseFloat(org["Company Geo Lat"]),parseFloat(org["Company Geo Lng"])];
        }
      });
      setDataBrokers(response.DataBrokers);
    };
    fetchData();
  });

  const Map = dynamic(
    () => import("../components/MainMap"), 
    { 
      ssr: false 
    } // This line is important. It's what prevents server-side render
  );

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
        <Map dataBrokers={dataBrokers} selectedDataBroker={selectedDataBroker} />
        <DataBrokersList dataBrokers={dataBrokers} setSelectedDataBroker={setSelectedDataBroker} />
        <AboutDataBrokers />
        <Social />
        <Donations />
        <Footer />
      </div>
    </div>
  );
};

export default withStyles(styles)(withRouter(Index));