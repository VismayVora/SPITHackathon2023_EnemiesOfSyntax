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
