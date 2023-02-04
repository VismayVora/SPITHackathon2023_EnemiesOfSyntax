import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import DocumentPicker, {types} from 'react-native-document-picker';
import Circle5 from '../assets/circle5.png';
import Resume from '../assets/resume.png';
import {height, width} from '../Consts';
import YoutubePlayer from 'react-native-youtube-iframe';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import patentLogo from '../assets/patent.png';
const Onboarding5 = ({}) => {
  const [fileResponse, setFileResponse] = useState([]);
  const [playing, setPlaying] = useState(false);
  const {colors} = useTheme();
  const navigation = useNavigation();

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
        allowMultiSelection: true,
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

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
        <Image source={Circle5} />
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
            source={patentLogo}
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
            Enter your patent number
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 20,
              color: 'gray',
            }}>
            Have a unique idea and want to start or grow your business? Don't
            worry we've got you!
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            labelStyle={styles.text3}
            onPress={() => navigation.navigate('Profile2')}>
            Next
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoImg: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.015,
    marginBottom: height * 0.015,
  },
  text3: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
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
    height: height * 0.85,
    position: 'absolute',
    width: width * 0.9,
  },
  image: {
    margin: height * 0.02,
    width: width * 0.5,
    height: height * 0.2,
  },
  youtube: {
    margin: height * 0.001,
    width: width * 0.5,
    height: height * 0.2,
  },
  button: {
    width: width * 0.25,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 5,
    backgroundColor: '#00CFDE',
    color: '#fff',
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
    margin: 10,
  },
});
