import React, {Component} from 'react';

import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {fetchCompetitions} from "../../store/actions/actions";

import classes from "./Competitions.module.css";


class Competitions extends Component {


  async componentDidMount() {
    this.props.fetchCompetitions()
  }


  render() {
    return (
      <>
        <div>
          <List component="nav" aria-label="secondary mailbox folders">
            {this.props.competitions.map(competition => (
              <ListItem button>
                <Link className={classes.listItemLink} to={`standings/${competition.code}`}>
                  <ListItemText primary={competition.name}/>
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    competitions: state.competitions
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCompetitions: () => dispatch(fetchCompetitions()),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Competitions);
