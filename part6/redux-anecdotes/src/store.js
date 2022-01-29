import { createStore, combineReducers } from 'redux';
import anecReducer from './reducers/anecdoteReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import noteReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  anectodes: anecReducer,
  notification: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
