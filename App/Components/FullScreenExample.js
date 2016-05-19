/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TextInput,
  View,
  Image,
} from 'react-native';

import FullScreen, {ToggleView} from 'react-native-full-screen'

export default class Example extends Component {

  constructor(a,b){
    super(a,b)
    this.state = {
      focus:true
    }
  }

  ComponentWillMount(){
    FullScreen.onFullScreen();
  }

  render() {
    return (

      <ToggleView delay="0" style={{flex:1,alignItems:'center', justifyContent:'center'}}>
        <Image style={{height:500,width:500}} source={{uri:"http://placehold.it/800"}}></Image>
      </ToggleView>

    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  image:{
    height: 200,
  }
});
