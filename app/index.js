'use strict';

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import DashBoardScreen from './components/DashBoardScreen';
import BooksListScreen from './components/BooksListScreen';
import BookDetailScreen from './components/BookDetailScreen';
import AuthorsListScreen from './components/AuthorsListScreen';
import AuthorDetailScreen from './components/AuthorDetailScreen';
import AddAuthorScreen from './components/AddAuthorScreen';
import AddBookScreen from './components/AddBookScreen';
/**
 * Registeres all teh scenes or components used in the application
 */
export default class RouteNavigator extends Component {
  render() {
    return (
      <Router>
        <Scene key="root"
          hideNavBar
        >
          <Scene key={'dashBoardScreen'} component={DashBoardScreen} initial />
          <Scene key={'booksListScreen'} component={BooksListScreen} />
          <Scene key={'bookDetailScreen'} component={BookDetailScreen}  />
          <Scene key={'authorsListScreen'} component={AuthorsListScreen} />
          <Scene key={'authorDetailScreen'} component={AuthorDetailScreen}  />
          <Scene key={'addAuthorScreen'} component={AddAuthorScreen}  />
          <Scene key={'addBookScreen'} component={AddBookScreen}  />
        </Scene>
      </Router>
    );
  }
}
