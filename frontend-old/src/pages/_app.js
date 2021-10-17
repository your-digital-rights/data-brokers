import Head from 'next/head'
import CookieConsent from "react-cookie-consent";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


const DOMAIN = "data-brokers.org"


// Overide custom app to place cookie consent on every page.

export default function App({ Component, pageProps }) {
	return (
		<>
	    <Head>
	      <meta
	        property="og:image"
	        content={"https://" + DOMAIN + "/opt-out-share.jpg?v=2"}
	      />
	      <meta property="og:image:width" content="898" />
	      <meta property="og:image:height" content="680" />
	      <meta name="twitter:card" content="summary_large_image" />
	      <meta name="twitter:site" content="@OptoutEU" />

	      <meta
	        name="twitter:image"
	        content={"https://" + DOMAIN + "/opt-out-share.jpg?v=2"}
	      />
	      <meta
	        name="viewport"
	        content="initial-scale=1.0, width=device-width"
	        key="viewport"
	      />
	      <meta
	        name="theme-color"
	        content="white"
	      />
	    </Head>  	
	  	<Component {...pageProps} />
		<CookieConsent
		  buttonText="Ok"
		  buttonStyle={{ color: "#4e503b", fontSize: "13px", borderRadius: "3px" }}
		>
		  This website uses cookies to enhance the user experience and for analytics, please see our <a style={{color: "#ffffff"}} href="/privacy">Privacy Policy</a> page for details.
		</CookieConsent>
	</>
	)
}