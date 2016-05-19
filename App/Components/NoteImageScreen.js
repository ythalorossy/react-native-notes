import React, {
  Image,
  View,
  StyleSheet
} from 'react-native';

export default class NoteImageScreen extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.props.note.imagePath}}
          style={styles.image}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 64,
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  image: {
    flex: 1,
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#000000',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  }
});
