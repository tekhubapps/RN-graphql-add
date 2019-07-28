'use strict';

import React, { PureComponent } from 'react';
import { 
  View, 
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import TitleBar from './childcomponents/TitleBar';
import PropTypes from 'prop-types'; 

import { graphql, compose } from 'react-apollo';
import { addAuthorsQuery, AllAuthorsQuery } from '../util/Queries';

class AddAuthorScreen extends PureComponent {

  //Validstes the props with the types 
  static propTypes = {
    loading: PropTypes.bool,
    addAuthorsQuery: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
    };
  }

  _submit() {
    if (this.state.name.trim().length === 0) {
      Alert.alert('Info', 'Required name'),[
        {text: 'Okay'},
      ];
    } else if (this.state.age.trim().length === 0) {
      Alert.alert('Info', 'Required age'),[
        {text: 'Okay'},
      ];
    } else {
      try {
        this.props.addAuthorsQuery({
          variables: {
            name: this.state.name,
            age: parseInt(this.state.age),
          },
          refetchQueries: [{query: AllAuthorsQuery}]
        });
      } catch (e) {
        Alert.alert('Info', 'Please check your input'),[
          {text: 'Okay'},
        ];
      }
    }
  }

  _renderScreen() {
    return(
      <View style={{flex: 1, backgroundColor: 'white', padding: 10}}>

        <TextInput
          style={{height: 50}}
          placeholder="Name"
          returnKeyType= {'next'}
          autoCapitalize= "none"
          autoCorrect= {false}
          onSubmitEditing={(event) => {
            this.refs.ageTextInputRef.focus();
          }}
          onChangeText={(name) => {
            this.setState({name});
          }}
          value={this.state.name}
        />

        <TextInput
          ref="ageTextInputRef"
          style={{height: 50}}
          placeholder="age"
          returnKeyType= {'done'}
          autoCapitalize= "none"
          keyboardType={'numeric'}
          autoCorrect= {false}
          onChangeText={(age) => {
            this.setState({age});
          }}
          value={this.state.age}
        />

        <TouchableOpacity
          style={{borderWidth: 2, borderRadius: 5, borderColor: 'black', margin: 30, alignItems: 'center'}}
          onPress={this._submit.bind(this)}
        >

          <Text style={{color: 'black', fontSize: 15, paddingHorizontal: 15, paddingVertical: 10}}> Add Book </Text>
          
        </TouchableOpacity>

      </View>
          
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "white"/>
        <TitleBar title={'Authors'} isBackButtonNeeded={true} />
        {this._renderScreen()}
      </View>

    );
  }
}
  
const AuthorsListScreenWithGraphQL = compose(
  graphql(addAuthorsQuery, {name: 'addAuthorsQuery'})
) (AddAuthorScreen);

export default AuthorsListScreenWithGraphQL;