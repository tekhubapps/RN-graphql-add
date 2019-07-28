'use strict';

import React, { PureComponent } from 'react';
import { 
  View, 
  Text,
  StatusBar,
} from 'react-native';
import TitleBar from './childcomponents/TitleBar';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 


/**
 * Displayed the detailed info of the comments screen
 */
class BookDetailScreen extends PureComponent {

    //Validates the props passed to ths component
    static propTypes = {
      selectedBook: PropTypes.object,
    };

    constructor(props) {
      super(props);
    }

    render() {
      const { name, genre, author } = this.props.selectedBook;
      let allBooks = '';

      author.books.forEach((book) => {
        if (allBooks) {
          allBooks = `${allBooks  },\n`;
        }
        allBooks = allBooks + book.name;
      });

      return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "white"/>
          <TitleBar title={'Book Info'} isBackButtonNeeded={true}/>

          <View style={{flex: 1,flexDirection:'column', margin: 10}}>

            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize:16, color:'white' }}>{'Name : '}</Text>
              <Text style={{fontSize:18, color:'white', fontWeight:'bold', marginLeft: 5}}>{name}</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontSize:16, color:'white' }}>{'Genre : '}</Text>
              <Text style={{fontSize:18, color:'white', fontWeight:'bold', marginLeft: 5}}>{genre}</Text>
            </View>

            <Text style={{fontSize:16, color:'white', marginTop:10}}>{'Author Details : '}</Text>
            <Text style={{fontSize:18, fontWeight:'bold', color:'white', marginTop:5}}>{author.name} ({author.age})</Text>

            <Text style={{fontSize:12, color:'white', marginTop:5, marginLeft: 5}}>{'Other Books : '}</Text>
            <Text style={{fontSize:14, fontWeight:'bold', color:'white', marginTop:2, marginLeft: 10}}>{allBooks}</Text>

          </View>
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
  const { selectedBookstate: { selectedBook }} = state;    
  return {
    selectedBook,
  };
};
      
/**
     * Maps the actions of the component as props of this component
     * @param {*} dispatch Dispatch is to call the actions
     */
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
      
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailScreen);
  