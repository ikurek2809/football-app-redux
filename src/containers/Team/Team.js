import React, {Component} from 'react';

import Paper from "@material-ui/core/Paper";

import {connect} from "react-redux";

import {fetchTeam, fetchTeamMatches} from "../../store/actions/actions";

import classes from "./Team.module.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Matches from "../../components/Matches";


class Team extends Component {


  state = {
    table: []
  };

  async componentDidMount() {
    const teamId = this.props.match.params.teamId;
    this.props.fetchTeam(teamId);
    this.props.fetchTeamMatches(teamId)
  }

  onViewSquadButtonClick = () => {
    this.props.history.push(`/squad/${this.props.team.id}`)
  };


  render() {
    return (
      <>
        <div>
          <Paper className={classes.content}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4">
                  {this.props.team.name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      Basic info
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h8">
                      Founded:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {this.props.team.founded}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h8">
                      Stadium name:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h8">
                      {this.props.team.venue}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h8">
                      Address:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h8">
                      {this.props.team.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h8">
                      Website:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h8">
                      <a href={this.props.team.website}>{this.props.team.website}</a>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h8">
                      Email:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h8">
                      {this.props.team.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h8">
                      Full Squad:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h8">
                      <button className={classes.viewSquadButton} onClick={this.onViewSquadButtonClick}>View</button>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      Active competitions
                    </Typography>
                  </Grid>
                  {this.props.team.activeCompetitions.map(c => (
                    <>
                      <Grid item xs={6}>
                        <Typography variant="h8">
                          {c.area.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h8">
                          {c.name}
                        </Typography>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Typography variant="h4">
            Matches
          </Typography>
          <Matches history={this.props.history} matches={this.props.matches}/>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    team: state.team,
    matches: state.teamMatches
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTeam: (teamId) => dispatch(fetchTeam(teamId)),
    fetchTeamMatches: (teamId) => dispatch(fetchTeamMatches(teamId)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Team);
