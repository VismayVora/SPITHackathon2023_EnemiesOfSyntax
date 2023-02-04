import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback, Text
} from 'react-native';
import Title from '../components/Title';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { height, width } from '../Consts';
import sampleresume from '../assets/sampleresume.png';
import Feather from 'react-native-vector-icons/Feather';

const BlockCard3 = ({ style, imageStyle, item, onPress }) => {
  const { thumbnail, title, desc } = item;
  return (
    <TouchableWithoutFeedback onPress={onPress}>

      <View style={[styles.container, style]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,marginVertical:5}}>
          <TouchableOpacity>
            <Text style={{ fontSize: 17, color: '#00CFDE' ,marginHorizontal:40 }}>
              View
            </Text>
          </TouchableOpacity>
         
          <TouchableOpacity>

          <Feather name="edit" size={22} color={'#00CFDE'} style={{marginHorizontal:40}}/>
          </TouchableOpacity>
        </View>
        <Image source={sampleresume} style={[styles.image, imageStyle]} />
        <View style={styles.content}>
          <Title>UI/UX Resume</Title>
          <Text style={{fontSize:11 , margin:5}}>Created on 22nd Dec. 2021</Text>
          <Text style={{fontSize:12}}>Last updated 2 days ago</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: width / 7,
    height: height * 0.1,
    margin: 7
  },
 content:{
justifyContent:'center',  
alignItems:'center',
alignContent:'center',


 }

});

export default BlockCard3;
