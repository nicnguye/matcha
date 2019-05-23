const initState = {
  username: "",
  convList: [],
  convSelected: {
    conversation_id: "",
    messages: []
  }
};

const convReducer = (state = initState, action) => {
  switch (action.type) {
    case "INIT_CONV":
      return { ...state, convList: [] };
    case "GET_CONV":
      return { ...state, convList: [...state.convList, action.payload] };
    case "GET_MESSAGES":
      return { ...state, convSelected: action.payload }; //check git models/chat.js
    case "NEW_MESSAGE":
      return Object.assign({}, state, {
        ...state,
        convSelected: {
          ...state.convSelected,
          messages: [...state.convSelected.messages, action.payload]
        }
      });
    default:
      return state;
  }
};

export default convReducer;
