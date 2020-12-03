import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import tracking from "../../utils/tracking";
import classNames from "classnames";


const styles = theme => ({
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 60px",
    backgroundColor: "#005ea5",
    borderBottom: "4px solid #0a74be",
    height: "72px",
    width: "100%",
    zIndex: "11000",
    [theme.breakpoints.down("xs")]: {
      padding: "0 15px"
    },
    position: "fixed",
    top: "0"
  },
  logoLink: {
    display: "flex",
    justifyContent: "center"
  },
  logo: {
    width: "90px",
    outlineColor: "#e8f4f8",

    [theme.breakpoints.down("xs")]: {
      width: "80px"
    }
  },
  container: {
    listStyle: "none",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  item: {
    padding: "10px 0",
    marginRight: "24px",
    outlineColor: "#e8f4f8"
  },
  link: {
    color: "#f6f7fa",
    fontWeight: "bolder",
    fontSize: "15px",
    textDecoration: "none",
    outlineColor: "#e8f4f8"
  },
  subsectionLink: {
    color: "#bebebe",
    fontWeight: "bolder",
    fontSize: "15px",
    textDecoration: "none",
    outlineColor: "#e8f4f8"
  },
  hamburgerButton: {
    display: "none",
    height: "50px",
    cursor: "pointer",
    outlineColor: "#e8f4f8",

    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  navChildren: {
    position: "fixed",
    height: "50px",
    width: "100%",
    top: "70px",
    zIndex: "9999"
  },
  mobileListContainer: {
    display: "none",
    width: "250px",
    height: "110vh",
    position: "fixed",
    right: "0",
    top: "0",
    float: "right",
    color: "#ffffff",
    overflowX: "hidden",
    overflowY: "hidden",
    zIndex: "10000",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center"
    }
  },
  hideMobContainer: {
    width: 0
  },
  showMobContainer: {
    width: "250px"
  },
  scrollOut: {
    position: "absolute",
    right: "-252px",
    transition: " right 0.5s"
  },
  scrollIn: {
    position: "absolute",
    right: "0",
    transition: "right 0.5s"
  },
  mobileList: {
    display: "flex",
    listStyle: "none",
    alignItems: "flex-start",
    flexDirection: "column",
    backgroundColor: "#993366",
    position: "absolute",
    right: "0",
    top: "0",
    margin: "0",
    width: "252px",
    height: "110vh",
    padding: "100px 25px",
    zIndex: "11000"
  },
  NavButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    height: "40px",
    backgroundColor: "#666699",
    fontSize: "14px",
    fontWeight: "400",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.15",
    letterSpacing: "0.25px",
    color: "#ffffff",
    borderRadius: "25px",
    margin: "25px 0",
    outlineColor: "#e8f4f8",
    cursor: "pointer",
    paddingLeft: "20px",
    paddingRight: "20px",
    textDecoration: "none"
  },
  NavButtonDesktop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    height: "40px",
    backgroundColor: "#8585ad",
    fontSize: "14px",
    fontWeight: "800",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "1.15",
    letterSpacing: "1.25px",
    color: "#ffffff",
    borderRadius: "25px",
    outlineColor: "#e8f4f8",
    cursor: "pointer",
    marginRight: "24px",
    paddingLeft: "20px",
    paddingRight: "20px",
    textDecoration: "none"
  },
  fadeBackground: {
    position: "fixed",
    top: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(255,255,255, 0.5)",
    zIndex: "9999",
    display: "none",

    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  twitterHandle: {
    display: "flex",
    justifyContent: "space-between",
    width: "120px",
    alignItems: "center"
  }
});

const trackButtonLinkClick = device => {
  tracking.trackButtonLinkClick(device);
};

const NavItem = ({
  href,
  text,
  classes,
  onClickHandler,
  subsection,
  target
}) => {
  return (
    <li className={classes.item} onClick={onClickHandler}>
      <Typography
        component="a"
        target={target}
        href={href}
        className={subsection ? classes.subsectionLink : classes.link}
      >
        {text}
      </Typography>
    </li>
  );
};

