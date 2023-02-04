import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback, Text, Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from "react-native-youtube-iframe";
const { width, height } = Dimensions.get('window');

const BlockCard2 = ({ style, imageStyle, item, onPress }) => {
  const { thumbnail, title, desc } = item;

  const [fileResponse, setFileResponse] = useState([]);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
          <YoutubePlayer

            videoId={item.videoId}
            onChangeState={onStateChange}
            width={130}
             height={110}
          />
        <View>
          <Text style={{ color: '#000000', fontSize: 13}}>{item.description}</Text>
          <TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,borderTopColor: '#000000',borderTopWidth: 1,marginVertical:5}}>
              <Ionicons
                name={'eye-outline'}
                size={20}
              />
              <Ionicons
                name={'ios-thumbs-up-outline'}
                size={20}
              />
              <Ionicons
                name={'ios-share-social-outline'}
                size={20}
              />



            </View>
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
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  youtube: {

    // justifyContent: 'center',
    // alignSelf: 'center',
  },

});

export default BlockCard2;
