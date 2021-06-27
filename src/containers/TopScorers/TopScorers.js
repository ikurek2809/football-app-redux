import React, {Component} from 'react';


import footballApi from "../../api/footballApi";

import classes from "./TopScorers.module.css";
import Spinner from "../../components/Spinner";
import TopScorerAccordion from "../../components/TopScorerAccordion";
import {fetchScorersData, fetchTeam, fetchTeamMatches} from "../../store/actions/actions";
import {connect} from "react-redux";


class TopScorers extends Component {


  state = {
    scorersData: {},
  };

  async componentDidMount() {
    const competitionId = this.props.match.params.competitionId;
    this.props.fetchScorersData(competitionId);

  }


  render() {
    if (!this.props.scorersData.competition) {
      return <Spinner/>
    }
    return (
      <>
        <div>
          <TopScorerAccordion title={this.props.scorersData.competition.name} scorers={this.props.scorersData.scorers}/>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    scorersData: state.scorersData,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchScorersData: (competitionId) => dispatch(fetchScorersData(competitionId)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(TopScorers);
