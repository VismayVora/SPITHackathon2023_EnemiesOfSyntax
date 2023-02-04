import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {resetUser} from '../redux/reducers/user';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(user);
    var myHeaders = new Headers();
    // myHeaders.append('Authorization', `Token ${user.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `http://127.0.0.1:8000/account/${
        user?.is_mentor ? 'mentor' : 'entrepreneur'
      }/`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        console.log(result);
        console.log(JSON.parse(result)[0].startup);

        console.log('hello');
        setData(JSON.parse(result)[0]);
      })
      .catch(error => console.log('error', error));
  }, []);
  const logout = async () => {
    await AsyncStorage.removeItem('@save_token');
    dispatch(resetUser());
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#2eb6b8'}}>
        <ImageBackground
          source={require('./Dishant.jpeg')}
          style={{padding: 20}}>
          <Image
            source={{
              uri: data?.profile_pic,
            }}
            style={{height: 170, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {user?.name}
          </Text>
          {/* <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              You have 120 Coins
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View> */}
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
        <View
          style={{backgroundColor: 'white', padding: 20, alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor:'#2eb6b8',
              borderRadius: 20,
            }}
            onPress={() => {
              logout();
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
