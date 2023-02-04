import React, {useRef, useState, useEffect} from 'react';
import {height, width} from '../Consts';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  TouchableHighlight,
} from 'react-native';
import {Button} from 'react-native-paper';
import logo from '../assets/logo.jpg';
import Uploadpic from '../assets/uploadpic.png';
import Selectpic from '../assets/selectpic.png';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import Circle1 from '../assets/circle1.png';
import * as CONSTANTS from '../CONSTANTS';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {useDispatch, useSelector} from 'react-redux';
import {setSignUpRole, setSignUpToken} from '../redux/reducers/user';

const Onboarding1 = ({route}) => {
  const [filePath, setFilePath] = useState({});
  const [Pic, SetPic] = useState('');
  const {colors} = useTheme();
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const saveData = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'csrftoken=o4q1Ihf3JTBVbPIRuFvCtHZVT3RHp0X8; sessionid=0rx0ut9910ocx5ggaz1l6en6khbzxg1n',
    );

    var formdata = new FormData();
    formdata.append('email', route.params.email);
    formdata.append('password', route.params.password);
    formdata.append('name', route.params.name);
    formdata.append('profile_pic', {
      uri: Pic.uri,
      name: Pic.fileName,
      type: Pic.type,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      route.params.role === 'mentor'
        ? 'http://127.0.0.1:8000/account/mentor_register/'
        : 'http://127.0.0.1:8000/account/entrepreneur_register/',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        console.log(result);
        console.log(JSON.parse(result).token);
        dispatch(setSignUpToken(JSON.parse(result).token));
        dispatch(setSignUpRole(route.params.role));
        const uuid =
          route.params.name.split(' ')[0] + route.params.email.split('@')[0];
        console.log(uuid);
        var cometUser = new CometChat.User(uuid);
        cometUser.setName(route.params.name);
        CometChat.createUser(cometUser, CONSTANTS.AUTH_KEY)
          .then(user => {
            console.log('user created', user);
            CometChat.login(uuid, CONSTANTS.AUTH_KEY).then(
              user => {
                console.log('Signup Successful:', {user});
              },
              error => {
                console.log('Login failed with exception:', {error});
              },
            );
          })
          .catch(error => console.log('error', error));
        navigation.navigate('Onboarding2', {
          token: JSON.parse(result).token,
        });
      })
      .catch(error => console.log('error', error));
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        SetPic(response.assets[0]);
      });
    }
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
        SetPic(response.assets[0]);
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={[colors.primary, '#ADD8E6']}
        style={{
          width: '100%',
          height: 200,
          position: 'relative',
        }}></LinearGradient>

      <View style={styles.card}>
        <Image source={Circle1} />
        <Text style={styles.text}>Please upload your picture..</Text>
        <View>
          {Pic ? (
            <View>
              <Image
                source={{
                  uri: Pic.uri,
                }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  alignSelf: 'center',
                }}
              />
            </View>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            {/* <TouchableOpacity
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: colors.primary,
                borderRadius: 10,
                marginRight: 10,
              }}
              onPress={() => uploadImage('photo')}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                }}>
                Upload Image
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: '#00CFDE',
       
              }}
              onPress={() => captureImage('photo')}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                fontWeight: 'bold'
                }}>
                Take a picture
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.button}>
          <Button
            labelStyle={styles.text3}
            onPress={() => {
              saveData();
            }}>
            Next
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text3: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  img: {
    height: 150,
    width: 150,
    margin: 20,
  },
  logoImg: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.055,
    marginBottom: height * 0.035,
  },
  uploadImg: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
    width: width * 0.8,
    height: height * 0.2,
  },
  card: {
    elevation: 10,
    backgroundColor: '#fff',
    shadowOffset: {width: 5, height: 5},
    shadowColor: '#333',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.75,
    position: 'absolute',
    width: width * 0.9,
  },
  image: {
    margin: height * 0.03,
  },
  button: {
    width: width * 0.25,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 25,
    backgroundColor: '#00CFDE',
    color: '#fff',
  },

  text: {
    fontSize: 20,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#00CFDE',
    fontWeight: '500',
    marginBottom: height * 0.035,
    margin: 10,
  },
});
