import React, { Component } from "react";
import { connect } from "react-redux";
import { getPhotos } from "../../store/actions/profilActions";
import axios from "axios";

class ProfilPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file1: "/images/profil1.jpeg",
      file2: "/images/add-icon.png",
      file3: "/images/add-icon.png",
      file4: "/images/add-icon.png",
      file5: "/images/add-icon.png",
      fileUpload1: "",
      fileUpload2: "",
      fileUpload3: "",
      fileUpload4: "",
      fileUpload5: ""
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.props.getPhotos(user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profil) {
      this.setState({ file1: nextProps.profil.profil_image });
    }

    if (nextProps.photoList) {
      nextProps.photoList.forEach(elem => {
        if (elem.profil_image === "profil2") {
          this.setState({ file2: elem.link });
        }
        if (elem.profil_image === "profil3") {
          this.setState({ file3: elem.link });
        }
        if (elem.profil_image === "profil4") {
          this.setState({ file4: elem.link });
        }
        if (elem.profil_image === "profil5") {
          this.setState({ file5: elem.link });
        }
      });
    }
  }

  handleClick1 = e => {
    this.refs.file1.click();
  };

  handleClick2 = e => {
    this.refs.file2.click();
  };

  handleClick3 = e => {
    this.refs.file3.click();
  };

  handleClick4 = e => {
    this.refs.file4.click();
  };

  handleClick5 = e => {
    this.refs.file5.click();
  };

  handleChange1 = e => {
    if (e.target.files && e.target.files[0]) {
      this.setState({ fileUpload1: e.target.files[0] });
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ file1: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  handleChange2 = e => {
    if (e.target.files && e.target.files[0]) {
      this.setState({ fileUpload2: e.target.files[0] });
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ file2: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  handleChange3 = e => {
    if (e.target.files && e.target.files[0]) {
      this.setState({ fileUpload3: e.target.files[0] });
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ file3: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  handleChange4 = e => {
    if (e.target.files && e.target.files[0]) {
      this.setState({ fileUpload4: e.target.files[0] });
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ file4: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  handleChange5 = e => {
    if (e.target.files && e.target.files[0]) {
      this.setState({ fileUpload5: e.target.files[0] });
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ file5: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profil1", this.state.fileUpload1);
    formData.append("profil2", this.state.fileUpload2);
    formData.append("profil3", this.state.fileUpload3);
    formData.append("profil4", this.state.fileUpload4);
    formData.append("profil5", this.state.fileUpload5);
    axios.put("/api/users/profil/upload-photo/" + this.props.user.id, formData);
  };

  basicImage = id => {
    return <img src="/images/add-icon.png" alt="basic" id={id} />;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div
            className="col s6 m3 l2"
            style={{ position: "relative", display: "inline-block" }}
          >
            <img
              src={this.state.file1}
              alt="file1"
              className="responsive-img card"
              onClick={this.handleClick1}
              style={{
                border: "solid red 1px",
                borderRadius: "5px"
              }}
            />
            <span style={{ position: "absolute", left: "5%", top: "3%" }}>
              <i className="material-icons">grade</i>
            </span>
            <input
              id="file1"
              type="file"
              accept=".jpeg, .png"
              ref="file1"
              style={{ display: "none" }}
              onChange={this.handleChange1}
            />
          </div>
          <div className="col s6 m3 l2">
            <img
              src={this.state.file2}
              alt="file2"
              className="responsive-img card"
              onClick={this.handleClick2}
            />
            <input
              id="file2"
              type="file"
              accept=".jpeg, .png"
              ref="file2"
              style={{ display: "none" }}
              onChange={this.handleChange2}
            />
          </div>
          <div className="col s6 m3 l2">
            <img
              src={this.state.file3}
              alt="file3"
              className="responsive-img card"
              onClick={this.handleClick3}
            />
            <input
              id="file3"
              type="file"
              accept=".jpeg, .png"
              ref="file3"
              style={{ display: "none" }}
              onChange={this.handleChange3}
            />
          </div>
          <div className="col s6 m3 l2">
            <img
              src={this.state.file4}
              alt="file4"
              className="responsive-img card"
              onClick={this.handleClick4}
            />
            <input
              id="file4"
              type="file"
              accept=".jpeg, .png"
              ref="file4"
              style={{ display: "none" }}
              onChange={this.handleChange4}
            />
          </div>
          <div className="col s6 m3 l2">
            <img
              src={this.state.file5}
              alt="file5"
              className="responsive-img card"
              onClick={this.handleClick5}
            />
            <input
              id="file5"
              type="file"
              accept=".jpeg, .png"
              ref="file5"
              style={{ display: "none" }}
              onChange={this.handleChange5}
            />
          </div>
        </div>
        <p>Cliquez sur une photo pour le modifier</p>
        <button type="submit" className="btn">
          Modifier photos
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    profil: state.auth.profilInfo,
    photoList: state.auth.photoList
  };
};

export default connect(
  mapStateToProps,
  { getPhotos }
)(ProfilPhoto);
