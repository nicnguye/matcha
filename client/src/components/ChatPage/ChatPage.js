import React, { Component } from "react";
import RoomContainer from "./RoomContainer";
import ChatContainer from "./ChatContainer";

import io from "socket.io-client";
let socket = io("http://localhost:8001");

class ChatPage extends Component {
  render() {
    return (
      <div className="container white" style={{ marginTop: "30px" }}>
        <div className="row card">
          <div className="col s6 m4">
            <RoomContainer socket={socket} />
          </div>
          <div className="col s6 m8">
            <ChatContainer socket={socket} />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatPage;
