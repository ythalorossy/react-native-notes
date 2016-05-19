
import React, {
  StyleSheet,
  TextInput,
  View,
  Text,
  InteractionManager
} from 'react-native';

import SimpleButton from './SimpleButton';

export default class NoteScreen extends React.Component {

  constructor (props) {
    super(props)
    console.log("Creating NoteScreen", props);
    this.state = {
      note: this.props.note,
      navigator: this.props.navigator,
      renderPlaceholderOnly: true
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions( () => {
      this.setState({ renderPlaceholderOnly: false });
    });
  }

  blurInputs () {
    this.refs.body.blur();
    this.refs.title.blur();
  }

  navigateTo (route) {
    this.props.navigator.push({
      name: route,
      note: this.state.note
    });
  }

  _renderPlaceholderView () {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingContainer}>Loading...</Text>
      </View>
    );
  }

  render () {

    if (this.state.renderPlaceholderOnly) {
      return this._renderPlaceholderView();
    }

    let pictureButton = null;

    if (this.props.showCameraButton) {
      pictureButton = (this.state.note.imagePath)
      ? (
        <SimpleButton
          onPress={
            () => {
              this.blurInputs();
              this.props.navigator.push({
                name: 'noteImage',
                note: this.state.note
              });
            }
          }
          customText="View Picture"
          style={styles.takePictureButton}
          textStyle={styles.takePictureButtonText}
        />
      )
      : (
        <SimpleButton
          onPress={
            () => {
              this.blurInputs();
              this.navigateTo('camera');
            }
          }
          customText="Take Picture"
          style={styles.takePictureButton}
          textStyle={styles.takePictureButtonText}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref="title"
            autoFocus={false}
            autoCapitalize="sentences"
            placeholder="Untitled"
            style={[styles.textInput, styles.title]}
            onEndEditing={(text) => {this.refs.body.focus()}}
            underlineColorAndroid="transparent"
            value={this.state.note.title}
            onChangeText={ (title) => this.updateNote(title, this.state.note.body) }
          />
          {pictureButton}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref="body"
            maxNumberOfLines={5}
            multiline={true}
            numberOfLines={5}
            placeholder="Start typing"
            style={[styles.textInput, styles.body]}
            textAlignVertical="top"
            underlineColorAndroid="transparent"
            value={this.state.note.body}
            onChangeText={ (body) => this.updateNote(this.state.note.title, body) }
          />
        </View>
      </View>
    );
  }

  updateNote(title, body) {
    let note = Object.assign(this.state.note, {title, body});
    this.props.onChangeNote(note);
    this.setState(note);
  }

}

var styles = StyleSheet.create({
  loadingContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 64,
    margin: 10
  },
  inputContainer: {
    borderBottomColor: '#9E7CE3',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginBottom: 10
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  title : {
    height: 40
  },
  body : {
    flex: 1
  },
  takePictureButton: {
    backgroundColor: '#5B29C1',
    borderColor: '#48209A',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: 'darkgrey',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.8,
    shadowRadius: 1
  },
  takePictureButtonText: {
    color: 'white'
  }
});
