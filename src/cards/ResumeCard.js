import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import BlockCard3 from './BlockCard3';



const { width,height } = Dimensions.get('window');

const ResumeCard = ({ item }) => {

  return (
    <BlockCard3
      item={item}
      style={styles.container}
      imageStyle={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2.3,
    margin: 10,
    height: height*0.3,
    alignContent:'center',
    alignItems:'center',
    backgroundColor: 'white',
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
  },
  image: {
    height: height / 10,
  },
  viewMore: {
    width: width / 2,
    height: 200,
  },
});

export default ResumeCard;
