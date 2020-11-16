const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// action creator
function buyCakeActionCreator() {
  return {
    type: BUY_CAKE,
  };
}
function buyIcecreamActionCreator() {
  return {
    type: BUY_ICECREAM,
  };
}

const initCakeState = {
  numOfCakes: 10,
};

const initIcecreamState = {
  numOfIcecream: 20,
};

const cakeReducer = (state = initCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const icecreamReducer = (state = initIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIcecream: state.numOfIcecream - 1,
      };
    default:
      return state;
  }
};

// combining multiple reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

const applyMiddleware = redux.applyMiddleware;
const store = createStore(rootReducer, applyMiddleware(logger));

console.log(store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCakeActionCreator());
store.dispatch(buyCakeActionCreator());
store.dispatch(buyIcecreamActionCreator());

// unsubscribe from store
unsubscribe();
