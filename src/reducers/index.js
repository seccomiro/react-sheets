import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import sheetReducer from './sheetReducer';

export default combineReducers({
  sheet: sheetReducer,
});
