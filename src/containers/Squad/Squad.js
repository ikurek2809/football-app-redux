import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid";

import PlayersAccordion from "../../components/PlayersAccordion";

import footballApi from "../../api/footballApi";
import {fetchTeam, fetchTeamMatches} from "../../store/actions/actions";
import {connect} from "react-redux";


class Squad extends Component {


  state = {
    squad: []
  };

  async componentDidMount() {
    const teamId = this.props.match.params.teamId;
    const response = await footballApi.get(`/teams/${teamId}`);
  }


  render() {
    return (
      <Grid container spacing={3}>
        <PlayersAccordion title="Goalkeepers" players={this.props.squad.filter(player => player.position === "Goalkeeper")}/>
        <PlayersAccordion title="Defenders" players={this.props.squad.filter(player => player.position === "Defender")}/>
        <PlayersAccordion title="Midfielders" players={this.props.squad.filter(player => player.position === "Midfielder")}/>
        <PlayersAccordion title="Attackers" players={this.props.squad.filter(player => player.position === "Attacker")}/>
        <PlayersAccordion title="Manager" players={this.props.squad.filter(player => player.role === "COACH")}/>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    team: state.team,
    matches: state.teamMatches,
    squad: state.team.squad
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTeam: (teamId) => dispatch(fetchTeam(teamId)),
    fetchTeamMatches: (teamId) => dispatch(fetchTeamMatches(teamId)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Squad);
