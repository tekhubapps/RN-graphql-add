'use strict';

import { ACTIONS } from '../util/Actions';
import {Actions} from 'react-native-router-flux';

/**
 * Gets the selected the Book as the select parameter and 
 * dispatches an action to set it it in the store
 * @param {*} selectedBook Selected Book Object from the list
 */
export const setSelectedBook = (selectedBook) => {
  return ((dispatch) => {
    const { SET_SELECTED_BOOK } = ACTIONS;
    dispatch({
      type: SET_SELECTED_BOOK,
      selectedBook,
    });
    Actions.bookDetailScreen();
  });
};
