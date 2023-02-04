import React, { useState } from 'react';
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
import { useTheme } from '@react-navigation/native';
import {
    Text,
    Card,
    RadioButton,
    Subheading,
    Button,
} from 'react-native-paper';
import { height, width } from '../Consts';
import { useNavigation } from '@react-navigation/native';
import Tts from 'react-native-tts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Resume4 = ({ }) => {
    const { colors } = useTheme();
    //   const {currentUser, setCurrentUser} = useContext(AuthContext);
    const [objective, setObjective] = useState('');
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [profile, setProfile] = useState('');
    const [organization, setOrganization] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const learnings = ['Work from home'];
    const works = ['Currently work here.'];
    const [workfromhome, setWorkFromHome] = useState('');
    const [workhere, setWorkhere] = useState('');
    const navigation = useNavigation();

    useEffect(() => {

        Tts.getInitStatus().then(() => {
            Tts.speak('Enter your job details.');
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
                            Internship Details
                        </Text>
                        <TouchableOpacity
                            onPress={() => Tts.speak("Profile")}>
                            <Subheading>Profile*</Subheading>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row" }}>
                        <TextInput
                            value={profile}
                            onChangeText={setProfile}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Your Job Profile'}
                        />
                        <TouchableOpacity>
                            <Ionicons
                                name='mic'
                                size={40}
                                color="#1D1042">
                            </Ionicons>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity 
                        onPress={()=>Tts.speak("Organization")}>
                            <Subheading>Organization*</Subheading>
                        </TouchableOpacity>
                        <TextInput
                            value={organization}
                            onChangeText={setOrganization}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Organization'}
                        />
                        <TouchableOpacity>
                            <Ionicons
                                name='mic'
                                size={40}
                                color="#1D1042">
                            </Ionicons>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>Tts.speak("Location")}>
                            <Subheading>Location*</Subheading>
                        </TouchableOpacity>
                       
                        <TextInput
                            value={location}
                            onChangeText={setLocation}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Location'}
                        />
                         <TouchableOpacity>
                            <Ionicons
                                name='mic'
                                size={40}
                                color="#1D1042">
                            </Ionicons>
                        </TouchableOpacity>
                        <RadioButton.Group onValueChange={j => setWorkFromHome(j)} value={workfromhome}>
                            <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                                {learnings.map((i, k) => (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginHorizontal: 10,
                                            alignItems: 'center',
                                        }}
                                        key={k}>
                                        <RadioButton value={i} color={colors.textAfter} />
                                        <Text style={{ fontSize: 15 }}>{i}</Text>
                                    </View>
                                ))}
                            </View>
                        </RadioButton.Group>

                        <Subheading>Enter Your Objective</Subheading>


                        <TextInput
                            value={objective}
                            onChangeText={setObjective}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            multiline
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Objective (Max 300 words)'}
                        />
                        <Subheading>Start Date</Subheading>
                        <TextInput
                            value={startdate}
                            onChangeText={setStartDate}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Select Start Date'}
                        />
                        <Subheading>End Date</Subheading>
                        <TextInput
                            value={enddate}
                            onChangeText={setEndDate}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Select End Date'}
                        />
                        <RadioButton.Group onValueChange={j => setWorkhere(j)} value={workhere}>
                            <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                                {works.map((i, k) => (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginHorizontal: 10,
                                            alignItems: 'center',
                                        }}
                                        key={k}>
                                        <RadioButton value={i} color={colors.textAfter} />
                                        <Text style={{ fontSize: 15 }}>{i}</Text>
                                    </View>
                                ))}
                            </View>
                        </RadioButton.Group>
                        <Subheading>Description</Subheading>
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            underlineColorAndroid="transparent"
                            placeholderTextColor={colors.textAfter}
                            style={{
                                ...styles.nameInput2,
                                borderColor: colors.lightblack,
                                color: colors.text,
                                //backgroundColor: colors.background,
                            }}
                            placeholder={'Add short description of your work done.'}
                        />
                        <View style={styles.button}>
                            <Button style={styles.button1} labelStyle={styles.label1}  >Cancel
                            </Button>
                            <Button style={styles.button2} labelStyle={styles.label2} onPress={() =>
                                navigation.navigate('Resume5')
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
        marginTop: 60,
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
        margin:height * 0.1,
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
        backgroundColor: '#00CFDE',
        flexDirection: 'row',
        margin: 10,
        alignContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    label1: {
        color: '#00CFDE',
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
        width:280
    },
    nameInput2: {

        height: height * 0.2,
        borderWidth: 1,
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
        padding: 10,
        borderRadius: 8,
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

export default Resume4;
