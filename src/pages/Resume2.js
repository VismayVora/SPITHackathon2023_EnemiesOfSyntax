import React, { useState,useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
    Text,
    Card,
    Title,
    Subheading,
    Button,
} from 'react-native-paper';
import { width } from '../Consts'
import Profile from '../assets/blueprofile.png';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.
import Ionicons from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';





const Resume2 = ({ }) => {
    const { colors } = useTheme();
    const [about, setAbout] = useState('');
    const [name, setName] = useState('');
    const [name2, setName2] = useState('');
    const [title, setTitle] = useState('');
    const [countrycode, setCountryCode] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [image, setImage] = useState(Profile);
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const navigation = useNavigation();

    const selectImage = async () => {
        const res = await launchImageLibrary({
            mediaType: 'photo',
        });
        console.log(res.assets[0].uri);
        setImage({
            uri: res.assets[0].uri,
            name: res.assets[0].fileName,
            type: res.assets[0].type,
        });
    };
    // useEffect(() => {

        

    //     return () => {
    //         setIsloading(false);
    //         Voice.destroy().then(Voice.removeAllListeners);
    //     }
    // }, []);
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
        setName(e.value[0]);
        setIsloading(false);
        // Voice.destroy().then(Voice.removeAllListeners);

        // console.log(e.value[0]);

    };


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <ScrollView>
                <KeyboardAvoidingView>
                    <Card style={styles.card}>

                        <Text
                            style={{
                                color: colors.black,
                                textAlign: 'center',
                                margin: 10,
                                fontWeight: '400',
                                fontSize: 20,
                            }}>
                            Personal Details
                        </Text>
                        <TouchableOpacity
                            onPress={selectImage} >
                            <Image
                                source={image}
                                style={styles.profile}
                            />
                        </TouchableOpacity>


                         <TouchableOpacity 
                        onPress={()=>Tts.speak("Enter your name")}>
                            <Subheading>Enter your name*</Subheading>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row" }}>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                underlineColorAndroid="transparent"
                                placeholderTextColor={colors.textAfter}
                                style={{
                                    ...styles.nameInput,
                                    borderColor: colors.lightblack,
                                    color: colors.text,
                                    //backgroundColor: colors.background,
                                }}
                                placeholder={'Full Name'}
                            />
                            <TouchableOpacity
                                onPress={isloading ? stopRecognition : startRecognition}>

                                {isloading ? <ActivityIndicator size="large" color="red"></ActivityIndicator> :
                                    <Ionicons
                                        name='mic'
                                        size={40}
                                        color="#1D1042">
                                    </Ionicons>}

                            </TouchableOpacity>

                        </View>

                        {/* <TextInput
                            value={name1}
                            onChangeText={setName1}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'First Name'}
                        />

                        <TextInput
                            value={name2}
                            onChangeText={setName2}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Last Name'}
                        /> */}
                        <TouchableOpacity 
                        onPress={()=>Tts.speak("Tell me about yourself")}>
                            <Subheading>Tell me about yourself*</Subheading>
                        </TouchableOpacity>
                        

                        <View style={{ flexDirection: "row" }}>
                        <TextInput
                            value={about}
                            onChangeText={setAbout}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            multiline
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'About (Max 300 words)'}
                        />
                        <TouchableOpacity
                               >

                              
                                    <Ionicons
                                        name='mic'
                                        size={40}
                                        color="#1D1042">
                                    </Ionicons>

                            </TouchableOpacity>
                        </View>
                       
                        {/* <Subheading>Choose Your Gender</Subheading>
                        <TextInput
                            value={gender}
                            onChangeText={setGender}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Gender'}
                        /> */}
                        <TouchableOpacity 
                        onPress={()=>Tts.speak("Enter your mobile number")}>
                            <Subheading>Enter your mobile no.*</Subheading>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row" }}>
                        <TextInput
                            value={mobileno}
                            onChangeText={setMobileno}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Phone Number'}
                        />
                        <TouchableOpacity
                               >

                              
                                    <Ionicons
                                        name='mic'
                                        size={40}
                                        color="#1D1042">
                                    </Ionicons>

                            </TouchableOpacity>
                      
                        </View>
                        
                        <TouchableOpacity 
                        onPress={()=>Tts.speak("Enter Your Email Address")}>
                            <Subheading>Enter your email address</Subheading>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row" }}>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Email Address'}
                        />
                        <TouchableOpacity
                               >

                              
                                    <Ionicons
                                        name='mic'
                                        size={40}
                                        color="#1D1042">
                                    </Ionicons>

                            </TouchableOpacity>
                        </View>
                        
                         <TouchableOpacity 
                        onPress={()=>Tts.speak("Enter Your City")}>
                            <Subheading>City</Subheading>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row" }}>
                        <TextInput
                            value={city}
                            onChangeText={setCity}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Current City'}
                        />
                        <TouchableOpacity>
                        <Ionicons
                                        name='mic'
                                        size={40}
                                        color="#1D1042">
                                    </Ionicons>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button1} labelStyle={styles.label1}>Cancel
                            </Button>
                            <Button style={styles.button2} labelStyle={styles.label2} onPress={() =>
                                navigation.navigate('Resume3')
                            } >Save & Next
                            </Button>
                        </View>
                    </Card>
                </KeyboardAvoidingView>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 20,
        width: '85%',
        alignSelf: 'center',
        marginTop: 80,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    button: {

        justifyContent: 'space-between',
        alignSelf: 'center',
        flexDirection: 'row',
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
        width: width * 0.35,
        alignSelf: 'center',
        backgroundColor: '#0ea5e9',
        flexDirection: 'row',
        margin: 10,
        alignContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    label1: {
        color: '#0ea5e9',
        fontWeight: '100',
        fontSize: 12,


    },
    label2: {

        color: 'white',
        fontWeight: '100',
        fontSize: 12,
    },
    profile: {
        height: width / 5,
        width: width / 5,
        margin: 5,
        borderRadius: width,
        alignSelf: 'center',


    },
    nameInput: {
        height: 45,
        borderWidth: 1,
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
        paddingLeft: 10,
        borderRadius: 8,
        width: 280
    },
    nameInput2: {
        flex: 1,
        height: 45,
        borderWidth: 2,
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
        paddingLeft: 10,
        marginRight: 15,
    },
    nameInput3: {
        flex: 4,
        height: 45,
        borderWidth: 2,
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
        paddingLeft: 10,
        marginHorizontal: 15,
    },
    iconMain: {
        fontSize: 22,
        marginTop: 2,
    },
    linearGradient: {
        width: 70,
        paddingVertical: 3,
        marginHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
});

export default Resume2;
