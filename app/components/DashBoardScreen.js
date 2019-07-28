
'use strict';

import React, { PureComponent } from 'react';
import { 
  View, 
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import TitleBar from './childcomponents/TitleBar';
import { Actions } from 'react-native-router-flux';

class DashBoardScreen extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "white"/>
        <TitleBar title={'Dashboard'}/>

        <View style={{flex: 1, flexDirection:'column', alignItems: 'center', justifyContent: 'center'}} >

          <TouchableOpacity
            style={{borderWidth: 2, borderRadius: 5, borderColor: 'white'}}
            onPress={() => {
              Actions.authorsListScreen();
            }}
          >

            <Text style={{color: 'white', fontSize: 15, paddingHorizontal: 15, paddingVertical: 10}}> View Authors </Text>
            
          </TouchableOpacity>

          <TouchableOpacity
            style={{borderWidth: 2, borderRadius: 5, borderColor: 'white', marginVertical: 20}}
            onPress={() => {
              Actions.booksListScreen();
            }}
          >

            <Text style={{color: 'white', fontSize: 15, paddingHorizontal: 15, paddingVertical: 10}}> View Books </Text>
            
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

export default DashBoardScreen;
  