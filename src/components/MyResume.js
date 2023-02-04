import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { height, width } from '../Consts';
import Resumes from './Resumes';

const MyResume = ({ }) => {
    return (
        <View style={styles.container}>
        <Resumes/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


export default MyResume;
