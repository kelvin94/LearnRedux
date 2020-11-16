const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const thunk = require("redux-thunk").default;
const axios = require("axios");

const initState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

function fetchUserRequestActionCreator() {
  return {
    type: FETCH_USERS_REQUEST,
  };
}

function fetchUserRequestActionCreator() {
  return {
    type: FETCH_USERS_REQUEST,
  };
}

const fetchUserSuccessActionCreator = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUserFailureActionCreator = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

// Async action creator
// Note: what Thunk brings is allowing us to isntead of returning an plain action object, return a function. Remember by Redux's definition, action creator is suppose to be PURE and no async things no side-effects(async api calls) should be performed.
const fetchUsers = () => {
  // Note: Thunk allows us to have "dispatch" as an argument in action creator
  return function (dispatch) {
    dispatch(fetchUserRequestActionCreator());
    axios
      .get("https://jsonplaceholder.ty5picode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUserSuccessActionCreator(users));
      })
      .catch((error) => {
        // error
        dispatch(fetchUserFailureActionCreator(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
