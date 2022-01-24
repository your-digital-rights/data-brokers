import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import classNames from "classnames";
import styles from "./styles";
import { searchOrganizationsUrlAnchor } from "../../utils/urlAnchors";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ALT_LANGUAGES } from '../../utils/langUtils';
import { withRouter } from 'next/router'
import Link from 'next/link'
import cookieCutter from 'cookie-cutter'

const NavItem = ({
  href,
  text,
  classes,
  onClickHandler,
  subsection,
  target,
}) => {
  return (
    <li className={classes.item} onClick={onClickHandler}>
      <Link href={href} className={classes.link} passHref>
        <Typography
          component="a"
          target={target}
          className={subsection ? classes.subsectionLink : classes.link}
        >
          {text}
        </Typography>
      </Link>
    </li>
  );
};


const NavListDesktop = ({ classes, router, handleLangChange }) => {



  return (
    <ul className={classes.container}>
      <NavItem
        href="/top-ten"
        text={
          <FormattedMessage id="nav.top10" defaultMessage="Top 10" />
        }
        classes={classes}
      />
      <NavItem
        href="/#whyDataBrokers"
        text={
          <FormattedMessage id="nav.whyDataBrokers" defaultMessage="Why data brokers?" />
        }
        classes={classes}
      />
      <NavItem
        href="/contribute"
        text={<FormattedMessage id="nav.contribute" defaultMessage="Contribute" />}
        classes={classes} 
      />

      <NavItem
        href="/about"
        text={<FormattedMessage id="nav.about" defaultMessage="About" />}
        classes={classes} 
      />

      {ALT_LANGUAGES.length > 1 &&
        <li>
          <Select
            value={router.locale}
            onChange={event => handleLangChange(event, router)}
            MenuProps={{style: {zIndex: "100000"}}}
            className={classNames(classes.langSelect, classes.link)}
          >
            {ALT_LANGUAGES.map((locale) => (
              <MenuItem key={locale} value={locale}>
                  {locale.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </li>
      }
    </ul>
  );
};

const NavListMobile = ({ classes, mobileNavOpen, toggleMobileNav, router, handleLangChange }) => {
  return (
    <div
      className={classNames(
        mobileNavOpen ? classes.scrollIn : classes.scrollOut,
        "mob-navbar"
      )}
    >
      <ul className={classes.mobileList}>
      <NavItem
          onClickHandler={toggleMobileNav}
          href="/top-ten"
          text={
            <FormattedMessage id="nav.top10" defaultMessage="Top 10" />
          }
          classes={classes}
        />        
      <NavItem
          onClickHandler={toggleMobileNav}
          href="/#whyDataBrokers"
          text={
            <FormattedMessage id="nav.whyDataBrokers" defaultMessage="Why data brokers?" />
          }
          classes={classes}
        />
        
        <NavItem
          onClickHandler={toggleMobileNav}
          href="/contribute"
          subsection={true}
          text={<FormattedMessage id="nav.contribute" defaultMessage="Contribute" />}
          classes={classes}
        />   

        <NavItem
          onClickHandler={toggleMobileNav}
          href="/about"
          text={<FormattedMessage id="nav.about" defaultMessage="About" />}
          classes={classes}
        />

        {ALT_LANGUAGES.length > 1 &&
          <Select
            value={router.locale}
            onChange={event => handleLangChange(event, router)}
            MenuProps={{style: {zIndex: "10000"}}}
            className={classNames(classes.langSelect, classes.link)}
          >
            {ALT_LANGUAGES.map((locale) => (
              <MenuItem key={locale} value={locale}>{locale.toUpperCase()}</MenuItem>
            ))}
          </Select>
        }
     
        <NavItem
          onClickHandler={toggleMobileNav}
          href="/privacy"
          subsection={true}
          text={
            <FormattedMessage
              id="nav.privacyPoilcy"
              defaultMessage="Privacy Policy"
            />
          }
          classes={classes}
        />

        <NavItem
          onClickHandler={toggleMobileNav}
          href="mailto:info@consciousdigital.org"
          subsection={true}
          text={<FormattedMessage id="nav.contact" defaultMessage="Contact Us" />}
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
      mobileNavOpen: false,
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
    this.setState((currentState) => {
      return {
        mobileNavOpen: !currentState.mobileNavOpen,
      };
    });
  }

  handleLangChange = (event, router) => {
    cookieCutter.set('NEXT_LOCALE', event.target.value);
    router.push(router.asPath, router.asPath, {locale: event.target.value});
  };

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
            <img className={classes.logo} src="/images/type.svg" tabIndex={0} />
          </a>
          <NavListDesktop classes={classes} router={this.props.router} handleLangChange={this.handleLangChange} />
          <img
            className={classes.hamburgerButton}
            src={
              mobileNavOpen
                ? "/images/close-icon.svg"
                : "/images/hamburgerIcon.svg"
            }
            onBlur={this.onBlurHandler}
            onClick={this.toggleMobileNav}
            tabIndex={0}
          />
        </nav>
        <div className={classes.navChildren}>{children}</div>

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
            router={this.props.router}
            handleLangChange={this.handleLangChange}
          />
        </div>
        {mobileNavOpen && <div className={classes.fadeBackground} />}
      </div>
    );
  }
}
export default withStyles(styles)(withRouter(Nav));
