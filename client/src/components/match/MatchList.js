import React, { Component } from "react";
import MatchSummary from "./MatchSummary";
import { withRouter } from "react-router-dom";

class MatchList extends Component {
  state = {
    currentPage: parseInt(this.props.page),
    userPerPage: 6
  };

  handleClick = event => {
    this.setState(
      {
        currentPage: Number(event.target.id)
      },
      () => {
        this.props.history.push("/home/page/" + this.state.currentPage);
      }
    );
  };

  handleRight = event => {
    this.setState(
      {
        currentPage: this.state.currentPage + 1
      },
      () => {
        this.props.history.push("/home/page/" + this.state.currentPage);
      }
    );
  };

  handleLeft = event => {
    this.setState(
      {
        currentPage: this.state.currentPage - 1
      },
      () => {
        this.props.history.push("/home/page/" + this.state.currentPage);
      }
    );
  };

  render() {
    const { matchsList } = this.props;
    const { currentPage, userPerPage } = this.state;

    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentUsers = matchsList.slice(indexOfFirstUser, indexOfLastUser);
    const totalPage = Math.ceil(matchsList.length / userPerPage);

    const renderUsers = currentUsers.map((matchIndex, key) => {
      return (
        <div className="col s12 m6 l4" key={key}>
          <MatchSummary match={matchIndex} />
        </div>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      let active = number === currentPage ? "active" : "waves-effect";
      return (
        <li key={number} className={active}>
          <a onClick={this.handleClick} id={number} href="#/">
            {number}
          </a>
        </li>
      );
    });

    let leftDisabled =
      currentPage === 1 ? (
        <li className="disabled">
          <a href="#/">
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
      ) : (
        <li onClick={this.handleLeft} className="waves-effect">
          <a href="#/">
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
      );

    let rightDisabled =
      currentPage === totalPage ? (
        <li className="disabled">
          <a href="#/">
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      ) : (
        <li onClick={this.handleRight} className="waves-effect">
          <a href="#/">
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      );

    return (
      <>
        <div className="row">
          <div>{renderUsers}</div>
        </div>
        <div className="row">
          <ul className="pagination col s12 m4 offset-m4 center">
            {leftDisabled}
            {renderPageNumbers}
            {rightDisabled}
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(MatchList);
