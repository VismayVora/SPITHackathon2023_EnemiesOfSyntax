import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import PasswordInput from '../components/PassInput';
import Textinp from '../components/Textinp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchId from 'react-native-touch-id';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/reducers/user';

function Login1({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tok, setTok] = useState();
  const dispatch = useDispatch();
  const saveData = async () => {
    const STORAGE_KEY1 = '@save_token';
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'csrftoken=o4q1Ihf3JTBVbPIRuFvCtHZVT3RHp0X8; sessionid=0rx0ut9910ocx5ggaz1l6en6khbzxg1n',
    );

    var formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'http://127.0.0.1:8000/account/login/',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setTok(result.token);
        console.log(result);
        AsyncStorage.setItem(STORAGE_KEY1, JSON.stringify(result));
        dispatch(setUser(result));
        const uuid = result.name.split(' ')[0] + result.email.split('@')[0];
        CometChat.login(uuid, CONSTANTS.AUTH_KEY).then(
          user => {
            console.log('Login Successful:', {user});
          },
          error => {
            console.log('Login failed with exception:', {error});
          },
        );
      })
      .catch(error => console.log('error', error));
    // try {
    //   //await AsyncStorage.clear();
    //    AsyncStorage.setItem(STORAGE_KEY1, token);
    //   console.log(STORAGE_KEY1);
    // } catch (e) {
    //   //console.log(token);
    //   Alert.alert('Failed to save the data to the storage');
    // }
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
        marginTop={10}
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
          navigation.navigate('Tabs');
          saveData();
        }}>
        <Text style={styles.textStyle}>Login</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 20, margin: 5}}>OR</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          TouchId.authenticate('Place your fingerprint!', {
            title: 'Authentication',
          })
            .then(() => {
              Alert.alert('Authentication Successful!');
              console.log('Done');
              // navigation.navigate('Tabs')
            })
            .catch(() => {
              Alert.alert('Fingerprint Did not match');
            })
        }>
        <Text style={styles.textStyle}>Use Your Fingerprint</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp1');
          // console.log("Signed Up");
        }}>
        <Text style={{fontSize: 15, margin: 30}}>
          Don't have an account? Signup
        </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 18,
  },
  animation: {
    width: 200,
    height: 200,
    margin: 25,
    marginLeft: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',

    marginVertical: 10,
    marginLeft: wp('10%'),
  },
  button: {
    backgroundColor: '#0065ff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    width: wp('85%'),
  },
});

export default Login1;
