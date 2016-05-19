import React, {
  View,
  Text,
  StyleSheet,
  // MapView
} from 'react-native';

import MapView from 'react-native-maps';

export default class NoteLocationScreen extends React.Component {

  constructor (props) {
    super(props);
    console.log("Creating NoteLocationScreen", props);
    this.state = {
      initialPosition: props.initialPosition,
      region : {
        latitude: -3.731861,
        longitude: -38.52667,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }

  _onRegionChange(region) {
    this.setState({region});
  }

  render () {
    return (
      <View style={styles.container}>
      <MapView
        style={styles.map}
        onRegionChange={(region) => this._onRegionChange(region)}
        initialRegion={this.state.region}
      >
        <MapView.Marker
            coordinate={{
              latitude: -3.731861,
              longitude: -38.52667
            }}
            title="I am here"
            description="Description"
          />
      </MapView>
      <Text style={styles.inputText}> Latitude: {this.state.region.latitude}</Text>
      <Text style={styles.inputText}> Longitude: {this.state.region.longitude}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'column'
  },
  inputText: {
    flex: .1
  },
  map: {
    // position: 'relative',
    flex: 1,
    // top: 59,
    left: 2,
    right: 2,
    bottom: 2,
  },
});
