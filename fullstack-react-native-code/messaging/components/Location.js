import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default class Location extends React.Component {
  state = {
    coords: null,
    error: null,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleChange,
      this.handleError,
    );
    navigator.geolocation.watchPosition(this.handleChange, this.handleError);
  }

  handleChange = location => {
    this.setState({
      coords: location.coords,
      error: null,
    });
  };

  handleError = error => {
    this.setState({ error });
  };

  render() {
    const { coords, error } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Geolocation:{' '}
          {coords ? `${coords.latitude}, ${coords.longitude}` : error}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: 'blue',
  },
});
