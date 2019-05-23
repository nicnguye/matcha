import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../../store/actions/authActions";

class PasswordReset extends Component {
  state = {
    email: "",
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
    this.props.resetPassword(this.state);
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
                <div className="input-field">
                  <label htmlFor="email">Adresse Mail</label>
                  <input type="email" id="email" onChange={this.handleChange} />
                  <span className="red-text">{errors.email}</span>
                  {errors.message ? (
                    <span className="red-text">{errors.message}</span>
                  ) : (
                    <span className="green-text">{success.message}</span>
                  )}
                </div>
                <div className="input-field">
                  <button className="btn waves-effect pink lighten-1">
                    Valider
                  </button>
                </div>
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
  { resetPassword }
)(PasswordReset);
