import * as actionTypes from './actionTypes';
import footballApi from "../../api/footballApi";


export const saveStandings = (standings) => {
  return {
    type: actionTypes.SAVE_STANDINGS,
    standings: standings
  };
};

export const saveCompetitions = (competitions) => {
  return {
    type: actionTypes.SAVE_COMPETITIONS,
    competitions: competitions
  };
};

export const saveTeam = (team) => {
  return {
    type: actionTypes.SAVE_TEAM,
    team: team
  };
};

export const saveMatches = (matches, matchdays) => {
  return {
    type: actionTypes.SAVE_MATCHES,
    matches: matches,
    matchdays: matchdays
  };
};

export const saveTeamMatches = (matches) => {
  return {
    type: actionTypes.SAVE_TEAM_MATCHES,
    teamMatches: matches,
  };
};

export const saveScorersData = (scorersData) => {
  return {
    type: actionTypes.SAVE_SCORERS_DATA,
    scorersData: scorersData,
  };
};

export const filterMatches = (matchday) => {
  return {
    type: actionTypes.FILTER_MATCHES,
    matchday: matchday
  };
};

export const fetchScorersData = (competitionId) => {
  return (dispatch) => {
    footballApi.get(`/competitions/${competitionId}/scorers`)
      .then(response => {
        dispatch(saveScorersData(response.data))
      })
  }
};

export const fetchMatches = (competitionId) => {
  return (dispatch) => {
    footballApi.get(`/competitions/${competitionId}/matches`)
      .then(response => {
        const matchDaysWithDuplicates = response.data.matches.map(match => match.matchday).flat();
        const matchdaysSet = new Set(matchDaysWithDuplicates);
        const matchdays = [...matchdaysSet];
        dispatch(saveMatches(response.data.matches, matchdays))
      })
  }
};

export const fetchTeamMatches = (teamId) => {
  return (dispatch) => {
    footballApi.get(`/teams/${teamId}/matches`)
      .then(response => {
        dispatch(saveTeamMatches(response.data.matches))
      })
  }
};

export const fetchTeam = (teamId) => {
  return (dispatch) => {
    footballApi.get(`/teams/${teamId}`)
      .then(response => {
        dispatch(saveTeam(response.data))
      })
  }
};

export const fetchCompetitions = () => {
  return (dispatch) => {
    footballApi.get('/competitions')
      .then(response => {
        dispatch(saveCompetitions(response.data.competitions.filter(competition => competition.plan === "TIER_ONE")))
      })
  }
};



export const fetchStandings = (competitionId) => {
  return (dispatch) => {
    footballApi.get(`/competitions/${competitionId}/standings`)
      .then(response => {
        dispatch(saveStandings(response.data.standings))
      })
  }
};

export const changeCurrentTable = (standingsType) => {
  return {
    type: actionTypes.CHANGE_CURRENT_TABLE,
    standingsType: standingsType
  };
};