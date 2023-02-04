import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AllPosts from './Allposts';
import ChatMain from '../../pages/Chat/ChatMain';
const Stack = createStackNavigator();
const AllPostMain = () => {
  return (
    <Stack.Navigator initialRouteName="AllPost">
      <Stack.Screen
        name="AllPost"
        component={AllPosts}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ChatMain"
        component={ChatMain}
      />
    </Stack.Navigator>
  );
};

export default AllPostMain;

const styles = StyleSheet.create({});
