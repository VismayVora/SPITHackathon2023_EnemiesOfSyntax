import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import { height, width } from '../Consts';
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import resume1 from '../assets/resume1.png';
import resume2 from '../assets/resume2.png';
import resume3 from '../assets/resume3.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Voice from '@react-native-voice/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Tts from 'react-native-tts';

const ResumeBuilder = ({ }) => {

    useEffect(() => {

        Tts.getInitStatus().then(() => {
            Tts.speak('Welcome to Resume Builder. You can create your resume by saying create my resume.');
        });

        return () => {
            setIsloading(false);
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, []);

    const [isloading, setIsloading] = useState(false);
    const [results, setResults] = useState([]);
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
        if (e.value[0] == "create my resume") {
            setIsloading(false);
            Voice.destroy().then(Voice.removeAllListeners);
            navigation.navigate('Resume2');
        }

        console.log(e.value[0]);

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


    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>

            <View style={{ marginVertical: 20, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>

                <Text style={styles.title}>With our Resume Builder, you can quickly and easily create a CV within 15 minutes!</Text>

                <Text style={styles.title1}>Your profile is 50% complete</Text>



                <Progress.Bar progress={0.5} width={width * 0.65} height={height * 0.015} color='#00CFDE' />
                <Text style={styles.title2}>Complete your profile for better results</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Resume2")}>
                <Text style={styles.title3}>   Choose a template for your resume</Text>
                </TouchableOpacity>
                

                <Image source={resume1} style={styles.image} ></Image>
                <Image source={resume2} style={styles.image} ></Image>
                <Image source={resume3} style={styles.image} ></Image>
            </View>
            {/* <View>
                <TouchableOpacity onPress={() =>
                    navigation.navigate('Resume2')}>
                    <Button style={{ backgroundColor: '#00CFDE', borderColor: '#00CFDE', marginBottom: 15, borderRadius: 5, width: width * 0.5 }} labelStyle={{ color: 'white', fontSize: 13 }} >Create my Resume</Button>
                </TouchableOpacity>
            </View> */}
            <Footer />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        color: '#000000',
    },
    title1: {
        fontSize: 18,
        textAlign: 'center',
        color: '#000000',
        margin: 20,
    },
    title2: {
        fontSize: 15,
        textAlign: 'center',
        color: '#000000',
        margin: 10,
    },
    title3: {
        fontSize: 18.5,
        textAlign: 'center',
        color: '#000000',
        margin: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    image: {
        width: width * 0.4,
        height: height * 0.15,
        marginVertical: 10,
    },
    footer: {
        width: wp('100%'),
        height: hp('7%'),
        backgroundColor: '#0ea5e9',
        marginTop: hp('2%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
});


export default ResumeBuilder;
