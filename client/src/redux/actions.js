import axios from "axios";
import { v4 as uuidv4 } from "uuid";

//USER ACTIONS
export function userLogin({ logIn, user }) {
  if (logIn === true) {
    return {
      type: "USER_LOGIN",
      payload: { logIn, user },
    };
  } else {
    return {
      type: "LOGIN_FAIL",
      payload: { logIn },
    };
  }
}

export function userLogout() {
  return {
    type: "USER_LOGOUT",
    payload: false,
  };
}

export function updateUser(user) {
  return {
    type: "UPDATE_USER",
    payload: user,
  }
}

// FILTER ACTIONS

export function filterFree(status) {
  return {
    type: "FILTER_FREE",
    payload: status,
  };
}
export function filterPaid(status) {
  return {
    type: "FILTER_PAID",
    payload: status,
  };
}
export function filterRating(rating) {
  return {
    type: "FILTER_RATING",
    payload: rating,
  };
}

// topic = "general", "frontend", "backend", "database", "machinelearning"
// status = checkbox status = true / false
export function filterCategory(topic, status) {
  return {
    type: "FILTER_CATEGORY",
    payload: { category: topic, display: status },
  };
}

//RESOURCES ACTIONS
export const getResources = () => async (dispatch) => {
  axios
    .get("/resources")
    .then((res) => {
      dispatch({
        type: "GET_RESOURCES",
        payload: res.data,
      });
      console.log("data from getResource", res.data);
    })
    .catch((error) => {
      dispatch({
        type: "RESOURCES_ERROR",
        payload: error,
      });
    });
};

export const getDashboardData = () => async (dispatch) => {
  axios
    .get("/resources/dashboard/")
    .then((res) => {
      dispatch({
        type: "GET_DASHBOARD_DATA",
        payload: res.data,
      });
      console.log("data from action", res.data);
    })
    .catch((error) => {
      dispatch({
        type: "RESOURCES_ERROR",
        payload: error,
      });
    });
};

export function updateData(boolean) {
  return {
    type: "UPDATE_DATA",
    payload: boolean,
  };
}

export const searchResources = (term) => async (dispatch) => {
  if (term) {
    axios
      .get("/resources/search/" + term)
      .then((res) => {
        dispatch({
          type: "SEARCH_RESOURCES",
          payload: res.data,
        });
        console.log("data from action", res.data);
      })
      .catch((error) => {
        dispatch({
          type: "RESOURCES_ERROR",
          payload: error,
        });
      });
  }
};

/* ALERTS */

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: "SET_ALERT",
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: "REMOVE_ALERT", payload: id }), timeout);
};
