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


const Contribute = ({ classes, router }) => {
  const intl = useIntl();
  const Description = intl.formatMessage({id: "contribute.description", defaultMessage: "Help us improve YourDigitalRights.org."});
  const BaseURL = "/contribute";

  return (
    <div>
      <NextSeo
        title = {intl.formatMessage({id: "contribute.title", defaultMessage: "Contribute"})}
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
            <FormattedMessage id="contribute.title" defaultMessage="Contribute" />
          </Typography>
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="contribute.subtitle"
              defaultMessage="This project is entirely developed and maintained by volunteers. If you are concerned about the loss of privacy, rampant surveillance capitalism, micro-targeting and misinformation and the addictive nature of digital services then you can help:"
            />
          </Typography>
          <br/>
          <Typography component="h2" variant="h3" gutterBottom={true}>
            <FormattedMessage id="contribute.databaseTitle" defaultMessage="Help us improve our database" />
          </Typography>          
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="contribute.database"
              defaultMessage="Help us track the trackers by submiting new data brokers to our database or updating existing entries."
            />
          </Typography>          
          <br/>          
          <Typography component="h2" variant="h3" gutterBottom={true}>
            <FormattedMessage id="contribute.reportAProblemTitle" defaultMessage="Report a Problem" />
          </Typography>
          <Typography gutterBottom={true}>
            <FormattedMessage            
                id="contribute.reportAProblem" 
                defaultMessage="If you experience problems with this site you can report them in the <a1>issue tracker</a1>, or via <a2>email</a2>." 
                values={{
                a1: chunks =>  (
                    <a 
                        href='https://github.com/your-digital-rights/data-brokers/issues'
                        target="_blank"
                    >
                        {chunks}
                    </a>
                    ),
                a2: chunks =>  (
                    <a 
                        href="mailto:info@consciousdigital.org?subject=I'd like to report a problem"
                        target="_blank"
                    >
                        {chunks}
                    </a>
                    ),                    
                }}
              />
          </Typography>
          <br/>
          <Typography component="h2" variant="h3" gutterBottom={true}>
            <FormattedMessage id="contribute.devTitle" defaultMessage="Help with Development" />
          </Typography>          
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="contribute.dev"
              defaultMessage="Our repositories are hosted on GitHub, with the main one being for this <a>website</a>. The best way to start is to get in touch via <email>email</email>. We will then add you to our slack channel and share ongoing development efforts. Alternatively, feel free to clone the repository and submit pull requests."
              values={{
                a: chunks =>  (
                    <a 
                        href='https://github.com/your-digital-rights/data-brokers'
                        target="_blank"
                    >
                        {chunks}
                    </a>
                    ),
                email: chunks =>  (
                    <a 
                      href="mailto:info@consciousdigital.org?subject=I'd like to help with the developmemt"
                      target="_blank"
                    >
                        {chunks}
                    </a>
                    ),                      
              }}              
            />
          </Typography>        
          <br/>  
          <Typography component="h2" variant="h3" gutterBottom={true}>
            <FormattedMessage id="contribute.researchTitle" defaultMessage="Help with research" />
          </Typography>          
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="contribute.research"
              defaultMessage="We are always looking for better ways to promote Digital Rights and make them more accessible. Whether it's to better understand how people use technology or how organizations abuse it, there are always research projects going on. Please <email>email</email> us if you'd like to get involved."
              values={{
                email: chunks =>  (
                    <a 
                        href="mailto:info@consciousdigital.org?subject=I'd like to help with research"
                        target="_blank"
                    >
                        {chunks}
                    </a>
                    ),                      
              }}              
            />
          </Typography>    
          <br/>      
          <Typography component="h2" variant="h3" gutterBottom={true}>
            <FormattedMessage id="contribute.creditTitle" defaultMessage="Credit" />
          </Typography>          
          <Typography gutterBottom={true}>
            <FormattedMessage
              id="contribute.creadit"
              defaultMessage="While we cannot afford to pay you for your work, we are more than happy to give you credit for your contributions, whether it's on this website, on github, or in other ways."           
            />
          </Typography> 
        </Paper>
      </div>
      <Social offset={true} sourcePage="contribute" />
      <Donations />
      <Footer />
    </div>
  );
};

export default withStyles(styles)(withRouter(Contribute));