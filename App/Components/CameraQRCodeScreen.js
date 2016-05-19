'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  Platform,
  InteractionManager
} from 'react-native';

import BarcodeScanner from 'react-native-barcode-scanner-universal';

export default class CameraQRCodeScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isLoadedScreen: false,
      isCodeBar: false,
      torchMode: 'off',
      cameraType: 'back'
    }

    this._onBarCodeRead = this._onBarCodeRead.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions( () => {
      this.setState({ isLoadedScreen: true });
    });
  }

  _onBarCodeRead (code) {
    if (this.state.isLoadedScreen && !this.state.isCodeBar) {
      this.setState({ isCodeBar: true });
      this.props.onBarCodeRead(code);
    }
  }

  render () {

    if (!this.state.isLoadedScreen) {
      return (
        <View style={styles.rectangleContainer}>
          <Text>Loading ...</Text>
        </View>
      );
    }


    let scanArea = null
    if (Platform.OS === 'ios') {
      scanArea = (
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle} />
        </View>
      )
    }

    return (
      <BarcodeScanner
        onBarCodeRead={this._onBarCodeRead}
        torchMode={this.state.torchMode}
        cameraType={this.state.cameraType}
        style={styles.camera}>
        {scanArea}
      </BarcodeScanner>
    )
  }
};

const styles = StyleSheet.create({
  camera: {
    flex: 1
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  }
});
