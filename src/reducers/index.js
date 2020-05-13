import { combineReducers } from 'redux';
import sheetReducer from './sheetReducer';

export default combineReducers({
  sheet: sheetReducer,
});
