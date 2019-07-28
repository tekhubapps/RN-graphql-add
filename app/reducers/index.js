'use strict';

import { combineReducers } from 'redux';

import { selectedBookstate } from './BooksReducer';
import { selectedAuthorstate } from './AuthorsReducer';

//Combines all the reducer for the store and exports to it
const rootReducer = combineReducers({
  selectedBookstate,
  selectedAuthorstate,
});
  
export default rootReducer;