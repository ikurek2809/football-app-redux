import React, {Component} from 'react';

import {connect} from "react-redux";

import { fetchMatches, filterMatches} from "../../store/actions/actions";

import Spinner from "../../components/Spinner";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Matches from "../../components/Matches";


class Fixtures extends Component {


  state = {
    selectedMatchday: null,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.selectedMatchday === null) {
      this.setState({selectedMatchday: nextProps.currentMatchday})
    }
  }


  async componentDidMount() {
    const competitionId = this.props.match.params.competitionId;
    this.props.fetchMatches(competitionId);
  }

  onSelectedMatchdayChange = (e) => {
    this.setState({selectedMatchday: e.target.value});
    this.props.filterMatches(e.target.value);

  };

  onPlusMatchdayButton = () => {
    this.props.filterMatches(this.state.selectedMatchday + 1);
    this.setState({selectedMatchday: this.state.selectedMatchday + 1})
  }

  onMinusMatchdayButton = () => {
    this.props.filterMatches(this.state.selectedMatchday - 1);
    this.setState({selectedMatchday: this.state.selectedMatchday - 1})
  }

  render() {
    return (
      <>
        <div>
          {this.props.filteredMatches.length === 0
            ? <Spinner/>
            :
            <>
              <FormControl>
                Matchday:
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.selectedMatchday}
                  onChange={e => this.onSelectedMatchdayChange(e)}
                >

                  {this.props.matchdays.map(matchday => (
                    <MenuItem value={matchday}>{matchday}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br/>
              <Button onClick={this.onMinusMatchdayButton}>&lt;</Button>
              <Button onClick={this.onPlusMatchdayButton}>&gt;</Button>
              <Matches history={this.props.history} matches={this.props.filteredMatches}/>
            </>
          }
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    matches: state.matches,
    matchdays: state.matchdays,
    filteredMatches: state.filteredMatches,
    currentMatchday: state.currentMatchday
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMatches: (competitionId) => dispatch(fetchMatches(competitionId)),
    filterMatches: (matchday) => dispatch(filterMatches(matchday)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Fixtures);
