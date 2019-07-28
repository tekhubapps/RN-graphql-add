'use strict';

import { ACTIONS } from '../util/Actions';

const initialState = {
  selectedAuthor: {},
};

const { SET_SELECTED_AUTHOR } = ACTIONS;
/**
 * Sets the selected Authors in the state
 * @param {*} state state of the component
 * @param {*} action action dispatched 
 */
export const selectedAuthorstate = (state = initialState, action) => {
  const { 
    type,
    selectedAuthor,
  } = action;

  switch(type) {
    case SET_SELECTED_AUTHOR: 
      return { ...state, selectedAuthor };
    default:
      return state;
  }
};