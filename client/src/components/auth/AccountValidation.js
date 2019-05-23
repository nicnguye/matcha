import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { accountValidation } from "../../store/actions/authActions";

class AccountValidation extends Component {
  state = {
    errors: {},
    success: {}
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    } else {
      let token = this.props.match.params.token;
      this.props.accountValidation(token);
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
      if (nextProps.success.message) {
        setTimeout(() => {
          this.props.history.push("/");
        }, 3500);
      }
    }
  }

  displaySuccess() {
    return (
      <div>
        <p>Félicitations !</p>
        <p>Compte validé, redirection vers la page de connexion</p>
      </div>
    );
  }

  render() {
    const { errors } = this.state;
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
              {errors.message ? <p>{errors.message}</p> : this.displaySuccess()}
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
  { accountValidation }
)(AccountValidation);
