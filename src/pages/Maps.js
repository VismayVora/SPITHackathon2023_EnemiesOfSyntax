
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { moderateScale } from '../components/responsiveSize';
import { data } from '../latlong';
import location from './LocationTracer'

const Location = () => {
    const [curLoc, setCurLoc] = useState({
        latitude: 30.7993,
        longitude: 76.9149,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const mapRef = useRef(null)

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                initialRegion={curLoc}
            // onRegionChangeComplete={onRegionChange}
            >

                {data.map((val, i) => {
                    return (
                        <Marker
                            coordinate={val.coords}

                        />
                    )
                })}
            </MapView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    bottomView: {
        position: 'absolute',
        bottom: 24,
        left: 24,
        right: 24,
    },
    headerView: {
        position: 'absolute',
        top: 36,
        left: 24,
        right: 24,
    },
    navigationView: {
        width: moderateScale(35),
        height: moderateScale(35),
        borderRadius: moderateScale(35 / 2),
        backgroundColor: '#white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

//make this component available to the app
export default Location;
