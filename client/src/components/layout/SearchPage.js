import React, { Component } from "react";
import M from "materialize-css";

class SearchPage extends Component {
  componentDidMount() {
    let elems = document.querySelectorAll("input[type=range]");
    M.Range.init(elems);
  }

  state = {};
  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="row">
            <div className="col s5">
              <form action="#">
                <span>Distance (en km): </span>
                <p className="range-field">
                  <input type="range" id="test5" min="0" max="20" />
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
