import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import PasswordInput from '../components/PassInput';
import Textinp from '../components/Textinp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CometChat } from '@cometchat-pro/react-native-chat';
import * as CONSTANTS from '../CONSTANTS';
function SignUp1({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const saveData = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'csrftoken=o4q1Ihf3JTBVbPIRuFvCtHZVT3RHp0X8; sessionid=0rx0ut9910ocx5ggaz1l6en6khbzxg1n',
    );

    var formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('name', name);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'http://127.0.0.1:8000/account/entrepreneur_register/',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        console.log(result);
        const uuid = name.split(' ')[0] + email.split('@')[0];
        console.log(uuid);
        var cometUser = new CometChat.User(uuid);
        cometUser.setName(name);
        CometChat.createUser(cometUser, CONSTANTS.AUTH_KEY)
          .then(user => {
            console.log('user created', user);
            CometChat.login(uuid, CONSTANTS.AUTH_KEY).then(
              user => {
                console.log('Signup Successful:', { user });
              },
              error => {
                console.log('Login failed with exception:', { error });
              },
            );
          })
          .catch(error => console.log('error', error));
      })
      .catch(error => console.log('error', error));
  };
  return (
    <View style={styles.container}>
      {/* <LottieView
        source={require('../assets/owner.json')}
        autoPlay={true}
        loop={false}

        style={styles.animation}
      /> */}
      <Textinp
        marginTop={50}
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
            },
          });
          // console.log("Signed Up");
        }}>
        <Text style={styles.textStyle}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    backgroundColor: '#0ea5e9',
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    width: wp('85%'),
  },
});

export default SignUp1;
