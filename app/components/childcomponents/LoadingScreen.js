'use strict';

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';

import PropTypes from 'prop-types'; 

import Spinner from 'react-native-spinkit';

const deviceHeight = Dimensions.get('window').height;

class LoadingScreen extends Component{
    static propTypes = {
      isLoading: PropTypes.bool,
      message: PropTypes.string.isRequired,
      onReloadPress: PropTypes.func,
      isRefreshing: PropTypes.bool,
    };

    static defaultProps = {
      isLoading: true,
      isRefreshing: false,
      message: '',
    };
      
    constructor(props) {
      super(props);
      this.state = {
        height: 100,
      };
    }

    /**
    * Renders the Loading spinner or no data message with reload option
    */
    _renderContent() {
      if (this.props.isLoading) {
        return (
          <View style={{paddingTop: this.state.height * (2/5), alignItems: 'center', backgroundColor:'black'}}>
            <Spinner isVisible={this.props.isLoading}
              size={40}
              type={'Wave'}
              color={'white'}
            />
            <Text style={{textAlign: 'center', marginTop: deviceHeight/40, fontSize: deviceHeight/35, color: 'white'}}>Loading...</Text>
          </View>
        );
      } else {
        return (
          <ScrollView 
            contentContainerStyle={styles.contentContainer}
            refreshControl={
              <RefreshControl
                refreshing={this.props.isRefreshing}
                onRefresh={() => this.props.onReloadPress(true)}
              />
            }
          >
            {this._renderSpinnerOrMessage()}
          </ScrollView>
        );
      }
    }

    /**
    * Renders the given message or empty screen based on pull to refresh status
    */
    _renderSpinnerOrMessage() {
      if (this.props.isRefreshing) {
        return null;
      } else {
        return (
          <View style={{paddingTop: this.state.height * (2/5), alignItems: 'center'}}>
            <Text key={'0001'} style={{textAlign: 'center', fontSize: deviceHeight/36 }}>{this.props.message}</Text>
            <TouchableOpacity style={{marginTop: deviceHeight/40}} key={'0002'} onPress={() => this.props.onReloadPress(false)}>
              <Text style={{textAlign: 'center', fontSize: deviceHeight/40, color: 'white'}}>Tap to Reload</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }

    measureView(event) {
      this.setState({
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height,
      });
    }
    
    /**
    * Renders the Loading spinner or no data message with reload option
    */
    render() {
      return (
        <View style={{flex: 1, backgroundColor: 'black'}} onLayout={(event) => this.measureView(event)}  >
          {this._renderContent()}
        </View>
      );
    }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  
  contentContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
});
  

