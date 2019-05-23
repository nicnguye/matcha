import axios from "axios";

export const getConversations = id => dispatch => {
  axios
    .get("/api/users/conv/" + id)
    .then(res => {
      console.log(res.data);
      let newData = {};
      let last_message = "";
      let timestamp = "";
      dispatch({ type: "INIT_CONV" });
      res.data.forEach(element => {
        axios
          .get("/api/users/conv/lastmessage/" + element.id)
          .then(result => {
            if (result.data[0]) {
              last_message = result.data[0].message_text;
              timestamp = result.data[0].timestamp;
            } else {
              last_message = "";
              timestamp = "";
            }
            newData = {
              conversation_id: element.id,
              avatar1: element.avatar1,
              avatar2: element.avatar2,
              first_name1: element.first_name1,
              first_name2: element.first_name2,
              user_account_id1: element.user_account_id1,
              user_account_id2: element.user_account_id2,
              last_message: last_message,
              timestamp: timestamp
            };
            dispatch({ type: "GET_CONV", payload: newData });
          })
          .catch(err => console.log(err));
      });
    })
    .catch(err => console.log(err));
};

export const getMessages = id => dispatch => {
  axios
    .get("/api/users/conv/room/" + id)
    .then(res => {
      dispatch({ type: "GET_MESSAGES", payload: res.data });
    })
    .catch(err => console.log(err));
};
