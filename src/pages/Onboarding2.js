import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {withTheme, Text, RadioButton, Button} from 'react-native-paper';
import logo from '../assets/logo.jpg';
import Circle2 from '../assets/circle2.png';
import {height, width} from '../Consts';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import gstLogo from '../assets/gst.png';
export default function Onboarding2({}) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [institute, setInstitute] = useState('');
  const [degree, setDegree] = useState('');
  const [studyField, setStudyField] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [grades, setGrades] = useState('');
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
        <Image
          style={{
            marginTop: 20,
          }}
          source={Circle2}
        />
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
            source={gstLogo}
            style={{
              width: 70,
              height: 70,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 20,
            }}>
            Gst Number of Company
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 20,
              color: 'gray',
            }}>
            Enter your GST number and we will fetch your company details
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            labelStyle={styles.text3}
            onPress={() => navigation.navigate('Onboarding3')}>
            Next
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text1: {
    fontSize: 10,

    color: '#1D3557',
  },
  text3: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  logoImg: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.035,
    marginBottom: height * 0.025,
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
    margin: height * 0.02,
  },
  button: {
    width: width * 0.25,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 25,
    backgroundColor: '#00CFDE',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button2: {
    justifyContent: 'space-between',
    color: '#000000',
    backgroundColor: '#E8EEF7',
    flexDirection: 'row',
    margin: 15,
  },
  button3: {
    color: '#000000',
    backgroundColor: '#E8EEF7',
    width: width * 0.3,
  },
  textInput: {
    fontSize: 16,
  },
  text: {
    fontSize: 20,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#00CFDE',
    fontWeight: '500',
    marginBottom: height * 0.035,
  },
  text2: {
    fontSize: 18,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#000000',
    fontWeight: '500',
    margin: height * 0.035,
  },
});
