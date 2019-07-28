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
class AuthorDetailScreen extends PureComponent {

    //Validates the props passed to ths component
    static propTypes = {
      selectedAuthor: PropTypes.object,
    };

    constructor(props) {
      super(props);
    }

    render() {
      const { name, age, books } = this.props.selectedAuthor;
      let allBooks = '';

      books.forEach((book) => {
        if (allBooks) {
          allBooks = `${allBooks  } ,\n`;
        }
        allBooks = allBooks + book.name;
      });

      return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "white"/>
          <TitleBar title={'Author Info'} isBackButtonNeeded={true}/>

          <View style={{flex: 1,flexDirection:'column', margin: 10}}>

            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize:16, color:'white' }}>{'Name : '}</Text>
              <Text style={{fontSize:18, color:'white', fontWeight:'bold', marginLeft: 5}}>{name}</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontSize:16, color:'white' }}>{'Age : '}</Text>
              <Text style={{fontSize:18, color:'white', fontWeight:'bold', marginLeft: 5}}>{age}</Text>
            </View>

            <Text style={{fontSize:16, color:'white', marginTop:5,}}>{'Other Authors : '}</Text>
            <Text style={{fontSize:18, fontWeight:'bold', color:'white', marginTop:2, marginLeft: 10}}>{allBooks}</Text>

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
  const { selectedAuthorstate: { selectedAuthor }} = state;    
  return {
    selectedAuthor,
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetailScreen);
  