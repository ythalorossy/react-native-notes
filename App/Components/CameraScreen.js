import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Camera from 'react-native-camera';
import SimpleButton from './SimpleButton';

export default class CameraScreen extends React.Component {

  constructor (props) {
    super(props);
    console.log("CameraScreen created");
  }

  _takePicture () {

    this.camera.capture()
      .then((data) => {
        this.props.onPicture(data);
        this.props.navigator.pop();
      })
      .catch(err => {
        return;
      });
  }

  render () {
    return (

      <View style={styles.container}>
        <Camera
          captureTarget={Camera.constants.CaptureTarget.cameraRoll}
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.camera}>
        </Camera>
        <View style={styles.cameraButtonContainer}>
          <SimpleButton
            onPress={(this)._takePicture.bind(this)}
            customText="Capture"
            style={styles.cameraButton}
            textStyle={styles.cameraButtonText}
          />
        </View>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // marginTop: 64
  },
  camera: {
    flex: 1
  },
  cameraButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20
  },
  cameraButton: {
    backgroundColor: '#5B29C1',
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  cameraButtonText: {
    color: 'white',
    textAlign: 'center'
  }
});
