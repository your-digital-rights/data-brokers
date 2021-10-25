import { DOMAIN } from "./utils/domain";

const SEO = {
  titleTemplate: '%s | DataBrokersWatch.org',
  defaultTitle: 'Mapping the the Data Brokers ecosystem',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: "https://" + DOMAIN,
    site_name: 'DataBrokersWatch.org',
    images: [
      {
        url: "https://" + DOMAIN + "/images/opt-out-share.jpg?v=2",
        width: 898,
        height: 680,
        alt: 'DataBrokersWatch.org',
      },
    ],
  },
  twitter: {
    handle: '@ConsciousDigit',
    site: '@ConsciousDigit',
    cardType: 'summary_large_image',
  },
};

export default SEO;