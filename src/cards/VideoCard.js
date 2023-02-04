import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import BlockCard2 from './BlockCard2';

const { width, height } = Dimensions.get('window');

const VideoCard = ({ item }) => {

  return (
    <BlockCard2
      item={item}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2.5,
    margin: 10,
    height: 200,
    padding: 7,
    borderColor: '#F0F0F0',
    elevation: 10,
    backgroundColor: '#fff',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#333',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VideoCard;
