import React, { Component } from "react";
import { connect } from "react-redux";
import { addLike, deleteLike } from "../../store/actions/matchActions";
import geolib from "geolib";
import M from "materialize-css";

class MatchSummary extends Component {
  state = {
    tagsList: []
  };

  componentDidMount() {
    let elems = document.querySelectorAll(".chips");
    M.Chips.init(elems, {});
    const { match } = this.props;
    let tab = [];
    if (match.tags) tab = match.tags.split(",");
    this.setState({
      tagsList: tab
    });
  }

  handleLikedButton = () => {
    const { match } = this.props;
    const { user } = this.props;
    const newData = {
      user_account_id: user.id,
      liked_id: match.id
    };
    this.props.addLike(newData);
  };

  handleUnlikedButton = () => {
    const { match } = this.props;
    const { user } = this.props;
    const newData = {
      user_account_id: user.id,
      liked_id: match.id
    };
    this.props.deleteLike(newData);
  };

  render() {
    const { match, likesList, profil } = this.props;
    const { tagsList } = this.state;
    const geoUser = {
      latitude: profil.latitude,
      longitude: profil.longitude
    };
    const geoMatch = {
      latitude: match.latitude,
      longitude: match.longitude
    };
    let distance = geolib.getDistance(geoUser, geoMatch);
    let distRound = Math.round(distance / 1000);
    let gender = match.gender_id === 1 ? "Homme" : "Femme";
    let islike = likesList.map(data => data.liked_id).indexOf(match.id);
    let likeStar =
      islike !== -1 ? (
        <button
          className="btn waves-effect green"
          onClick={this.handleUnlikedButton}
        >
          {match.popularity}
          <i className="material-icons left">star</i>
        </button>
      ) : (
        <button
          className="btn waves-effect red"
          onClick={this.handleLikedButton}
        >
          {match.popularity}
          <i className="material-icons left">star_border</i>
        </button>
      );

    const renderTags = tagsList.map((data, index) => {
      return (
        <div className="chip" key={index}>
          {data}
        </div>
      );
    });

    return (
      <div className="card brown lighten-5">
        <div className="card-image">
          <img src={match.profil_image} alt="profil" />
        </div>
        <div className="card-content">
          <span className="card-title">
            {match.first_name}, {match.age} ans, {gender}
          </span>
          <p>{match.details}</p>
          {renderTags}
        </div>
        <div className="card-action">
          {likeStar}
          <div className="right">
            <i className="material-icons">location_on</i>
            {distRound}km
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    likesList: state.match.likesList,
    profil: state.auth.profilInfo
  };
};

export default connect(
  mapStateToProps,
  { addLike, deleteLike }
)(MatchSummary);
