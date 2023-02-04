import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import PasswordInput from '../components/PassInput';
import Textinp from '../components/Textinp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import signInLogo from './disabled.webp';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Button,
} from 'react-native-paper';
import { height, width} from '../Consts';
import LottieView from 'lottie-react-native';

function SignUpMentor({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Entrepreneur', value: 'entrepreneur' },
    { label: 'Mentor', value: 'mentor' },
    { label: 'Socially Disabled', value: 'disabled' },
  ]);
  return (
    <KeyboardAvoidingView style={styles.container}>
          <LottieView
        source={require('../assets/animation.json')}
        autoPlay={true}
        loop={false}

        style={styles.animation}
      />
      <Textinp
        marginTop={20}
        iconShape="person"
        placeholder="Name"
        value={name}
        onChangeText={text => {
          setName(text);
        }}
        placeholderTextColor="grey"
      />

      <Textinp
        marginTop={20}
        iconShape="mail"
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChangeText={text => {
          setEmail(text);
        }}
        placeholderTextColor="grey"
      />
      <PasswordInput
        placeholder="Password"
        autoComplete="password"
        value={password}
        onChangeText={text => {
          setPassword(text);
        }}
        placeholderTextColor="grey"
      />
      {/* <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select a Role"
        textStyle={{
          fontSize: 16,
        }}
        containerStyle={{
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      /> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          //saveData();
          navigation.navigate('Onboarding', {
            screen: 'Onboarding1',
            params: {
              email: email,
              password: password,
              name: name,
              role: value,
            },
          });
          // console.log("Signed Up");
        }}>
           <Text style={styles.textStyle}>Sign Up</Text>
      </TouchableOpacity>
        {/* <View >

          <Button style={styles.button2} labelStyle={styles.label2} onPress={() =>
            navigation.navigate('LocationTracer')
          }>Location
          </Button>
        </View> */}
       
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textStyle: {
    color: 'white',
    // marginTop: 25,
    alignSelf: 'center',
    fontSize: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: wp('10%'),
  },
  animation: {
    width: 200,
    height: 200,
    margin: 25,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#2eb6b8',
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    width: wp('35%'),
  },
  button1: {
    width: width * 0.25,
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 10,
    alignContent: 'center',
    borderColor: '#EBE9E9',
    borderWidth: 1,
    borderRadius: 10,


  },
  button2: {
    width: width * 0.3,
    alignSelf: 'center',
    backgroundColor: '#2eb6b8',
    flexDirection: 'row',
    margin: 20,
    alignContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  label1: {
    color: '#00CFDE',
    fontWeight: '100',
    fontSize: 12,


  },
  label2: {

    color: 'white',
    fontWeight: '100',
    fontSize: 12,
  },
});

export default SignUpMentor;
