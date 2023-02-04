import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from './Chat';
import IndividualChat from './IndividualChat';
const Stack = createStackNavigator();
const ChatMain = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen
        name="Individual"
        component={IndividualChat}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatMain;

const styles = StyleSheet.create({});
