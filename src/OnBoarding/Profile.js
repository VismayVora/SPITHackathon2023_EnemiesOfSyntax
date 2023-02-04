import React,{useState} from 'react';
import { SafeAreaView, View, StyleSheet, Text, StatusBar,TouchableHighlight,Button,ToastAndroid } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar} from "react-native-paper";
import {launchImageLibrary} from 'react-native-image-picker';

  const Photo=()=>{
    const [Pic, SetPic] = useState('');
    //For Showing Toast Messages
    const setToastMessage = message => {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      };
    
      const uploadImage = () => {
        let options = {
          mediaType: 'photo',
          quality: 1,
          includeBase64: true,
        };
    
        launchImageLibrary(options, response => {
          if (response.didCancel) {
            setToastMessage('Cancelled image selection');
  
          } else if (response.errorCode == 'permission') {
            setToastMessage('Permission not satisfied');
          } else if (response.errorCode == 'others') {
            setToastMessage(response.errorMessage);
          // } else if (response.assets[0].fileSize > 2097152) {
          //   Alert.alert(
          //     'Maximum image size exceeded',
          //     'Please choose a file under 2 MB',
          //     [{text: 'OK'}],
          //   );
          } else {
            SetPic(response.assets[0].base64);
          }
        });  
      };
  
    const removeImage = () => {
     SetPic('');
      setToastMessage('Image removed');
    };
  
    return (
      <View style={{paddingVertical:3}}>
        <View style={{
          alignItems:"center"
        }}>
          <TouchableHighlight
            onPress={() => uploadImage()}
            underlayColor="rgba(0,0,0,0)">
            <Avatar.Image
              size={200}
              source={{
                uri: 'data:image/png;base64,' + Pic
              }}
            />
          </TouchableHighlight>
        </View>
        <View
          style={{flexDirection: 'row',paddingVertical:12,alignSelf:'center'}}>
          <Button mode="contained" onPress={() => uploadImage()}
          title="Upload Image">
          </Button>
          <Button
            mode="contained"
            onPress={() => removeImage()}
            style={{marginLeft: 20}}
            title="Remove Image">
          </Button>
        </View>
      </View>
    );
  };

export default function Profile(){

  return (
    <SafeAreaView style={styles.container}>
      <Photo/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: hp('2%'),
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 8,
      height:90,
    },
    title: {
      fontSize: 18,
    },
  });
  