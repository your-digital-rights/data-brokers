import CircularProgress from "@material-ui/core/CircularProgress";
import { Component } from "react";
import { FormattedMessage } from "react-intl";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import fetchSheetData from "../../utils/sheets";
import styles from "./styles";
import tracker from "../../utils/tracking";
import { withStyles } from "@material-ui/core/styles";
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import debounce from "../../utils/debounce";


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      sessionsLoaded: false,
      timePeriod: "today",
    };
    this.searchRef = React.createRef();
    this.debounceSearch = debounce((search) => {
      tracker.trackSearch(search);
    }, 100);    

    moment.updateLocale("en", { week: {
      dow: 1, // First day of week is Monday
    }});
  }

  focus() {
    let state = Object.assign({}, this.state);
    state.searchTerm = "";
    this.setState(state);
    this.searchRef.current.focus();
  }

  async componentDidMount() {
    const sessions = await fetchSheetData();
    this.setState({ sessions });
    this.setState({ 
      sessionsLoaded: true,
    });
    this.searchSessions();
  }

  filterSessionsByTimePeriod(sessions) {
    return sessions.filter((session) => {
      let result;
      if (this.state.timePeriod === 'today') {
        result = moment().format("dddd, MMMM Do") === moment(session.datetime).format("dddd, MMMM Do");
      } else if (this.state.timePeriod === 'tomorrow') {
        result = moment(session.datetime).isSame(moment().add(1, 'days'), 'day');
      } else if (this.state.timePeriod === 'week') {
        result = moment(session.datetime).isSame(moment(), 'week');
      } else if (this.state.timePeriod === 'weekend') {
        result = (moment(session.datetime).isSame(moment().day("saturday"), 'day') ||
                moment(session.datetime).isSame(moment().add(1, 'weeks').day("sunday"), 'day'));
      } else if (this.state.timePeriod === 'next') {  
        result = moment(session.datetime).isSame(moment().add(1, 'weeks'), 'week');
      } else {
        result = moment(session.datetime).isSame(moment(), 'month');;
      }
      return result && moment(session.datetime) > moment().subtract(1, 'hours');
    });
  }

  async searchSessions() {
    let sessions = await this.state.sessions;

    // Woraround to a case where for some reason sessions disapears. 
    if (!sessions) {
      sessions = await fetchSheetData();
      this.setState({ sessions });
    }

    if (this.state.searchTerm) {      
      sessions = sessions.filter((session) => {
        return session.what.toLowerCase().includes(this.state.searchTerm.toLowerCase());
      });
    };
    sessions = this.filterSessionsByTimePeriod(sessions);   
    this.props.onSessionsSelected(sessions);
  }

  handleSearchInput = async (e) => {
    this.setState({
      searchTerm: e.target.value,
    }, () => {
      this.searchSessions();
      this.debounceSearch(this.state.searchTerm);
    });
  };

  handleTimePeriodChange = async (e) => {
    this.setState({ 
      timePeriod: e.target.value,
    }, () => {
      this.searchSessions();
      tracker.trackTimePeriod(this.state.timePeriod);
    });
  };

  render() {
    const { classes } = this.props;
    const { searchTerm, sessionsLoaded, timePeriod} = this.state;
    
    return (
        <Paper className={classes.root} >
        <Grid container className={classes.search}>
          <Input
            id="searchTerm"
            onChange={this.handleSearchInput}
            value={searchTerm}
            startAdornment={
              <InputAdornment position="start" className={classes.searchIcon}>
                <Icon>search</Icon>
              </InputAdornment>
            }
            endAdornment={
              searchTerm && !sessionsLoaded ? (
                <CircularProgress className={classes.progress} size={24} />
              ) : null
            }
            disableUnderline={true}
            placeholder="Try Yoga or Dance"
            fullWidth={true}
            className={classes.searchInputWrapper}
            autoComplete="off"
            inputRef={this.searchRef}
            autoFocus={true}
          />

        </Grid>
        <Grid item className={classes.timePeriod} >   
          <NativeSelect
            className={classes.timePeriodSelect}
            id="date-select"
            value={timePeriod}
            onChange={this.handleTimePeriodChange}
          >
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="week">This week</option>
            <option value="weekend">This weekend</option>
            <option value="next">Next week</option>
            <option value="month">This month</option>
          </NativeSelect> 
        </Grid>
        </Paper>
    );
  }
}
export default withStyles(styles)(Search);
