import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";

class Register extends Component {
  state = {
    nickname: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    errors: {},
    success: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      nickname: this.state.nickname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      profil_image: "/images/profil1.jpeg"
    };

    this.props.registerUser(newUser);
  };

  render() {
    const { errors } = this.state;
    const { success } = this.state;
    return (
      <div className="row login">
        <div className="col s12 l4 offset-l4">
          <div className="card">
            <Link to="/">
              <div className="card-action grey darken-2 white-text center-align">
                <h3>Matcha</h3>
              </div>
            </Link>
            <div className="card-content">
              <form onSubmit={this.handleSubmit} className="white">
                <div className="input-field">
                  <label htmlFor="nickname">Identifiant</label>
                  <input
                    type="text"
                    id="nickname"
                    onChange={this.handleChange}
                  />
                  <span className="red-text">{errors.nickname}</span>
                </div>
                <br />
                <div className="input-field">
                  <label htmlFor="last_name">Nom</label>
                  <input
                    type="text"
                    id="last_name"
                    onChange={this.handleChange}
                  />
                  <span className="red-text">{errors.last_name}</span>
                </div>
                <br />
                <div className="input-field">
                  <label htmlFor="first_name">Prénom</label>
                  <input
                    type="text"
                    id="first_name"
                    onChange={this.handleChange}
                  />
                  <span className="red-text">{errors.first_name}</span>
                </div>
                <br />
                <div className="input-field">
                  <label htmlFor="email">Adresse Mail</label>
                  <input type="email" id="email" onChange={this.handleChange} />
                  <span className="red-text">{errors.email}</span>
                </div>
                <br />
                <div className="input-field">
                  <label htmlFor="password">Mot de Passe</label>
                  <input
                    type="password"
                    id="password"
                    onChange={this.handleChange}
                    autoComplete="new-password"
                  />
                  <span class="helper-text">Minimum 6 caractères</span>
                  <span className="red-text">{errors.password}</span>
                </div>
                <div className="input-field">
                  <label htmlFor="password2">Confirmer Mot de Passe</label>
                  <input
                    type="password"
                    id="password2"
                    onChange={this.handleChange}
                    autoComplete="new-password"
                  />
                  <span className="red-text">{errors.password2}</span>
                  <span className="red-text">{errors.message}</span>
                </div>
                <br />
                <div className="input-field">
                  <button className="btn waves-effect pink lighten-1">
                    Inscription
                  </button>
                </div>
                <span className="green-text">{success.message}</span>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, errors: state.errors, success: state.success };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
