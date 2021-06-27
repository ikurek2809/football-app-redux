import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Container from "@material-ui/core/Container";

import Navigation from "./components/Navigation";
import Competitions from "./containers/Competitions/Competitions";
import Standings from "./containers/Standings/Standings";
import Team from "./containers/Team/Team";
import Fixtures from "./containers/Fixtures/Fixtures";
import Squad from "./containers/Squad/Squad";
import TopScorers from "./containers/TopScorers/TopScorers";


function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Navigation/>
        <Switch>
          <Route exact path="/squad/:teamId" component={Squad}/>
          <Route exact path="/topScorers/:competitionId" component={TopScorers}/>
          <Route exact path="/fixtures/:competitionId" component={Fixtures}/>
          <Route exact path="/team/:teamId" component={Team}/>
          <Route exact path="/standings/:competitionId" component={Standings}/>
          <Route exact path="/" component={Competitions}/>
        </Switch>
      </Container>
    </Router>

  );
}

export default App;
