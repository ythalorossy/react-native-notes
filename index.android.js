/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Navigator,
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  BackAndroid
} from 'react-native';

import _ from 'underscore';

import SimpleButton from './App/Components/SimpleButton';
import NoteScreen   from './App/Components/NoteScreen'
import HomeScreen   from './App/Components/HomeScreen'
import NoteLocationScreen from './App/Components/NoteLocationScreen';
import CameraScreen from './App/Components/CameraScreen';
import NoteImageScreen from './App/Components/NoteImageScreen';
import CameraQRCodeScreen from './App/Components/CameraQRCodeScreen';
import WebViewScreen from './App/Components/WebViewScreen';
import FullScreenExample from './App/Components/FullScreenExample';

let NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <SimpleButton
            onPress={
              () => navigator.push({name:'noteLocations'})
            }
            customText='Map'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
          />
        );
      case 'createNote':
        return (
          <SimpleButton
            onPress={() => navigator.pop()}
            customText='Back'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
          />
        );
      case 'noteLocations':
        return (
          <SimpleButton
            onPress={() => navigator.pop()}
            customText='Back'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
          />
        );
      case 'camera':
        return (
          <SimpleButton
            onPress={() => navigator.pop()}
            customText='Back'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
          />
        );
      case 'noteImage':
        return (
          <SimpleButton
            onPress={() => navigator.pop()}
            customText='Back'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
          />
        );
      case 'readQRCode':
        return (
          <SimpleButton
            onPress={() => navigator.pop()}
            customText='Back'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
          />
        );
      case 'webview':
        return (
          <SimpleButton
            onPress={() => navigator.replace({
              name: 'home'
            })}
            customText='Back'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
          />
        );
      default:
        return null;
    }
  },
  RightButton: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <SimpleButton
            onPress={() => {
              navigator.push({
                name: 'createNote',
                note: {
                  id: new Date().getTime(),
                  title: '',
                  body: ''
                }
              });
            }}
            customText='Create Note'
            style={styles.navBarRightButton}
            textStyle={styles.navBarButtonText}
          />
        );

        case 'createNote':
        if (route.note.isSaved) {
          return (
            <SimpleButton
              onPress={() => {
                navigator.props.onDeleteNote(route.note);
                navigator.pop();
              }
            }
            customText='Delete'
            style={styles.navBarRightButton}
            textStyle={styles.navBarButtonText}
            />
          );
        } else {
          return null;
        }
      case 'noteImage':
        return (
          <SimpleButton
            onPress={() => {
              navigator.props.onDeleteNoteImage(route.note);
              navigator.pop();
            }}
            customText='Delete'
            style={styles.navBarRightButton}
            textStyle={styles.navBarButtonText}
          />
        );

      default:
        return null;
      }
  },
  Title: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <Text style={styles.navBarTitleText}> React Notes</Text>
        );
      case 'createNote':
        return (
          <Text style={styles.navBarTitleText}>{ route.note ? route.note.title : 'Create Notes' }</Text>
        );
      case 'noteLocations':
        return (
          <Text style={styles.navBarTitleText}>Note Locations</Text>
        );
      case 'camera':
        return (
          <Text style={styles.navBarTitleText}>Take Picture</Text>
        );
      case 'noteImage':
        return (
          <Text style={styles.navBarTitleText}>{`Image:${route.note.title}`}</Text>
        );
      case 'readQRCode':
        return (
          <Text style={styles.navBarTitleText}>Read QRCode</Text>
        );
    }
  }
};

let
  sceneNavigator,
  currentScene;

class ReactNotes extends React.Component {

