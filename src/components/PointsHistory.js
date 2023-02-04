import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import coin from '../assets/coin.png';

const PointsHistory = ({ }) => {
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}>

                <Text style={styles.title}>Referred Akash to Blockchain investor role in Microsoft</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                    <Image source={coin} style={styles.image} ></Image>
                    <Text style={styles.title1}> +50</Text>
                </View>
            </View>
            <View style={{ margin: 20,borderTopColor:'#000000' , borderTopWidth: 1 }}>

                <Text style={styles.title}>Referred Mentordots Mobile App to a friend</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                    <Image source={coin} style={styles.image} ></Image>
                    <Text style={styles.title1}> +50</Text>
                </View>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        color: '#000000',
    },
    title1: {
        fontSize: 13,
        textAlign: 'center',
        color: '#00CFDE',

        marginVertical: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',

    },
    image: {
        width: 20,
        height: 20,
        marginVertical: 10,
    }
});


export default PointsHistory;
