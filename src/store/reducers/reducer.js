import * as actionTypes from "../actions/actionTypes";


const initialState = {
  competitions: [],
  standings: [],
  currentTable: [],
  team: {activeCompetitions: []},
  matches: [],
  matchdays: [],
  filteredMatches: [],
  currentMatchday: null,
  teamMatches: [],
  scorersData: {scorers: []}
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_COMPETITIONS:
      return saveCompetitions(state, action);
    case actionTypes.SAVE_STANDINGS:
      return saveStandings(state, action);
    case actionTypes.CHANGE_CURRENT_TABLE:
      return changeCurrentTable(state, action);
    case actionTypes.SAVE_TEAM:
      return saveTeam(state, action);
    case actionTypes.SAVE_MATCHES:
      return saveMatches(state, action);
    case actionTypes.FILTER_MATCHES:
      return filterMatches(state, action);
    case actionTypes.SAVE_TEAM_MATCHES:
      return saveTeamMatches(state, action);
    case actionTypes.SAVE_SCORERS_DATA:
      return saveScorersData(state, action);
  }
  return state;
};

const saveCompetitions = (state, action) => {
  return {
    ...state,
    competitions: action.competitions,
  };
};

const saveScorersData = (state, action) => {
  return {
    ...state,
    scorersData: action.scorersData,
  };
};

const saveTeam = (state, action) => {
  return {
    ...state,
    team: action.team,
  };
};

const saveMatches = (state, action) => {
  return {
    ...state,
    matches: action.matches,
    matchdays: action.matchdays,
    filteredMatches: action.matches.filter(match => match.matchday === action.matches[0].season.currentMatchday),
    currentMatchday: action.matches[0].season.currentMatchday
  };
};

const saveTeamMatches = (state, action) => {
  return {
    ...state,
    teamMatches: action.teamMatches,
  };
};

const saveStandings = (state, action) => {
  return {
    ...state,
    currentTable: action.standings[0] ? action.standings[0].table : [],
    standings: action.standings,
  };
};

const filterMatches = (state, action) => {
  return {
    ...state,
    filteredMatches: state.matches.filter(match => match.matchday === action.matchday)
  };
};

const changeCurrentTable = (state, action) => {
  let currentTable = [];
  if (action.standingsType === "TOTAL") {
    currentTable = state.standings[0] ? state.standings[0].table : []
  } else if (action.standingsType === "HOME") {
    currentTable = state.standings[1] ? state.standings[1].table : []
  } else {
    currentTable = state.standings[2] ? state.standings[2].table : []
  }
  return {
    ...state,
    currentTable: currentTable,
  };
};


export default reducer;