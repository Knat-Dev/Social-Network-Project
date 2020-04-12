import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../redux/reducers/userReducer';
import uiReducer from '../redux/reducers/uiReducer';
import dataReducer from '../redux/reducers/dataReducer';

const initialState = {};

const middlware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  ui: uiReducer,
  data: dataReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middlware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
