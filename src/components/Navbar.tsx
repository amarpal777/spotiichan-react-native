import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableHighlight,
  Linking,
} from 'react-native';

function Navbar() {
  return (
    <View style={styles.navbar}>
      <Image
        source={require('../../assets/imgs/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.header_text}>
        Spotii-<Text style={styles.chan}>Chan</Text>
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flex: 0,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  header_text: {
    fontFamily: 'Gotham-Bold',
    fontSize: 25,
    marginLeft: 10,
    color: '#B3B3B3',
  },
  chan: {
    color: '#1DB954',
  },
  github: {
    marginLeft: '30%',
    borderRadius: 20,
  },
  github_logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Navbar;