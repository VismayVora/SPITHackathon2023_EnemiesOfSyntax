import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Text, Subheading, Button} from 'react-native-paper';
import Circle4 from '../assets/circle4.png';
import Linkedin from '../assets/linkedin.png';
import Portfolio from '../assets/portfolio.png';
import {height, width} from '../Consts';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import panLogo from '../assets/pan.png';

const Onboarding4 = ({}) => {
  const {colors} = useTheme();
  const [name, setName] = useState('');
  const [fresher, setFresher] = useState('');
  const [experience, setExperience] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, '#ADD8E6']}
        style={{
          width: '100%',
          height: 200,
          position: 'relative',
        }}></LinearGradient>

      <View style={styles.card}>
        <Image source={Circle4} />
        <View
          style={{
            marginTop: 10,
          }}>
          <Text style={styles.text}>Eligibility Criteria for a Startup.</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            padding: 20,
          }}>
          <Image
            source={panLogo}
            style={{
              width: 80,
              height: 80,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 20,
            }}>
            Companies Registered Pan number
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 20,
              color: 'gray',
            }}>
            A small business? Don't have GST or CIN number, verify your startup
            with your company's Pan Number
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            labelStyle={styles.text3}
            onPress={() => navigation.navigate('Onboarding5')}>
            Next
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoImg: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.035,
    marginBottom: height * 0.025,
  },
  icons: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.015,
    marginBottom: height * 0.01,
  },
  form: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 15,
  },
  card: {
    elevation: 10,
    backgroundColor: '#fff',
    shadowOffset: {width: 5, height: 5},
    shadowColor: '#333',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.75,
    position: 'absolute',
    width: width * 0.9,
  },
  image: {
    margin: height * 0.1,
  },
  nameInput: {
    height: 45,
    borderWidth: 2,
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 10,
  },
  text3: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  nameInput2: {
    height: 45,
    borderWidth: 2,
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 10,
    marginRight: 10,
    flex: 2,
  },
  button: {
    width: width * 0.25,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 25,
    backgroundColor: '#00CFDE',
    color: '#fff',
  },

  text: {
    fontSize: 20,
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    color: '#00CFDE',
    fontWeight: '500',
    marginBottom: height * 0.035,
  },
});
