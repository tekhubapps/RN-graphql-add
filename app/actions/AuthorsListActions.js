'use strict';

import { ACTIONS } from '../util/Actions';
import {Actions} from 'react-native-router-flux';

/**
 * Gets the selected the Author as the select parameter and 
 * dispatches an action to set it it in the store
 * @param {*} selectedAuthor Selected Author Object from the list
 */
export const setSelectedAuthor = (selectedAuthor) => {
  return ((dispatch) => {
    const { SET_SELECTED_AUTHOR } = ACTIONS;
    dispatch({
      type: SET_SELECTED_AUTHOR,
      selectedAuthor,
    });
    Actions.authorDetailScreen();
  });
};
