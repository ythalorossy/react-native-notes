'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  WebView,
} from 'react-native';

export default class WebViewScreen extends React.Component {

  constructor (props) {
    super(props);
    console.log('Creating WebViewScreen', props);
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.showText}>{ this.props.code.data }</Text>
        <WebView
          ref="webview"
          source={ {uri: this.props.code.data} }
          style= {styles.webview}
          scalePageToFit={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    marginTop: 56
  },
  showText: {
    flex: .1
  },
  webview: {
    flex: 1,

  }
});
