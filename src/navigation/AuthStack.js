import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../OnBoarding/Login';
import Login1 from '../OnBoarding/Login1';
import SignUp1 from '../OnBoarding/SignUp1';
import { Jobs, JobSeekers } from '../pages';
import SwiperScreens from '../OnBoarding/SwiperScreens';
import SignUpMentor from '../OnBoarding/SignUpMentor';
import Onboarding1 from '../pages/Onboarding1';
import Onboarding2 from '../pages/Onboarding2';
import Onboarding3 from '../pages/Onboarding3';
import Onboarding4 from '../pages/Onboarding4';
import Onboarding5 from '../pages/Onboarding5';
import Profile1 from '../components/Profile/Profile1';
import Profile2 from '../components/Profile/Profile2';
import AddStartups from '../components/Profile/AddStartups';
import LocationTracer from '../pages/LocationTracer';
import Splash from '../pages/Splash';
// import AllTabs from './AppStack'
// import Splash from '../pages/Splash';
// import { Feed } from '../twitter/feed';
// import { Details } from '../twitter/Chats';
// import { AllNotifications } from '../twitter/all';
// import { BottomTabs } from '../twitter/bottomTabs';
// import DirectMessageScreen from '../twitter/containers/main/home/DirectMessage/DirectMessageScreen';
// import StoryScreen from '../twitter/containers/main/home/story/StoryScreen';
// import TabNavigator from '../twitter/containers/main/TabNavigator';
// import colors from '../twitter/res/colors';
// import {Image, TouchableOpacity,View,Text } from 'react-native';
// import images from '../twitter/res/images';

const Stack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();

const Onboarding = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen
        name="Onboarding1"
        component={Onboarding1}
        screenOptions={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="Onboarding2"
        component={Onboarding2}
        screenOptions={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="Onboarding3"
        component={Onboarding3}
        screenOptions={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="Onboarding4"
        component={Onboarding4}
        screenOptions={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="Onboarding5"
        component={Onboarding5}
        screenOptions={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="Profile1"
        component={Profile1}
        screenOptions={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="Profile2"
        component={Profile2}
        screenOptions={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="AddStartUp"
        component={AddStartups}
        screenOptions={{ headerShown: false }}
      />
    </OnboardingStack.Navigator>
  );
};

const AuthStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} independent={true}>
      {/* <Stack.Screen
        name="Bottom"
        component={BottomTabs}
        options={{ headerShown: false }}></Stack.Screen> */}
      {/* <Stack.Screen
        name="MainScreen"
        component={TabNavigator}
        options={{title: '', headerShown: false}}
      />
      
      <Stack.Screen
        name="DirectMessageScreen"
        component={DirectMessageScreen}
        options={({navigation}) => ({
          //headerTransparent: true,
          headerTitle: () => (
            <View>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                johndoe
              </Text>
            </View>
          ),
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.bottomBackGround,
            shadowColor: colors.seperatorLineColor,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
              <Image
                source={images.dmBackButton}
                style={{width: 20, height: 20, marginStart: 10}}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => console.log('Pressed Write in DM')}
                style={{flexDirection: 'row'}}>
                <Image
                  source={images.write}
                  style={{width: 25, height: 25, marginEnd: 20}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('Pressed Video Camera in DM')}
                style={{flexDirection: 'row'}}>
                <Image
                  source={images.videoCamera}
                  style={{width: 30, height: 30, marginEnd: 10}}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="StoryScreen"
        component={StoryScreen}
        navigation={navigation}
        options={{
          headerStyle: {backgroundColor: 'black', shadowColor: 'black'},
          title: '',
          headerLeft: () => <View></View>,
        }}
      /> */}

      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}></Stack.Screen>



      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="SignUp"
        component={SignUpMentor}
        options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="Login1"
        component={Login1}
        options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="SignUp1"
        component={SignUp1}
        options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="LocationTracer"
        component={LocationTracer}
        options={{ headerShown: false }}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
