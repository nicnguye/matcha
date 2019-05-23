import React, { Component } from "react";
import { connect } from "react-redux";
import { getConversations, getMessages } from "../../store/actions/convActions";
import { ChatItem } from "react-chat-elements";

class RoomContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      convList: []
    };

    this.props.socket.on("RECEIVE_MESSAGE", function(data) {
      changeLastMessage(data);
    });

    const changeLastMessage = data => {
      const index = this.state.convList
        .map(elem => elem.conversation_id)
        .indexOf(data.conversation_id);
      let tab = this.state.convList;
      if (index !== -1) {
        tab[index].last_message = data.message_text;
        tab[index].timestamp = data.timestamp;
        this.setState({
          convList: tab
        });
      }
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.props.getConversations(user.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.convList !== this.props.convList) {
      this.setState({
        convList: this.props.convList
      });
    }
  }

  subscribeToRoom = id => {
    this.props.getMessages(id);
  };

  render() {
    const { convList } = this.state;
    let avatar = "";
    let name = "";
    return (
      <div>
        {convList.map((data, index) => {
          // console.log(convList);
          if (data.user_account_id1 === this.props.user.id) {
            avatar = data.avatar2;
            name = data.first_name2;
          } else {
            avatar = data.avatar1;
            name = data.first_name1;
          }
          this.props.socket.emit("SUBSCRIBE_ROOM", data.conversation_id);
          return (
            <ChatItem
              key={index}
              title={name}
              avatar={avatar}
              subtitle={data.last_message}
              date={new Date(data.timestamp)}
              unread={0}
              onClick={() => {
                this.subscribeToRoom(data.conversation_id);
              }}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    convList: state.conv.convList,
    last_message: state.conv.last_message,
    username: state.conv.username,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { getConversations, getMessages }
)(RoomContainer);
