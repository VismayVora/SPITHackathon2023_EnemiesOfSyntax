import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Button,
  ScrollView,
} from 'react-native';
import {Text} from 'react-native-paper';
import {height, width} from '../Consts';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import YoutubeVideos from '../components/YoutubeVideos';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Careertv = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, '#0ea5e9']}
        style={{width: '100%', height: 200}}>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 30,
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Career TV
        </Text>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 10,
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
          }}>
          Online training/counseling sessions
        </Text>
      </LinearGradient>
      <ScrollView
        style={{
          marginTop: -100,
          backgroundColor: 'white',
          borderRadius: 20,
        }}>
        <View style={styles.view1}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://www.pharmatutor.org/sites/default/files/styles/amp_1200x675_16_9/public/2021-10/work-as-market-research-associate-trainee-at-gervanora-data-services.jpg?itok=0uxe4sfk',
            }}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.text1}>Entreprenaurship Courses </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text2}>11 Courses</Text>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name={'eye-outline'} size={20} />
                <Text>626</Text>
              </View>
            </View>
          </View>
        </View>
        <YoutubeVideos />
        {/* <LinearGradient
                colors={[colors.primary, '#ADD8E6']}
                style={{ width: '100%', height: 200, position: 'relative' }}></LinearGradient> */}
        <View style={styles.view2}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://www.pharmatutor.org/sites/default/files/styles/amp_1200x675_16_9/public/2021-10/work-as-market-research-associate-trainee-at-gervanora-data-services.jpg?itok=0uxe4sfk',
            }}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.text1}>Recommendations for you</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text2}>112 Courses</Text>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name={'eye-outline'} size={20} />
                <Text>7726</Text>
              </View>
            </View>
          </View>
        </View>
        <YoutubeVideos />
        <View style={styles.view2}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://www.pharmatutor.org/sites/default/files/styles/amp_1200x675_16_9/public/2021-10/work-as-market-research-associate-trainee-at-gervanora-data-services.jpg?itok=0uxe4sfk',
            }}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.text1}>Some courses for you</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text2}>11 Courses</Text>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name={'eye-outline'} size={20} />
                <Text>626</Text>
              </View>
            </View>
          </View>
        </View>
        <YoutubeVideos />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Careertv;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  image: {
    height: height * 0.075,
    width: width * 0.3,
  },
  view1: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 20,
    justifyContent: 'space-between',
    // position: 'absolute',
  },
  view2: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  text1: {},
  text2: {},
});
