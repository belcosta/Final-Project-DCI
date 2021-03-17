const initialState = {
  user: {},
  logIn: false,
  update: false,
  resources: [],
  searchedResources: [],
  dashboard: [],
  filter: {
    free: true,
    paid: true,
    rating: 1,
    general: true,
    frontend: true,
    backend: true,
    database: true,
    search: "",
    rating: 0
  },
  loginData: {
    logIn: false,
    accessToken: "",
    refreshToken: "",
  },
  error: {},
};

// TODO: add multireducer -- one for user, one for filter

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_LOGIN":
      return { ...state, logIn: payload.logIn, user: payload.user };
    case "LOGIN_FAIL":
      return { ...state, logIn: payload.logIn, user: {} };
    case "USER_LOGOUT":
      return { ...state, user: {}, logIn: payload };
      case "UPDATE_USER":
        return { ...state, user: payload };
    case "FILTER_CATEGORY":
      return {
        ...state,
        filter: { ...state.filter, [payload.category]: payload.display },
      };

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
        searchedResources: payload
      };

    case "UPDATE_DATA":
      return {
        ...state,
        update: !payload,
      };
    case "SEARCH_RESOURCES":
      return {
        ...state,
        searchedResources: payload,
      };
    case "GET_DASHBOARD_DATA":
      return {
        ...state,
        dashboard: payload,
      };
    case "RESOURCES_ERROR":
      return {
        ...state,
        error: payload,
      };
    case "SET_ALERT":
      return { ...state, payload };
    case "REMOVE_ALERT":
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default reducer;
