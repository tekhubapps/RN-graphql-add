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

import { Dropdown } from 'react-native-material-dropdown';

import TitleBar from './childcomponents/TitleBar';
import PropTypes from 'prop-types'; 
import LoadingScreen from './childcomponents/LoadingScreen';

import { graphql, compose } from 'react-apollo';
import { AllAuthorsQuery, addBooksQuery, AllBooksQuery } from '../util/Queries';

class AddBookScreen extends PureComponent {

  //Validstes the props with the types 
  static propTypes = {
    AllAuthorsQueryProcess: PropTypes.object,
    addBooksQueryProcess: PropTypes.func,
    data: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      genre: '',
      authorId: '',
    };
  }

  _submit() {
    if (this.state.name.trim().length === 0) {
      Alert.alert('Info', 'Required name'),[
        {text: 'Okay'},
      ];
    } else if (this.state.genre.trim().length === 0) {
      Alert.alert('Info', 'Required genre'),[
        {text: 'Okay'},
      ];
    } else if (this.state.authorId.trim().length === 0) {
      Alert.alert('Info', 'Select author name'),[
        {text: 'Okay'},
      ];
    } else {
      this.props.addBooksQueryProcess({
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          authorId: this.state.authorId,
        },
        refetchQueries: [{query: AllBooksQuery}]
      });
    }
  }

  _renderScreen() {
    const {AllAuthorsQueryProcess, addBooksQueryProcess}  = this.props;
    if (AllAuthorsQueryProcess.loading || addBooksQueryProcess.loading) {
      return(
        <LoadingScreen
          isLoading={(AllAuthorsQueryProcess.loading || addBooksQueryProcess.loading)}
          message={'No Authors'}
        />
      );
    } else {
      return(
        <View style={{flex: 1, backgroundColor: 'white', padding: 10}}>

          <TextInput
            style={{height: 50}}
            placeholder="Name"
            returnKeyType= {'next'}
            autoCapitalize= "none"
            autoCorrect= {false}
            onSubmitEditing={(event) => {
              this.refs.genreTextInputRef.focus();
            }}
            onChangeText={(name) => {
              this.setState({name});
            }}
            value={this.state.name}
          />

          <TextInput
            ref="genreTextInputRef"
            style={{height: 50}}
            placeholder="Genre"
            returnKeyType= {'done'}
            autoCapitalize= "none"
            autoCorrect= {false}
            onChangeText={(genre) => {
              this.setState({genre});
            }}
            value={this.state.genre}
          />

          <Dropdown
            label={'Select Author'}
            data={AllAuthorsQueryProcess.authors}
            valueExtractor={(item) => {
              return item.id;
            }}
            labelExtractor={(item) => {
              return item.name;
            }}
            onChangeText={(authorId) => {
              this.setState({authorId});
            }}
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
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "white"/>
        <TitleBar title={'Add Book'} isBackButtonNeeded={true} />
        {this._renderScreen()}
      </View>

    );
  }
}
  
const AuthorsListScreenWithGraphQL = compose(
  graphql(AllAuthorsQuery, {name: 'AllAuthorsQueryProcess'}),
  graphql(addBooksQuery, {name: 'addBooksQueryProcess'})
) (AddBookScreen);

export default AuthorsListScreenWithGraphQL;