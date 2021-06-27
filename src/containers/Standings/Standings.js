import React, {Component} from 'react';

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {connect} from "react-redux";

import {changeCurrentTable, fetchStandings} from "../../store/actions/actions";

import classes from "./Standings.module.css";
import Button from "@material-ui/core/Button";


class Standings extends Component {


  state = {
    table: []
  };

  async componentDidMount() {
    const competitionId = this.props.match.params.competitionId;
    this.props.fetchStandings(competitionId);
  }

  onChangeStandingsTypeButtonClick = (standingsType) => {
    this.props.changeCurrentTable(standingsType)
  };

  render() {
    const competitionId = this.props.match.params.competitionId;

    return (
      <>
        <div>
          <Button onClick={() => this.props.history.push(`/fixtures/${competitionId}`)} >Fixtures</Button>
          <Button onClick={() => this.props.history.push(`/topScorers/${competitionId}`)} >Top Scorers</Button>
          <br/>
          <button className={classes.changeStandingsButton} onClick={() => this.onChangeStandingsTypeButtonClick("HOME")}>HOME</button>
          <button className={classes.changeStandingsButton} onClick={() => this.onChangeStandingsTypeButtonClick("TOTAL")}>TOTAL</button>
          <button className={classes.changeStandingsButton} onClick={() => this.onChangeStandingsTypeButtonClick("AWAY")}>AWAY</button>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Team Name</TableCell>
                  <TableCell align="right">Played</TableCell>
                  <TableCell align="right">Last 5 games</TableCell>
                  <TableCell align="right">W</TableCell>
                  <TableCell align="right">D</TableCell>
                  <TableCell align="right">L</TableCell>
                  <TableCell align="right">GF</TableCell>
                  <TableCell align="right">GA</TableCell>
                  <TableCell align="right">PTS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.table.map(row => (
                  <TableRow key={row.name}>
                    <TableCell onClick={() => this.props.history.push(`/team/${row.team.id}`)} component="th" scope="row">
                      {row.team.name}
                    </TableCell>
                    <TableCell align="right">{row.playedGames}</TableCell>
                    <TableCell align="right">{row.form}</TableCell>
                    <TableCell align="right">{row.won}</TableCell>
                    <TableCell align="right">{row.draw}</TableCell>
                    <TableCell align="right">{row.lost}</TableCell>
                    <TableCell align="right">{row.goalsFor}</TableCell>
                    <TableCell align="right">{row.goalsAgainst}</TableCell>
                    <TableCell align="right">{row.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    table: state.currentTable
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStandings: (competitionId) => dispatch(fetchStandings(competitionId)),
    changeCurrentTable: (standingsType) => dispatch(changeCurrentTable(standingsType)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Standings);
