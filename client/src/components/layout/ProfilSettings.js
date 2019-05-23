import React, { Component } from "react";
import M from "materialize-css";
import { connect } from "react-redux";
import { userInfo } from "../../store/actions/authActions";
import {
  update_profil,
  update_password
} from "../../store/actions/profilActions";

class ProfilSettings extends Component {
  state = {
    id: "",
    nickname: "",
    email: "",
    old_password: "",
    old_pwd: "",
    password1: "",
    password2: "",
    errors: {},
    success: {}
  };

  componentDidMount() {
    let elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems, {});
    const { user } = this.props;
    this.props.userInfo(user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profil) {
      this.setState({
        id: nextProps.profil.id,
        nickname: nextProps.profil.nickname,
        email: nextProps.profil.email,
        old_pwd: nextProps.profil.password
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.success) {
      this.setState({
        success: nextProps.success
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.update_profil(this.state);
  };

  //A FAIIIIIIIIREEEEEE
  handleSubmit2 = e => {
    e.preventDefault();
    const newData = {
      id: this.state.id,
      old_pwd: this.state.old_pwd,
      old_password: this.state.old_password,
      password1: this.state.password1,
      password2: this.state.password2
    };
    this.props.update_password(newData);
  };

  render() {
    const { errors, success } = this.state;
    return (
      <div className="container">
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              <i className="material-icons">account_circle</i>Identifiant/Email
            </div>
            <div className="collapsible-body white">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col s12 m6">
                    <label htmlFor="nickname">Identifiant</label>
                    <input
                      type="text"
                      id="nickname"
                      value={this.state.nickname}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col s12 m6">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="input-field">
                  <button className="btn waves-effect pink lighten-1">
                    Modifier
                  </button>
                </div>
                {errors.message ? (
                  <span className="red-text">{errors.message}</span>
                ) : (
                  <span className="green-text">{success.message}</span>
                )}
              </form>
            </div>
          </li>

          <li>
            <div className="collapsible-header">
              <i className="material-icons">lock</i>Changer de Mot de passe
            </div>
            <div className="collapsible-body white">
              <form onSubmit={this.handleSubmit2}>
                <div className="row">
                  <div className="input-field col s12 m6">
                    <label htmlFor="old_password">Ancien Mot de passe</label>
                    <input
                      type="password"
                      id="old_password"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m6">
                    <label htmlFor="password1">Nouveau Mot de passe</label>
                    <input
                      type="password"
                      id="password1"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-field col s12 m6">
                    <label htmlFor="password2">Confirmer mot de passe</label>
                    <input
                      type="password"
                      id="password2"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="input-field">
                  <button className="btn waves-effect pink lighten-1">
                    Modifier le mot de passe
                  </button>
                </div>
                {errors.password ? (
                  <span className="red-text">{errors.password}</span>
                ) : (
                  <span className="green-text">{success.password}</span>
                )}
              </form>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons">power_settings_new</i>Supprimer le
              compte
            </div>
            <div className="collapsible-body white">
              <span>aRe U SuRe ??</span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    profil: state.auth.profilInfo,
    errors: state.errors,
    success: state.success
  };
};

export default connect(
  mapStateToProps,
  { userInfo, update_profil, update_password }
)(ProfilSettings);
