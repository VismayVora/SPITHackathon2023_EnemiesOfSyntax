import React from 'react'
import {
    View,
    Text,StyleSheet,Image
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PointsHistory from '../components/PointsHistory';
import ReferEarn from '../components/ReferEarn';
import coin from '../assets/coin.png';

const Tab = createMaterialTopTabNavigator();

export default function ReferralClub() {
    const insets = useSafeAreaInsets();
    return (
         <SafeAreaView style={styles.container}>
            <View style={{justifyContent: 'flex-end',alignItems: 'flex-end',margin:20,flexDirection: 'row'}}>
                <Text style={{fontSize: 15,color: '#4B4B4B'}}>Total Points : </Text>
                <Image source={coin} style={styles.image} ></Image>
                    <Text style={styles.title1}> 100</Text>


            </View>
            <Tab.Navigator
                initialRouteName="ReferEarn"
                screenOptions={{
                    activeTintColor: "#00CFDE",
                    labelStyle: { fontSize: 11 },
                    style: { backgroundColor: "#00CFDE", marginTop: insets.top },
                tabBarActiveTintColor: "#00CFDE",
                tabBarInactiveTintColor: "#000000",
                tabBarShowLabel: true,
                
                tabBarLabelStyle: {
                  fontSize: 12,
                
                }
                }}
            >
                <Tab.Screen
                    name="ReferEarn"
                    component={ReferEarn}
                    options={{ tabBarLabel: "Refer & Earn " }}
                />
                <Tab.Screen
                    name="PointsHistory"
                    component={PointsHistory}
                    options={{ tabBarLabel: "Points History" }}
                />

            </Tab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 1,
        color: '#000000',
    },
    icon: {
        fontSize: 25,
        position: 'absolute',
        left: 10,
    },
    title1: {
        fontSize: 13,
        textAlign: 'center',
        color: '#00CFDE',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
