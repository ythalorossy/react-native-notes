import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

import SimpleButton from './SimpleButton';
import NoteList     from './NoteList';

export default class HomeScreen extends React.Component {

  constructor (props){
    super(props);
    console.log('Loading HomeScreen', props);
  }

  render () {
    return (
      <View style={styles.container}>

        <NoteList
          notes={this.props.notes}
          onSelectNote={this.props.onSelectNote}
        />

        <Text style={styles.noNotesText}>You havent created any notes!</Text>

        <SimpleButton
          onPress={() => this.props.navigator.push({
            name : 'fullscreen'
          })}
          customText = "FullScreen"
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />

        <SimpleButton
          onPress={() => this.props.navigator.push({
            name : 'readQRCode'
          })}
          customText = "Read QRCode"
          style={styles.simpleButton}
          textStyle={styles.simpleButtonText}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 60
  },
  noNotesText: {
    color: '#48209A',
    marginBottom: 10
  },
  simpleButton : {
    backgroundColor: '#5B29C1',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: '#48209A',
    borderWidth: 1,
    borderRadius: 4,
    shadowColor: 'darkgrey',
    shadowOffset: {
    width: 1,
    height: 1
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  simpleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
