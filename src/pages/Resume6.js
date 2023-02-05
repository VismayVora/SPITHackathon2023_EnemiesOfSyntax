import React, { useState, useEffect } from 'react';;
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import {
    Text,
    Card,
    Title,
    Subheading,
    Button,
} from 'react-native-paper';
import { height, width } from '../Consts';
import Add from '../assets/add.png';
import { useNavigation } from '@react-navigation/native';
import Tts from 'react-native-tts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Resume6 = ({ }) => {
    const { colors } = useTheme();
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [degree, setDegree] = useState('');
    const [institute, setInstitute] = useState('');
    const navigation = useNavigation();

       
    useEffect(() => {

        Tts.getInitStatus().then(() => {
            Tts.speak('Enter your Skills.');
        });

      
    }, []);



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
                            Skills
                        </Text>

                        <Subheading>Skills*</Subheading>
                        <TouchableOpacity 
                        onPress={()=>Tts.speak("Skills")}>

                        </TouchableOpacity>
                        <View style={{ flexDirection: "row" }}>
                        <TextInput
                            value={degree}
                            onChangeText={setDegree}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Search your skills here'}
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

                        <Subheading>Your Added Skills</Subheading>

                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                value={institute}
                                onChangeText={setInstitute}
                                underlineColorAndroid="transparent"
                                placeholderTextColor='#2E2E2E'
                                multiline
                                style={{
                                    ...styles.nameInput,
                                    borderColor: colors.lightblack,
                                    color: colors.text,
                                    //backgroundColor: colors.background,
                                }}
                                placeholder={'User Experience'}
                            />
                            <Entypo name="circle-with-cross" size={26} style={{ justifyContent: 'flex-end', padding: 7 }} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput

                                underlineColorAndroid="transparent"
                                placeholderTextColor='#2E2E2E'
                                multiline
                                style={{
                                    ...styles.nameInput,
                                    borderColor: colors.lightblack,
                                    color: colors.text,
                                    //backgroundColor: colors.background,
                                }}
                                placeholder={'User Research'}
                            />
                            <Entypo name="circle-with-cross" size={26} style={{ justifyContent: 'flex-end', padding: 7 }} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput

                                underlineColorAndroid="transparent"
                                placeholderTextColor='#2E2E2E'
                                multiline
                                style={{
                                    ...styles.nameInput,
                                    borderColor: colors.lightblack,
                                    color: colors.text,
                                    //backgroundColor: colors.background,
                                }}
                                placeholder={'Competitive Analysis'}
                            />
                            <Entypo name="circle-with-cross" size={26} style={{ justifyContent: 'flex-end', padding: 7 }} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput

                                underlineColorAndroid="transparent"
                                placeholderTextColor='#2E2E2E'
                                multiline
                                style={{
                                    ...styles.nameInput,
                                    borderColor: colors.lightblack,
                                    color: colors.text,
                                    //backgroundColor: colors.background,
                                }}
                                placeholder={'Qualitative Analysis'}
                            />
                            <Entypo name="circle-with-cross" size={26} style={{ justifyContent: 'flex-end', padding: 7 }} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput

                                underlineColorAndroid="transparent"
                                placeholderTextColor='#2E2E2E'
                                multiline
                                style={{
                                    ...styles.nameInput,
                                    borderColor: colors.lightblack,
                                    color: colors.text,
                                    //backgroundColor: colors.background,
                                }}
                                placeholder={'Quantitative Analysis'}
                            />
                            <Entypo name="circle-with-cross" size={26} style={{ justifyContent: 'flex-end', padding: 7 }} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput

                                underlineColorAndroid="transparent"
                                placeholderTextColor='#2E2E2E'
                                multiline
                                style={{
                                    ...styles.nameInput,
                                    borderColor: colors.lightblack,
                                    color: colors.text,
                                    //backgroundColor: colors.background,
                                }}
                                placeholder={'User Flow'}
                            />
                            <Entypo name="circle-with-cross" size={26} style={{ justifyContent: 'flex-end', padding: 7 }} />
                        </View>


                        <View style={styles.add}>

                            <Text style={styles.addmore}>Add More</Text>
                            <TouchableOpacity>
                                <Image source={
                                    Add
                                }
                                    style={styles.profile}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.button1} labelStyle={styles.label1}>Cancel
                            </Button>
                            <Button style={styles.button2} labelStyle={styles.label2} onPress={() =>
                                navigation.navigate('MyResume')
                            }>Save & Next
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
        padding: 20,
        width: '85%',
        alignSelf: 'center',
        marginVertical: 20,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.1,
        shadowRadius: 1,
        height: '90%',
    },
    button: {

        justifyContent: 'space-between',
        alignSelf: 'center',
        flexDirection: 'row',
        margin: height * 0.1,
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
        height: 15,
        width: 15,
        margin: 5,
        alignSelf: 'center',


    },
    add: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    addmore: {
        fontSize: 15,
        color: '#999999',
    },
    nameInput: {
        height: 45,
        borderWidth: 1,
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
        paddingLeft: 10,
        borderRadius: 8,
        flex: 1,
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

export default Resume6;
