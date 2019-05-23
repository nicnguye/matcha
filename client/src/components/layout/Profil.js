import React, { Component } from "react";
import M from "materialize-css";
import { connect } from "react-redux";
import { userInfo } from "../../store/actions/authActions";
import { updateProfilUser } from "../../store/actions/profilActions";
import ProfilPhoto from "./ProfilPhoto";
import MapContainer from "../map/MapContainer";

class Profil extends Component {
  state = {
    first_name: "",
    last_name: "",
    age: "",
    details: "",
    gender_id: "",
    orientation_id: "",
    tags: "",
    errors: {},
    success: {}
  };

  componentDidMount() {
    const { user } = this.props;
    this.props.userInfo(user);
    let elems = document.querySelectorAll(".collapsible");
    let elems2 = document.querySelectorAll("select");
    M.Collapsible.init(elems, { accordion: false });
    M.FormSelect.init(elems2, {});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profil) {
      let elems3 = document.querySelectorAll(".chips");
      let tags = "";
      let newTags = [];
      if (nextProps.profil.tags) {
        tags = nextProps.profil.tags.split(",");
        tags.forEach(data => {
          newTags.push({ tag: data });
        });
        this.setState(
          {
            tags: newTags
          },
          () => {
            M.Chips.init(elems3, {
              placeholder: "Entrez un tag",
              secondaryPlaceholder: "+Tag",
              data: this.state.tags
            });
          }
        );
      }
      this.setState({
        first_name: nextProps.profil.first_name,
        last_name: nextProps.profil.last_name,
        age: nextProps.profil.age,
        details: nextProps.profil.details,
        gender_id: nextProps.profil.gender_id,
        orientation_id: nextProps.profil.orientation_id
      });
      M.Chips.init(elems3, {
        placeholder: "Entrez un tag",
        secondaryPlaceholder: "+Tag",
        data: this.state.tags
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

  handleOptionChange = e => {
    this.setState({
      gender_id: parseInt(e.target.value)
    });
  };

  handleSelectChange = e => {
    this.setState({
      orientation_id: parseInt(e.target.value)
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    let instance = M.Chips.getInstance(document.querySelector(".chips"));
    let newTags = instance.chipsData
      .map(elem => {
        return elem.tag;
      })
      .join();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      age: this.state.age,
      details: this.state.details,
      gender_id: this.state.gender_id,
      orientation_id: this.state.orientation_id,
      tags: newTags
    };
    this.props.updateProfilUser(this.props.user.id, newUser);
  };

  render() {
    const { errors, success } = this.state;
    const { user } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <ul className="collapsible">
              <li className="active">
                <div className="collapsible-header">
                  <i className="material-icons">photo_camera</i> PHOTO
                </div>
                <div className="collapsible-body white">
                  <ProfilPhoto user={user} profil={this.props.profil} />
                </div>
              </li>
              <li className="active">
                <div className="collapsible-header">
                  <i className="material-icons">insert_emoticon</i>Profil
                </div>
                <div className="collapsible-body white">
                  <div className="row">
                    <div className="col s12 m4">
                      <label htmlFor="first_name">Prénom</label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={this.state.first_name}
                        onChange={this.handleChange}
                      />
                      <span className="red-text">{errors.first_name}</span>
                    </div>
                    <div className="col s12 m4">
                      <label htmlFor="last_name">Nom</label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={this.state.last_name}
                        onChange={this.handleChange}
                      />
                      <span className="red-text">{errors.last_name}</span>
                    </div>
                    <div className="col s12 m4">
                      <label htmlFor="age">Age</label>
                      <input
                        type="text"
                        name="age"
                        id="age"
                        value={this.state.age}
                        onChange={this.handleChange}
                      />
                      <span className="red-text">{errors.age}</span>
                    </div>
                  </div>
                  <div className="row">
                    <p className="col s6">
                      <label for="male">
                        <input
                          className="with-gap"
                          id="male"
                          name="group1"
                          value="1"
                          type="radio"
                          onChange={this.handleOptionChange}
                          checked={this.state.gender_id === 1}
                        />
                        <span>Homme</span>
                      </label>
                    </p>
                    <p className="col s6">
                      <label for="female">
                        <input
                          className="with-gap"
                          id="female"
                          name="group1"
                          value="2"
                          type="radio"
                          onChange={this.handleOptionChange}
                          checked={this.state.gender_id === 2}
                        />
                        <span>Femme</span>
                      </label>
                    </p>
                  </div>
                  <label>Intéréssé par:</label>
                  <select
                    class="browser-default"
                    value={this.state.orientation_id}
                    onChange={this.handleSelectChange}
                  >
                    <option value="" disabled selected>
                      Choisissez une option
                    </option>
                    <option value="1">Homme</option>
                    <option value="2">Femme</option>
                    <option value="3">Les 2</option>
                  </select>
                </div>
              </li>
              <li className="active">
                <div className="collapsible-header">
                  <i className="material-icons">edit</i>Bio
                </div>
                <div className="collapsible-body white">
                  <label htmlFor="details">Bio</label>
                  <textarea
                    name="details"
                    id="details"
                    className="materialize-textarea"
                    value={this.state.details}
                    onChange={this.handleChange}
                  />
                  <div className="chips chips-placeholder" />

                  <div className="input-field">
                    <form onSubmit={this.handleSubmit}>
                      <button className="btn waves-effect pink lighten-1">
                        Modifier Infos
                      </button>
                    </form>
                  </div>
                  <span className="green-text">{success.message}</span>
                </div>
              </li>
              <li className="active">
                <div className="collapsible-header">
                  <i className="material-icons">map</i>Map
                </div>
                <div className="collapsible-body white">
                  <div className="container">
                    <MapContainer />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
  { userInfo, updateProfilUser }
)(Profil);
