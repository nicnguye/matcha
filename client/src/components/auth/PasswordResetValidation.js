import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetPasswordValidated } from "../../store/actions/authActions";

class PasswordResetValidation extends Component {
  state = {
    password: "",
    password2: "",
    token: "",
    errors: {},
    success: {}
  };

  componentDidMount() {
    this.setState({
      token: this.props.match.params.token
    });
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
      if (nextProps.success.message) {
        setTimeout(() => {
          this.props.history.push("/");
        }, 3500);
      }
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let user = {
      password: this.state.password,
      password2: this.state.password2,
      confirmation_code: this.state.token
    };
    this.props.resetPasswordValidated(user, user.confirmation_code);
  };

  render() {
    const { errors, success } = this.state;

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
                <div className="row">
                  <div className="input-field col s12 m6">
                    <label htmlFor="password">Nouveau mot de passe</label>
                    <input
                      type="password"
                      id="password"
                      onChange={this.handleChange}
                    />
                    <span class="helper-text">Minimum 6 caractères</span>
                    <span className="red-text">{errors.password}</span>
                  </div>
                  <div className="input-field col s12 m6">
                    <label htmlFor="password2">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      id="password2"
                      onChange={this.handleChange}
                    />
                    <span className="red-text">{errors.password2}</span>
                    <br />
                  </div>
                </div>
                <div className="input-field">
                  <button className="btn waves-effect pink lighten-1">
                    Changer de mot de passe
                  </button>
                </div>
                {errors.message ? (
                  <span className="red-text">{errors.message}</span>
                ) : (
                  <span className="green-text">{success.message}</span>
                )}
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
  { resetPasswordValidated }
)(PasswordResetValidation);
