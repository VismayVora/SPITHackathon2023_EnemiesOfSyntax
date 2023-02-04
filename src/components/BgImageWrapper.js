import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

const BgImageWrapper = ({image, children}) => {
  return (
    <ImageBackground source={image} style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      />
      {children}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    //height: height,
    //width: width,
    flex: 1,
  },
});
export default BgImageWrapper;
