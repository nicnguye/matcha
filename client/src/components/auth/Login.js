import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home/page/1");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home/page/1");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="row login">
        <div className="col s12 l4 offset-l4">
          <div className="card">
            <div className="card-action grey darken-2 white-text center-align">
              <h3>Matcha</h3>
            </div>
            <div className="card-content">
              <form onSubmit={this.handleSubmit} className="white">
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
                  <span className="red-text">{errors.password}</span>
                  <span className="red-text">{errors.message}</span>
                </div>
                <br />
                <div className="input-field">
                  <button className="btn waves-effect pink lighten-1">
                    Connexion
                  </button>
                  <Link to="/reset">
                    <button className="btn-flat waves-effect waves-light">
                      Mot de passe oublié ?
                    </button>
                  </Link>
                </div>
              </form>
              <Link to="/register" className="btn-link">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
