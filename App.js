import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Router from './src/Router';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {CometChat} from '@cometchat-pro/react-native-chat';
const app_id = '231614ce9c90ad83';
const region = 'us';
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();

const App = () => {
  console. disableYellowBox = true;
  useEffect(() => {
    CometChat.init(app_id, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
        // You can now call login function.
      },
      error => {
        console.log('Initialization failed with error:', error);
        // Check the reason for error and take appropriate action.
      },
    );
  }, []);
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;

