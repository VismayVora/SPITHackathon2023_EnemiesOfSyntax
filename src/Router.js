import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppStack from './navigation/AppStack';
import AuthStack from './navigation/AuthStack';

import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import * as CONSTANTS from './CONSTANTS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from './redux/reducers/user';
import {CometChat} from '@cometchat-pro/react-native-chat';

console.disableYellowBox = true;

const Router = () => {
  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'Poppins-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Poppins-Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Poppins-Light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Poppins-Thin',
        fontWeight: 'normal',
      },
    },
  };

  const Mytheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2eb6b8',
      secondary: '#814ED2',
      accent: '#F5B400',
      disabled: '#FF7CC3',
      error: '#F14F0A',
      backgroundLight: '#F4F4F4',
      text: '#3C3C3C',
      textBefore: '#F4F4F4',
      textAfter: '#7D7D7D',
      border: '#00FFA3',
    },
    fonts: configureFonts(fontConfig),
  };
  const [userToken, setUserToken] = useState(null);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    console.disableYellowBox = true;
    getUserFromAsync();
  }, []);
  useEffect(() => {
    console.log('Router = ', user);
    if (user?.token) {
      console.log('Hello');
      setUserToken(user);
      const uuid = user.name.split(' ')[0] + user.email.split('@')[0];
      CometChat.login(uuid, CONSTANTS.AUTH_KEY).then(
        user => {
          console.log('Login Successful:', {user});
        },
        error => {
          console.log('Login failed with exception:', {error});
        },
      );
    } else {
      setUserToken(null);
    }
  }, [user]);

  const getUserFromAsync = async () => {
    const user = await AsyncStorage.getItem('@save_token');
    console.log('Router ', user);
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  };

  return (
    <NavigationContainer theme={Mytheme} independent={true}>
    {userToken ? <AppStack /> : <AuthStack />}
  </NavigationContainer>
  );
};

export default Router;
