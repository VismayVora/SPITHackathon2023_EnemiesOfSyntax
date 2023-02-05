

import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, PermissionsAndroid } from 'react-native';
import Tts from 'react-native-tts';
import RNShake from 'react-native-shake';
import Mailer from 'react-native-mail';
import RNFS from 'react-native-fs';
import Voice from '@react-native-voice/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FilePickerManager from 'react-native-file-picker';
// import RNGetRealPath from 'react-native-get-real-path';


console.disableYellowBox = true;
const jobs = [
  {
    id: 1,
    title: 'Infertility Man',
    company: 'Ability Beyond Disability',
    description: 'Provide excellent customer service to clients with disabilities',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShelLHtdF0IM7_5niOYGPGwkxLNbjyfFyvIQ&usqp=CAU',
  },
  {
    id: 2,
    title: 'Genocide Adama',
    company: 'Access Living',
    description: 'Develop and implement community outreach programs for people with disabilities',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfR5w8cb31BqEpE-M0NmlGX325q6VpAy8xUw&usqp=CAU',
  },
  {
    id: 3,
    title: 'Countering Hate Speech',
    company: 'Disabled Sports USA',
    description: 'Develop and implement human resources policies and procedures for a non-profit organization',
    logo: 'https://i0.wp.com/www.gktoday.in/wp-content/uploads/2022/06/international-day-for-countering-hate-speech.png?fit=1200%2C675&ssl=1&w=640',
  },
  {
    id: 4,
    title: 'Potentially Sensitive',
    company: 'Disabled and Proud',
    description: 'Design and maintain a website for a non-profit organization promoting disability rights',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzCggEfh1a4GgesmJz3J_PVFflmHk5XjtvSw&usqp=CAU',
  },
  {
    id: 5,
    title: 'Tap to see',
    company: 'United Cerebral Palsy',
    description: 'Develop and implement marketing strategies for a non-profit organization',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0sCAq8LbvDww2vjOTULzPQgP0U-ZG1AwC1w&usqp=CAU',
  },
  {
    id: 6,
    title: 'Financial Analyst',
    company: 'National Multiple Sclerosis Society',
    description: 'Analyze financial data and provide recommendations to support a non-profit organization',
    logo: 'https://ngofeed.com/wp-content/uploads/2019/11/Nanhi-kali-logo.jpg.webp',
  },
];

const JobListing = ({ title, company, description, logo }) => (
  <View style={styles.jobContainer}>
    <View style={styles.logoContainer}>
      <Image source={{ uri: logo }} style={styles.logo} />
    </View>
    <View style={styles.detailsContainer}>
      <Text style={styles.jobTitle}>{title}</Text>
      <Text style={styles.jobCompany}>{company}</Text>
      <Text style={styles.jobDescription}>{description}</Text>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Vote Now</Text>
      </TouchableOpacity>
    </View>
  </View>
);


const sendEmail = () => {
  // const options = {
  //   subject: 'Subject of the Email',
  //   body: 'Message body of the email',
  //   recipients: ['talkshrey@gmail.com'],
  //   attachments: [
  //     RNFS.DocumentDirectoryPath +  '/src/assets/resume.pdf',
  //   ],
  // };

  Mailer.mail({
    subject: 'Subject of the email',
    recipients: ['zaveridishant@gmail.com'],
    body: 'https://drive.google.com/file/d/1jc5jMaNI5HmPYKPH1iAFE93XPGdLHkHu/view?usp=sharing',
    isHTML: true,
    attachment: {
      path: '/storage/emulated/0/Android/Resume - Yash Shah-2.pdf',
      type: 'pdf',
      name: 'Yash Shah-2.pdf',
    }
  }, (error, event) => {
    Alert.alert(
      error,
      event,
      [
        { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
        { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
      ],
      { cancelable: true }
    )
  });
};

const Vote = ({ navigation }) => {



  // const externalStorageDirectory = RNFS.ExternalDirectoryPath;
  // console.log(`External storage directory: ${externalStorageDirectory}`);

  const [isloading, setIsloading] = useState(false);
  const [results, setResults] = useState([]);
  const [filePath, setFilePath] = useState('');
  const startRecognition = async () => {
    setIsloading(true);
    setResults([]);
    try {
      await Voice.start('en-US');
      console.log("started");
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognition = async () => {
    try {
      await Voice.stop();
      setIsloading(false);
    } catch (e) {
      console.error(e);
    }
  };

  Voice.onSpeechResults = (e) => {
    setResults(e.value);
    if (e.value[0] == "I want to apply for web designer") {
      Voice.destroy().then(Voice.removeAllListeners);
      sendEmail();

    }
    // setIsloading(false);
    // if (e.value[0].includes('resume')) {
    //   console.log("tp");
    //   setIsloading(false);
    //   // Voice.destroy().then(Voice.removeAllListeners);
    //   navigation.navigate('Resume1');
    // }
    // else if(e.value[0]=="go to video call page"){
    //   setIsloading(false);
    //   Voice.destroy().then(Voice.removeAllListeners);
    //   navigation.navigate('VideoCall');
    // }else if(e.value[0]=="open drawer"){
    //   navigation.openDrawer();
    // }
    console.log(e.value[0] + "aaaa");

  };



  const Footer = () => (
    <TouchableOpacity
      onPress={isloading ? stopRecognition : startRecognition}>
      <View style={styles.footer}>
        {isloading ? <ActivityIndicator size="large" color="red"></ActivityIndicator> :
          <Ionicons
            name='mic'
            size={50}
            color="#1D1042">
          </Ionicons>}
      </View>
    </TouchableOpacity>
  )



  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      // Your code here...
      console.log('Shake!');
    })
    Tts.getInitStatus().then(() => {
      Tts.speak('Vote if you find the content sensitive!!');
    });

    // return () => {
    //   // Your code here...
    //   // Tts.removeEventListener('tts-finish', (event) => {
    //   //   console.log('finished', event);
    //   // });
    // }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableOpacity onPress={() => navigation.navigate('VoteNow')}>
        <Text style={{ color: "#0ea5e9", fontSize: 25, marginLeft: 20, marginBottom: 20, marginTop: 10, alignContent: 'center', alignSelf: 'center' }}>Voting!</Text>
      </TouchableOpacity>
      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          <JobListing
            title={item.title}
            company={item.company}
            description={item.description}
            logo={item.logo}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />


      <Footer />
    </View>
  );


};

const styles = StyleSheet.create({
  jobContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    height: 150
  },
  logoContainer: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "black"
  },
  jobCompany: {
    fontSize: 16,
    color: 'gray',
  },
  jobDescription: {
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#0ea5e9',
    padding: 10,
    borderRadius: 5,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    width: wp('100%'),
    height: hp('7%'),
    backgroundColor: '#0ea5e9',
    marginTop: hp('0.01%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export { Vote };
