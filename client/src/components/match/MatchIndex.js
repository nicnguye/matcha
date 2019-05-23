import React, { Component } from "react";
import MatchList from "./MatchList";
import { connect } from "react-redux";
import { getMatchList, getLikesList } from "../../store/actions/matchActions";
import { userInfo } from "../../store/actions/authActions";

class MatchIndex extends Component {
  state = {
    page: this.props.match.params.page
  };

  componentDidMount() {
    const { user } = this.props;
    this.props.userInfo(user);
    this.props.getMatchList(user);
    this.props.getLikesList(user);
  }

  render() {
    const { matchsList } = this.props;
    const { page } = this.state;

    return (
      <div className="container">
        <MatchList matchsList={matchsList} page={page} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    matchsList: state.match.matchsList
  };
};

export default connect(
  mapStateToProps,
  { getMatchList, getLikesList, userInfo }
)(MatchIndex);
