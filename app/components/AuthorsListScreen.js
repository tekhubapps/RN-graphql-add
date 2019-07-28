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
import AuthorRow from './childcomponents/AuthorRow';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setSelectedAuthor } from '../actions/AuthorsListActions';

import { graphql } from 'react-apollo';
import { AllAuthorsQuery } from '../util/Queries';
import { Actions } from 'react-native-router-flux';

class AuthorsListScreen extends PureComponent {

  //Validstes the props with the types 
  static propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,

    setSelectedAuthor: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  /**
   * Renders the row of the ist 
   */
  _renderItem = (rowData) => {
    return(
      <AuthorRow 
        rowData={rowData}
        onListSeleted={(selectedAuthor) => {
          this.props.setSelectedAuthor(selectedAuthor.item);
        }}
      />
    );
  }

  /**
   * Renders the list of Authors
   */
  _renderList() {
    const { loading } = this.props.data;
    if (loading) {
      return(
        <LoadingScreen
          isLoading={loading}
          message={'No Authors'}
        />
      );
    } else {

      const { authors } = this.props.data;
      return(
        <View style={{flex: 1}}>
          <View style={{height: 30,backgroundColor: '#7B7B7B', alignContent:'center', justifyContent:'center', marginBottom: 10}}>
            <Text style={{marginLeft: 10, fontSize:18, fontWeight: 'bold', color:'white'}}>{'All Authors'}</Text>
          </View>
          <FlatList
            data={authors}
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
          title={'Authors'} 
          isBackButtonNeeded={true} 
          isAddButtonNeeded={true} 
          isAddPressed={() => {
            Actions.addAuthorScreen();
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
    setSelectedAuthor,
  }, dispatch);
};
  
const AuthorsListScreenWithGraphQL = graphql(AllAuthorsQuery)(AuthorsListScreen);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsListScreenWithGraphQL);