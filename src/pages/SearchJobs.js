import React from 'react';
import {
    View, StyleSheet, Image,
    TextInput, SafeAreaView,
} from 'react-native';
import {
    Text, Button
} from 'react-native-paper';;
import Laptop from '../assets/laptop.png';
import { height, width } from '../Consts';
import { useTheme } from '@react-navigation/native';
import CompanyJobs from '../components/CompanyJobs';
import { ScrollView } from 'react-native-gesture-handler';
import Charts from './Charts';


const SearchJobs = ({ navigation }) => {

    const { colors } = useTheme();

    return (
        <SafeAreaView style={styles.container} >
            <ScrollView>
                {/* <Header title={'Search Jobs'} /> */}
                <View style={styles.view2}>
                    <Text style={styles.title}>Search Startups</Text>
                    <TextInput placeholderTextColor={colors.placeholder2}
                        style={{
                            ...styles.nameInput,
                            borderBottomColor: colors.textAfter,
                            color: colors.text,
                        }}
                        placeholder="Enter skills, designations, companies">
                    </TextInput>
                    <TextInput placeholderTextColor={colors.placeholder2}
                        style={{
                            ...styles.nameInput,
                            borderBottomColor: colors.textAfter,
                            color: colors.text,
                        }}
                        placeholder="Enter location">
                    </TextInput>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Top startups</Text>
                    <Text style={styles.text2}>View all</Text>
                </View>
                <CompanyJobs />
              <Charts/>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SearchJobs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },
    button: {
        width: width * 0.5,
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 20,
        backgroundColor: '#00CFDE',
        color: '#fff',
    },
    nameInput: {
        height: 45,
        borderBottomWidth: 1,
        fontFamily: 'Poppins-Regular',
    },
    card: {
        elevation: 10,
        backgroundColor: '#fff',
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,

    },
    image: {
        height: height * 0.40,
        width: width * 0.85,
        alignSelf: 'center',

    },
    text3: {
        fontSize: 13,

        color: "white",
        textAlign: "center",
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    view2: {
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.01,
    },
    text: {
        fontSize: 20,
        marginHorizontal: width * 0.05,
        color: "#000000",
        fontWeight: 'bold',
        fontWeight: "500",
    },
    text2: {
        fontSize: 20,
        marginHorizontal: width * 0.05,
        color: "#00CFDE",
        // fontWeight: 'bold',
        fontWeight: "400",
    },
    title: {
        margin: 5,
        fontWeight: '400',
        fontSize: 18,
        color: "#000000",

    }
});
