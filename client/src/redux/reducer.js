const initialState = {
  user: {},
  resources: [],
  filter: {
    rating: 0, // show all
  },
  loginData: {
    user: "",
    logIn: false,
    accessToken: "",
    refreshToken: "",
  },
};

// TODO: add multireducer -- one for user, one for filter

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_LOGIN":
      return { ...state, loginData: action.payload };

    case "USER_LOGOUT":
      return { ...state, user: {} };

    case "FILTER_FREE":
      return { ...state, filter: { ...state.filter, free: payload } };

    case "FILTER_PAID":
      return { ...state, filter: { ...state.filter, paid: payload } };

    case "FILTER_RATING":
      return { ...state, filter: { ...state.filter, rating: payload } };

    case "GET_RESOURCES":
      return {
        ...state,
        resources: payload,
      };
    case "RESOURCES_ERROR":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default reducer;
