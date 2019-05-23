import React, { Component } from "react";
import { connect } from "react-redux";
import { userInfo } from "../../store/actions/authActions";
import axios from "axios";
import { MessageList } from "react-chat-elements";

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      conversation_id: "",
      chatHistory: [],
      dataSource: []
    };

    this.props.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      if (data.conversation_id === this.state.conversation_id) {
        let newData = {
          message_text: data.message_text,
          conversation_id: data.conversation_id,
          first_name: data.first_name,
          timestamp: data.timestamp
        };
        this.setState(
          {
            conversation_id: data.conversation_id,
            chatHistory: [...this.state.chatHistory, newData]
          },
          () => {
            let position = "";
            let titleColor = "";
            if (data.user_account_id === this.props.user.id) {
              position = "right";
              titleColor = "blue";
            } else {
              position = "left";
              titleColor = "grey";
            }
            let newDataSource = {
              type: "text",
              position: position,
              title: data.first_name,
              titleColor: titleColor,
              text: data.message_text,
              date: new Date(data.timestamp)
            };
            this.setState({
              dataSource: [...this.state.dataSource, newDataSource]
            });
          }
        );
      }
    };
  }

  componentDidMount() {
    let { user } = this.props;
    this.props.userInfo(user);
  }
  componentDidUpdate(prevProps) {
    const { convSelected } = this.props;
    let dataSource = [];
    let data = {};
    let position = "";
    let titleColor = "";
    if (prevProps.convSelected !== convSelected) {
      this.setState(
        {
          conversation_id: convSelected.conversation_id,
          chatHistory: convSelected.messages
        },
        () => {
          this.state.chatHistory.forEach(element => {
            if (element.user_account_id === this.props.user.id) {
              position = "right";
              titleColor = "blue";
            } else {
              position = "left";
              titleColor = "grey";
            }

            data = {
              type: "text",
              position: position,
              titleColor: titleColor,
              text: element.message_text,
              date: new Date(element.timestamp),
              title: element.first_name
            };

            dataSource.push(data);
          });

          this.setState({
            dataSource: dataSource
          });
        }
      );
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.message.trim()) console.log("Message Vide");
    else {
      const { profil, user, convSelected } = this.props;
      const { message } = this.state;

      let messageData = {
        conversation_id: convSelected.conversation_id,
        user_account_id: user.id,
        message_text: message,
        first_name: profil.first_name,
        timestamp: Date.now()
      };
      axios.post("/api/users/conv/addmessage", messageData);
      this.props.socket.emit("SEND_MESSAGE", messageData);
      this.setState({ message: "" });
    }
  };

  render() {
    const { conversation_id } = this.state;
    const enabled = conversation_id;
    return (
      <div className="container white">
        <h4>Chattez avec vos Matchs !</h4>
        <div>
          {
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={this.state.dataSource}
            />
          }
        </div>
        <input
          type="text"
          id="message"
          onChange={this.handleChange}
          value={this.state.message}
        />
        <button
          className="btn pink lighten-1"
          onClick={this.handleSubmit}
          disabled={!enabled}
        >
          Envoyer
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    profil: state.auth.profilInfo,
    convSelected: state.conv.convSelected
  };
};

export default connect(
  mapStateToProps,
  { userInfo }
)(ChatContainer);
