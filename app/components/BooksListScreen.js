'use strict';

import React, { PureComponent } from 'react';
import { 
  View, 
  Text,
  FlatList,
  StatusBar,
} from 'react-native';

import TitleBar from './childcomponents/TitleBar';
import PropTypes from 'prop-types'; 
import LoadingScreen from './childcomponents/LoadingScreen';
import BookRow from './childcomponents/BookRow';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setSelectedBook } from '../actions/BooksListActions';

import { graphql } from 'react-apollo';
import { AllBooksQuery } from '../util/Queries';
import { Actions } from 'react-native-router-flux';

class BooksListScreen extends PureComponent {

  //Validstes the props with the types 
  static propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,

    setSelectedBook: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  /**
   * Renders the row of the ist 
   */
  _renderItem = (rowData) => {
    return(
      <BookRow 
        rowData={rowData}
        onListSeleted={(selectedBook) => {
          this.props.setSelectedBook(selectedBook.item);
        }}
      />
    );
  }

  /**
   * Renders the list of Books
   */
  _renderList() {
    const { loading } = this.props.data;
    if (loading) {
      return(
        <LoadingScreen
          isLoading={loading}
          message={'No Books'}
        />
      );
    } else {

      const { books } = this.props.data;
      return(
        <View style={{flex: 1}}>
          <View style={{height: 30,backgroundColor: '#7B7B7B', alignContent:'center', justifyContent:'center', marginBottom: 10}}>
            <Text style={{marginLeft: 10, fontSize:18, fontWeight: 'bold', color:'white'}}>{'All Books'}</Text>
          </View>
          <FlatList
            data={books}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
            
      );
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "white"/>
        <TitleBar 
          title={'Books'} 
          isBackButtonNeeded={true} 
          isAddButtonNeeded={true} 
          isAddPressed={() => {
            Actions.addBookScreen();
          }} 
        />
        {this._renderList()}
      </View>

    );
  }
}

/**
 * Maps the state of the redux store to props to this component
 * @param {*} state state which is in redux store
 * @param {*} props props of the component
 */
const mapStateToProps = (state, props) => {    
  return {};
};
    
/**
   * Maps the actions of the component as props of this component
   * @param {*} dispatch Dispatch is to call the actions
   */
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
    setSelectedBook,
  }, dispatch);
};
  
const BooksListScreenWithGraphQL = graphql(AllBooksQuery)(BooksListScreen);

export default connect(mapStateToProps, mapDispatchToProps)(BooksListScreenWithGraphQL);