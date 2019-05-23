import React, { Component } from "react";
import M from "materialize-css";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
/*import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");*/

class Navbar extends Component {
  componentDidMount() {
    let elems = document.querySelectorAll(".sidenav");
    let elems2 = document.querySelectorAll(".dropdown-trigger");
    M.Sidenav.init(elems, {});
    M.Dropdown.init(elems2, { constrainWidth: false });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <header className="navbar">
        <nav>
          <div className="nav-wrapper grey darken-3">
            <div className="row">
              <div className="col s12">
                <a
                  href="#/"
                  data-target="slide-out"
                  className="left sidenav-trigger"
                >
                  <i className="material-icons">menu</i>
                </a>
                <a href="/home/page/1" className="brand-logo center">
                  Matcha
                </a>
                <ul id="top-nav" className="right">
                  <li>
                    <a href="#/">
                      <i className="material-icons">notifications</i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-trigger"
                      href="#/"
                      data-target="dropdown1"
                    >
                      <i className="material-icons right">settings</i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <ul id="slide-out" className="sidenav sidenav-fixed grey darken-2">
          <Link to="/home/profil">
            <li>
              <div className="user-view">
                <i className="large material-icons white-text">person</i>
              </div>
            </li>
          </Link>
          <li>
            <div className="divider" />
          </li>
          <Link to="/home/searchpage">
            <li>
              <div className="user-view">
                <i className="large material-icons white-text">search</i>
              </div>
            </li>
          </Link>
          <li>
            <div className="divider" />
          </li>
          <Link to="/home/chat">
            <li>
              <div className="user-view">
                <i className="large material-icons white-text">message</i>
              </div>
            </li>
          </Link>
        </ul>

        <ul id="dropdown1" className="dropdown-content">
          <li>
            <a href="/home/settings">Paramètres du profil</a>
          </li>
          <li className="divider" />
          <li>
            <a href="#!" onClick={this.onLogoutClick}>
              Déconnexion
            </a>
          </li>
        </ul>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
