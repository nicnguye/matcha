import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="page-footer pink lighten-1">
        <div className="container">
          <h1>Project Matcha</h1>
        </div>
        <div className="footer-copyright">
          <div className="container">©2019 jcesari/nicnguye</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
