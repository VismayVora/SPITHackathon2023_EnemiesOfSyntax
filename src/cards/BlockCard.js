import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,Text
} from 'react-native';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BlockCard = ({ style, imageStyle, item, onPress }) => {
  const { thumbnail, title, desc } = item;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <Image source={{ uri: thumbnail }} style={[styles.image, imageStyle]} />
        <View style={styles.contentContainer}>
          <Title>{title}</Title>
          <Subtitle>{desc}</Subtitle>
          <TouchableOpacity>
            <Text style={styles.viewMore}>View Jobs</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 150,
  },
  viewMore: { color: '#00CFDE', fontSize: 15 , alignSelf: 'center', fontWeight: '500',margin:5},

});

export default BlockCard;
