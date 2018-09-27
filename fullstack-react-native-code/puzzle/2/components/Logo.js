import { Image, StyleSheet } from 'react-native';
import React from 'react';

import logo from '../assets/logo.png';

export default function Logo() {
  return <Image style={styles.image} source={logo} />;
}

Logo.propTypes = {};

const styles = StyleSheet.create({
  image: {
    width: null,
    height: null,
    resizeMode: 'contain',
    aspectRatio: 285 / 84,
  },
});
