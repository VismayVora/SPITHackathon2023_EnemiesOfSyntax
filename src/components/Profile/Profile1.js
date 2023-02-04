import React, { useEffect, useState, useCallback, useRef } from 'react';
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
import { height, width } from '../../Consts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Videoprofile from '../../assets/videoprofile.png';
import { useNavigation } from '@react-navigation/native';


const Profile1 = ({ }) => {
    const { colors } = useTheme();
    const [image, setImage] = useState('');
    const [fileResponse, setFileResponse] = useState([]);
    const [playing, setPlaying] = useState(false);
    const navigation = useNavigation();

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);





    return (
        <View style={{
            flex: 1, backgroundColor: 'white',
            // borderColor: '#000000', borderWidth: 0.5, borderRadius: 10, margin: 15 
        }}
        >

            <ScrollView>
                <View style = {{alignSelf: 'center', margin: 10 ,alignItems: 'center',justifyContent: 'center'}}>
                <TouchableOpacity >

                    <Image
                        source={{
                            uri:
                                image.uri ||
                                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
                        }}
                        style={styles.profile}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        color: '#000000',

                        marginHorizontal: 20,
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>
                    Abhishek
                </Text>
                <Text
                    style={{
                        color: '#000000',

                        marginHorizontal: 20,
                    }}>
                    UI/UX Designer
                </Text>
            </View>

                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>

                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Hobbies & Interest </Text>
                        <TouchableOpacity>

                            <Text style={{ fontSize: 18, color: '#00CFDE' }}>Add</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row' }}>

                        <Button style={styles.button1}><Text style={styles.nameInput2}>Football X</Text></Button>
                        <Button style={styles.button1}><Text style={styles.nameInput2}>Drawing X</Text></Button>
                        <Button style={styles.button1}><Text style={styles.nameInput2}>Singing X</Text></Button>
                    </View>


                </View>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>

                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Key Skills</Text>
                        <TouchableOpacity>

                            <Text style={{ fontSize: 18, color: '#00CFDE' }}>Add</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row' }}>

                        <Button style={styles.button1}><Text style={styles.nameInput2}>Figma X</Text></Button>
                        <Button style={styles.button1}><Text style={styles.nameInput2}>Canva X</Text></Button>
                        <Button style={styles.button1}><Text style={styles.nameInput2}>Arts X</Text></Button>
                    </View>


                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.card1}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>

                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Basic details</Text>
                                <TouchableOpacity>

                                    <Icon name="edit" size={20} color="#00CFDE" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'flex-start' }}>
                                    <Feather name="shopping-bag" size={20} color="#808080" />
                                    <Text style={{ fontSize: 15, marginHorizontal: 15 }}>Fresher</Text>
                                </View>
                                <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'flex-start' }}>
                                    <Ionicons name="location-outline" size={20} color="#808080" />
                                    <Text style={{ fontSize: 15, marginHorizontal: 15 }}>Add Location</Text>
                                </View>
                                <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'flex-start' }}>
                                    <Feather name="mail" size={20} color="#808080" />
                                    <Text style={{ fontSize: 15, marginHorizontal: 15 }}>abhi@gmail.com</Text>
                                </View>
                                <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'flex-start' }}>
                                    <Feather name="phone" size={20} color="#808080" />
                                    <Text style={{ fontSize: 15, marginHorizontal: 15 }}>0987654321</Text>
                                </View>


                            </View>

                        </View>
                        <View style={styles.card1}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>

                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Video profile</Text>
                                <TouchableOpacity >

                                    <Text style={{ fontSize: 16, color: '#00CFDE' }}>Record</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>

                                <Image style={{ height: height * 0.18, width: width * 0.27, marginVertical: 10 }} source={Videoprofile} />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 10, color: '#000000', margin: 5 }}>Impress</Text>
                                    <Text style={{ fontSize: 10, color: '#808080', margin: 5 }}>Show</Text>
                                </View>

                            </View>

                        </View>
                    </View>
                    <View style={styles.card2}>
                        <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                            <Text style={{ fontSize: 10, color: '#00CFDE' }}>My Dashboard</Text>
                            <View style={styles.card3}>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Feather name="eye" size={25} />
                                        <Text style={{ fontSize: 20 }}>0</Text>
                                    </View>
                                    <Text style={{ color: '#7D7D7D', alignSelf: 'center', alignContent: 'center', justifyContent: 'center', fontSize: 12 }}>Profile Visitors</Text>
                                </View>

                            </View>
                            <View style={styles.card3}>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Feather name="shopping-bag" size={25} />
                                        <Text style={{ fontSize: 20 }}>0</Text>
                                    </View>
                                    <Text style={{ color: '#7D7D7D', alignSelf: 'center', alignContent: 'center', justifyContent: 'center', fontSize: 12 }}>Jobs applied</Text>
                                </View>

                            </View>
                            <View style={styles.card3}>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Ionicons name='newspaper-outline' size={25} />
                                        <Text style={{ fontSize: 20 }}>0</Text>
                                    </View>
                                    <Text style={{ color: '#7D7D7D', alignSelf: 'center', alignContent: 'center', justifyContent: 'center', fontSize: 11 }}>Shortlisted</Text>
                                </View>

                            </View>
                            <View style={styles.card3}>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Feather name='bookmark' size={25} />
                                        <Text style={{ fontSize: 20 }}>0</Text>
                                    </View>
                                    <Text style={{ color: '#7D7D7D', alignSelf: 'center', alignContent: 'center', justifyContent: 'center', fontSize: 11 }}>Saved Jobs</Text>
                                </View>

                            </View>

                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>

                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>About me</Text>
                        <TouchableOpacity>

                            <Text style={{ fontSize: 18, color: '#00CFDE' }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.nameInput}>Put forward your education and career journey in a few lines</Text>

                </View>

                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>

                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Key skills </Text>
                        <TouchableOpacity>

                            <Text style={{ fontSize: 18, color: '#00CFDE' }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.nameInput}>Tell recruiters about the tools and softwares you know </Text>

                </View>
                <View>
                    <Button style={styles.button5} labelStyle={styles.label2}
                        onPress={() =>
                            navigation.navigate('Profile2')
                        }>Next
                    </Button>
                </View>



            </ScrollView>
        </View >
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        width: width * 0.9,
        alignSelf: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        // elevation: 3,
        // backgroundColor: '#fff',
        // shadowOffset: { width: 1, height: 1 },
        // shadowColor: '#333',
        // shadowOpacity: 0.05,
        // shadowRadius: 1,
        borderRadius: 15,
        height: height * 0.13,
        borderColor: '#D9D9D9',
        borderWidth: 1,
    },
    card1: {
        padding: 10,
        width: width * 0.55,
        alignSelf: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        // elevation: 3,
        // backgroundColor: '#fff',
        // shadowOffset: { width: 1, height: 1 },
        // shadowColor: '#333',
        // shadowOpacity: 0.05,
        // shadowRadius: 1,
        borderRadius: 15,
        height: height * 0.28,
        borderColor: '#D9D9D9',
        borderWidth: 1,
    },
    card2: {
        padding: 10,
        width: width * 0.3,
        alignSelf: 'center',

        marginVertical: 10,
        // elevation: 3,
        // backgroundColor: '#fff',
        // shadowOffset: { width: 1, height: 1 },
        // shadowColor: '#333',
        // shadowOpacity: 0.05,
        // shadowRadius: 1,
        borderRadius: 15,
        height: height * 0.58,
        borderColor: '#D9D9D9',
        borderWidth: 1,
    },
    card3: {
        padding: 7,
        width: width * 0.2,
        alignSelf: 'center',

        marginVertical: 10,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.05,
        shadowRadius: 1,

        height: height * 0.1,
        borderColor: '#D9D9D9',
        borderWidth: 1,
    },
    nameInput: { fontSize: 12, color: '#808080', margin: 10, },
    nameInput1: {
        fontSize: 12, color: '#808080', margin: 15, alignSelf: 'center', justifyContent: 'center', alignContent: 'center'
    },
    nameInput2: {

        fontSize: 12,
    },
    nameInput3: {

        color: '#000000',
        fontWeight: 'bold'
        , margin: 5,
    },
    nameInput4: {

        color: '#757575'
        , margin: 5,
    },
    nameInput5: {
        height: height * 0.05,
        borderWidth: 1,
        width: width * 0.7,
        margin: 5,

        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        padding: 10,
        borderRadius: 5,
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
    button: {
        width: width * 0.36,
        height: height * 0.05,
        backgroundColor: '#B9E6EB',
    },
    button1: {
        width: width * 0.27,
        height: height * 0.05,
        backgroundColor: '#B9E6EB',
        margin: 3
    },
    button2: {

        justifyContent: 'space-between',
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
    },
    button3: {
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
    button4: {
        width: width * 0.25,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#00CFDE',
        flexDirection: 'row',
        margin: 10,
        alignContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    profile: {
        height: width / 4,
        width: width / 4,
        borderRadius: width,
        marginHorizontal: 20,
        marginVertical: 10,

    },
    button5: {
        width: width * 0.2,
        alignSelf: 'flex-end',
        backgroundColor: '#00CFDE',
        margin: 20,
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
});

export default Profile1;