const NavListDesktop = ({ classes }) => {
  return (
    <ul className={classes.container}>
      <NavItem
        href="mailto:info@timeforme.today"
        text={<FormattedMessage id="contact" defaultMessage="Contact" />}
        classes={classes}
      />    
      <a
        href="/add"
        className={classes.NavButtonDesktop}
        tabIndex={0}
        onClick={() => {
          trackButtonLinkClick("desktop");
        }}
      >
        <Typography component="span" className={classes.link}>
          Add a Session
        </Typography>
      </a>
    </ul>
  );
};

const NavListMobile = ({ classes, mobileNavOpen, toggleMobileNav }) => {
  return (
    <div
      className={classNames(
        mobileNavOpen ? classes.scrollIn : classes.scrollOut,
        "mob-navbar"
      )}
    >
      <ul className={classes.mobileList}>    
        <a
          href="/add"
          className={classes.NavButton}
          tabIndex={0}
          onClick={() => {
            toggleMobileNav();
            trackButtonLinkClick("mobile");
          }}
        >
          <Typography component="span" className={classes.link}>
            Add a Session
          </Typography>
        </a>

        <NavItem
          onClickHandler={toggleMobileNav}
          href="/privacy"
          subsection={true}
          text={
            <FormattedMessage
              id="privacyPoilcy"
              defaultMessage="Privacy Policy"
            />
          }
          classes={classes}
        />
        <NavItem
          onClickHandler={toggleMobileNav}
          href="mailto:info@timeforme.today"
          subsection={true}
          text={<FormattedMessage id="contact" defaultMessage="Contact" />}
          classes={classes}
        />          
      </ul>
    </div>
  );
};
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNavOpen: false
    };
    this.toggleMenu = React.createRef();
    this.hamburgerButton = React.createRef();
    this.menuItem = React.createRef();

    this.toggleMobileNav = this.toggleMobileNav.bind(this);
    this.handleCloseNav = this.handleCloseNav.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.handleCloseNav);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleCloseNav);
  }

  toggleMobileNav() {
    this.setState(currentState => {
      return {
        mobileNavOpen: !currentState.mobileNavOpen
      };
    });
  }

  handleCloseNav(event) {
    if (
      this.state.mobileNavOpen &&
      !this.toggleMenu.current.contains(event.target) &&
      !this.hamburgerButton.current.contains(event.target)
    ) {
      this.setState({ mobileNavOpen: false });
    }
  }

  render() {
    const { classes, children } = this.props;
    const { mobileNavOpen } = this.state;

    return (
      <div>
        <nav ref={this.toggleMenu} className={classes.nav}>
          <a className={classes.logoLink} href="/">
            <img className={classes.logo} src="/type.svg" tabIndex={0} />
          </a>
          <NavListDesktop classes={classes} />
          <img
            className={classes.hamburgerButton}
            src={
              mobileNavOpen
                ? "/close-icon.svg"
                : "/hamburgerIcon.svg"
            }
            onBlur={this.onBlurHandler}
            onClick={this.toggleMobileNav}
            tabIndex={0}
          />
        </nav>
        {children && <div className={classes.navChildren}>{children}</div>}

        <div
          ref={this.hamburgerButton}
          className={classNames(
            classes.mobileListContainer,
            mobileNavOpen ? classes.showMobContainer : classes.hideMobContainer
          )}
          onFocus={this.onFocusHandler}
        >
          <NavListMobile
            classes={classes}
            mobileNavOpen={mobileNavOpen}
            toggleMobileNav={this.toggleMobileNav}
          />
        </div>
        {mobileNavOpen && <div className={classes.fadeBackground} />}
      </div>
    );
  }
}
export default withStyles(styles)(Nav);