  constructor(props) {
    super(props);
    this.renderScene=this.renderScene.bind(this);
    this.state = {
      initialPosition: '',
      lastPosition: '',
      selectedNote: {title:"", body:""},
      notes: {
        1: {
          title: "Note 1",
          body: "body",
          id: 1,
          location: {
            coords : {
              latitude: 33.987,
              longitude: -118.47
            }
          }
        },
        2: {
          title: "Note 2",
          body: "body",
          id: 2,
          location: {
            coords : {
              latitude: 33.986,
              longitude: -118.46
            }
          }
        }
      }
    }
    this.loadNotes();
    this.trackLocation();

    BackAndroid.addEventListener('hardwareBackPress', function() {

      if (sceneNavigator && sceneNavigator.getCurrentRoutes().length > 1) {

        console.log(currentScene);

        if (currentScene == 'home') {
          return true;
        }
        sceneNavigator.pop();
      }

     return false;
   });

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  async saveNotes(notes) {
    try {
      await AsyncStorage.setItem("@ReactNotes:notes", JSON.stringify(notes));
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async loadNotes () {
    try {
      var notes = await AsyncStorage.getItem("@ReactNotes:notes");
      if (notes !== null) {
        this.setState({notes: JSON.parse(notes)});
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  updateNote(note) {
    var newNotes = Object.assign({}, this.state.notes);
    if (!note.isSaved) {
      note.location = this.state.lastPosition;
    }
    note.isSaved = true;
    newNotes[note.id] = note;
    this.setState({notes:newNotes});
    this.saveNotes(newNotes);
  }

  deleteNote(note) {
    var newNotes = Object.assign({}, this.state.notes);
    delete newNotes[note.id];
    this.setState({notes:newNotes});
    this.saveNotes(newNotes);
  }

  trackLocation () {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({initialPosition}),
      (error) => alert(error.message)
    );

    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
    });
  }

  saveNoteImage(imagePath, note) {
    note.imagePath = imagePath.path;
    this.updateNote(note);
  }

  deleteNoteImage (note) {
    note.imagePath = null;
    this.updateNote(note);
  }

  navigateToWebView (code) {
    this.refs.nav.push({
      name:'webview',
      passProps: {
        code: code
      }
    });
  }

  renderScene (route, navigator) {

    sceneNavigator = navigator;
    currentScene = route;

    switch (route.name) {
      case 'home':
        return (
          <HomeScreen navigator={navigator}
            notes={ _.toArray(this.state.notes)}
            onSelectNote={(note) => navigator.push({name:"createNote", note: note})}
          />
        );
      case 'fullscreen':
        return (
          <FullScreenExample />

        );
      case 'createNote':
        return (
          <NoteScreen
            navigator={navigator}
            note={route.note}
            onChangeNote={(note) => this.updateNote(note) }
            showCameraButton={true}
          />
        );
      case 'noteLocations':
        return (
          <NoteLocationScreen
            initialPosition={this.state.initialPosition}
            notes={this.state.notes}
            onSelectNote={
              (note) => navigator.push({name:"createNote", note: note})
            }
          />
        );
      case 'camera':
        return (
          <CameraScreen
            navigator={navigator}
            onPicture={(imagePath) => this.saveNoteImage(imagePath, route.note)}/>
        );
      case 'noteImage':
        return (
          <NoteImageScreen note={route.note} />
        );
      case 'readQRCode':
        return (
          <CameraQRCodeScreen
            navigator={navigator}
            onBarCodeRead={ (code) => this.navigateToWebView(code) }
          />
        );
      case 'webview':
        return (
          <WebViewScreen
            navigator={navigator}
            {...route.passProps}
          />
        );
    }
  }

  render () {
    return (
      <Navigator
        ref= 'nav'
        initialRoute={
          { name: 'home' }
        }
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
        onDeleteNote={(note) => this.deleteNote(note)}
        onDeleteNoteImage={(note) => this.deleteNoteImage(note)}
      />
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1
  },
  navBar : {
    backgroundColor: '#5B29C1',
    borderBottomColor: '#48209A',
    borderBottomWidth: 1
  },
  navBarTitleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    //marginVertical: 9 // iOS
    marginVertical: 16 // Android
  },
  navBarLeftButton: {
    paddingLeft: 10
  },
  navBarRightButton: {
    paddingRight: 10
  },
  navBarButtonText: {
    color: '#EEE',
    fontSize: 16,
    //marginVertical: 10 // iOS
    marginVertical: 16 // Android
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('ReactNotes', () => ReactNotes);
