import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './reducer/useReducer';
const middlwareEnhancer = applyMiddleware(thunk);

const store = createStore(
  userReducer,
  undefined,
  compose(
    middlwareEnhancer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
