

import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator,Platform, PermissionsAndroid } from 'react-native';
import Tts from 'react-native-tts';
import RNShake from 'react-native-shake';
import Mailer from 'react-native-mail';
import RNFS from 'react-native-fs';
import Voice from '@react-native-voice/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FilePickerManager from 'react-native-file-picker';
// import RNGetRealPath from 'react-native-get-real-path';


// console. disableYellowBox = true;
const jobs = [
  {
    id: 1,
    title: 'Customer Service Representative',
    company: 'Ability Beyond Disability',
    description: 'Provide excellent customer service to clients with disabilities',
    logo: 'https://ngofeed.com/wp-content/uploads/2019/11/Smile_Foundation_Logo.jpg.webp',
  },
  {
    id: 2,
    title: 'Community Outreach Coordinator',
    company: 'Access Living',
    description: 'Develop and implement community outreach programs for people with disabilities',
    logo: 'https://ngofeed.com/wp-content/uploads/2021/08/PNG-Format_New-Logo_Dark-Background-300x240.png.webp',
  },
  {
    id: 3,
    title: 'Human Resources Specialist',
    company: 'Disabled Sports USA',
    description: 'Develop and implement human resources policies and procedures for a non-profit organization',
    logo: 'https://ngofeed.com/wp-content/uploads/2019/11/giveindia-300x106.jpg.webp',
  },
  {
    id: 4,
    title: 'Web Designer',
    company: 'Disabled and Proud',
    description: 'Design and maintain a website for a non-profit organization promoting disability rights',
    logo: 'https://ngofeed.com/wp-content/uploads/2019/11/Goonj-logo-300x188.jpg.webp',
  },
  {
    id: 5,
    title: 'Marketing Manager',
    company: 'United Cerebral Palsy',
    description: 'Develop and implement marketing strategies for a non-profit organization',
    logo: 'https://ngofeed.com/wp-content/uploads/2019/11/Care-India-300x300.jpg.webp',
  },
  {
    id: 6,
    title: 'Financial Analyst',
    company: 'National Multiple Sclerosis Society',
    description: 'Analyze financial data and provide recommendations to support a non-profit organization',
    logo: 'https://ngofeed.com/wp-content/uploads/2019/11/Nanhi-kali-logo.jpg.webp',
  },
  {
    id: 7,
    title: 'Program Coordinator',
    company: 'Paralyzed Veterans of America',
    description: 'Coordinate programs and services for veterans with disabilities',
    logo: 'https://ngofeed.com/wp-content/uploads/2019/11/HelpAge-India.jpg.webp',
  },
  {
    id: 8,
    title: 'Grant Writer',
    company: 'Disabled American Veterans',
    description: 'Write grant proposals to secure funding for programs and services for veterans with disabilities',
    logo: 'https://ngofeed.com/wp-content/uploads/2019/11/Pratham-logo-e1575048400556-81x70.jpg.webp',
  }
];


const filePicker = () => {
  FilePickerManager.showFilePicker(null, (response) => {
    // setFilePath(response.uri);
    // console.log(
    //   // response.uri,
    //   // response.type,
    //   // response.fileName,
    //   // response.fileSize,
    //   response.
    // );
  });


  
};



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
      <TouchableOpacity style={styles.applyButton} onPress={
        filePicker
      }>
        <Text style={styles.applyButtonText}>Apply Now</Text>
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
        {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
        {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
      ],
      { cancelable: true }
    )
  });
};

const Mentors = () => {



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
      Tts.speak('Here are some of the jobs of your interest!!');
    });

    // return () => {
    //   // Your code here...
    //   // Tts.removeEventListener('tts-finish', (event) => {
    //   //   console.log('finished', event);
    //   // });
    // }
  }, []);

  return (
    <View style={{ flex: 1 ,backgroundColor:'white'}}>
      <Text style={{ color: "#2eb6b8", fontSize: 25, marginLeft: 20, marginBottom: 20, marginTop: 10 ,alignContent:'center',alignSelf:'center'}}>Recommended jobs!</Text>

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
    height:150
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
    backgroundColor: '#2eb6b8',
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
    backgroundColor: '#2eb6b8',
    marginTop: hp('0.01%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export { Mentors };
