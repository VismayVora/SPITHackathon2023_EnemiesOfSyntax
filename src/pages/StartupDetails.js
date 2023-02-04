/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const StartupDetails = ({route, props}) => {
  const [data, setData] = useState(route.params.slug);
  const navigation = useNavigation();
  useEffect(() => {
    console.log(route.params.slug);
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <ScrollView>
        <LinearGradient
          colors={['blue', '#ADD8E6']}
          style={{
            width: '100%',
            height: 200,
            position: 'relative',
          }}></LinearGradient>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            marginRight: 'auto',
            marginLeft: 'auto',
            alignItems: 'center',
            elevation: 3,
            borderRadius: 10,
            width: '70%',
            alignSelf: 'center',
            marginTop: -50,
          }}>
          <Image
            source={{
              uri: data?.profile_pic
                ? `http://127.0.0.1:8000/${data.profile_pic}`
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png',
            }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              color: 'black',
              marginTop: 20,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {data?.name}
          </Text>
          <Text
            style={{
              color: 'black',
              marginTop: 20,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Name : {data?.legalNameOfBusiness}
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: 'white',
              borderColor: 'blue',
              borderWidth: 1,
              borderRadius: 20,
            }}
            onPress={() => {
              navigation.navigate('ChatScreen');
            }}>
            <Text
              style={{
                color: 'blue',
              }}>
              Connect
            </Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chart: {
    width: 200,
    height: 200,
  },
  mainView: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 20,
    marginHorizontal: 3,
    borderRadius: 5,
    shadowColor: '#dcdcdc',
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  infoView: {
    borderTopWidth: 5,
    width: Dimensions.get('window').width / 1.1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  githubView: {
    width: Dimensions.get('window').width / 1.1,
    minHeight: Dimensions.get('window').height / 2.5,
  },
  activeMshipsView: {
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 2.2,
  },
  contView: {
    display: 'flex',
    width: Dimensions.get('window').width / 1.1,
  },
  tweetsView: {
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 1.45,
    padding: 0,
  },
  qrCodeView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 2.5,
  },
  viewHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  TextColor: {
    color: '#212529',
  },
  buttonView: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  avatarView: {
    marginVertical: 20,
    borderWidth: 2,
    borderRadius: 100,
  },
  nameView: {
    marginBottom: 15,
  },
  nameText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 23,
  },
  mmView: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
  },
  mmText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 23,
  },
  interestView: {
    marginVertical: 7,
    alignSelf: 'flex-start',
  },
  goalsView: {
    alignSelf: 'flex-start',
    marginVertical: 7,
    marginBottom: 13,
  },
  oneIconView: {
    marginHorizontal: 20,
  },
  hireMe: {
    width: 110,
    borderRadius: 3,
    padding: 5,
    marginBottom: 15,
  },
  hireMeText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 23,
  },
});

export {StartupDetails};
