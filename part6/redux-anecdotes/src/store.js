import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import anecReducer from './reducers/anecdoteReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import noteReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  anectodes: anecReducer,
  notification: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
