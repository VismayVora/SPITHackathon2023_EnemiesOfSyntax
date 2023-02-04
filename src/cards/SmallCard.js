import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import BlockCard from './BlockCard';



const { width,height } = Dimensions.get('window');

const SmallCard = ({ item }) => {

  return (
    <BlockCard
      item={item}
      style={styles.container}
      imageStyle={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2.4,
    margin: 10,
    height: 200,
    padding:10,
    borderRadius:8,
    borderWidth: 1,
    borderColor: '#929292',
  },
  image: {
    height: height / 10,
  },
  viewMore: {
    width: width / 2,
    height: 200,
  },
});

export default SmallCard;
