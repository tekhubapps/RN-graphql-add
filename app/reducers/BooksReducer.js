'use strict';

import { ACTIONS } from '../util/Actions';

const initialState = {
  selectedBook: {},
};

const { SET_SELECTED_BOOK } = ACTIONS;
/**
 * Sets the selected Books in the state
 * @param {*} state state of the component
 * @param {*} action action dispatched 
 */
export const selectedBookstate = (state = initialState, action) => {
  const { 
    type,
    selectedBook,
  } = action;

  switch(type) {
    case SET_SELECTED_BOOK: 
      return { ...state, selectedBook };
    default:
      return state;
  }
};