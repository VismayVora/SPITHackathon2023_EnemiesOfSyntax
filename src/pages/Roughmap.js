import React, { useState ,useRef ,  useEffect } from 'react';
import {  Text  ,Button  ,PermissionsAndroid , StyleSheet} from 'react-native';
import MapView, { PROVIDER_GOOGLE ,Marker } from 'react-native-maps';
import { Polyline } from "react-native-maps";

import Geolocation from '@react-native-community/geolocation';

function Map() {
 {
    const mapRef = useRef(null);

    const [location , setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421});
          
      let  initialRegion={
          latitude: 19.0760,
          longitude: 72.8777,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      // const [location]
        const tokyoRegion = {
            latitude: 35.6762,
            longitude: 139.6503,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922,
          };

          var watchID = useRef(null)

        const goToTokyo = () => {
            mapRef.current.animateToRegion(tokyoRegion, 3 * 1000);
          };

          useEffect(() => {
            const requestLocationPermission = async () => {
              if (Platform.OS === 'ios') {
                getOneTimeLocation();
              
              } else {
                try {
                  const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                      title: 'Location Access Required',
                      message: 'This App needs to Access your location',
                    },
                  );
                  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                     await getOneTimeLocation();
                 
                  } else {
                    console.log('Permission Denied');
                  }
                } catch (err) {
                  console.warn(err);
                }
              }
            };
            requestLocationPermission();
            return () => {
              Geolocation.clearWatch(watchID);
            };
          }, []);

          const getOneTimeLocation = async() =>{
            Geolocation.getCurrentPosition((pos) =>{
              let latitude = pos.coords.latitude;
              let longitude = pos.coords.longitude; 
              let latitudeDelta = 0.092 ;
              let longitudeDelta= 0.0421;
            setLocation({latitude , longitude , latitudeDelta, longitudeDelta})
            console.log(location )
          },(err)=>{console.log(err)} , {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000})
          }


    return (
        <>
      {/* <MapView
         style={{ flex: 1 }}
         provider={PROVIDER_GOOGLE}
         initialRegion={tokyoRegion}
         mapType = 'hybrid'
         onRegionChangeComplete={(r) => setLocation(r)}
         ref={mapRef}
        //  showsUserLocation = {true}
        //  showsMyLocationButton = {true}
      >
      </MapView> */}
      <MapView
        // ref={mapRef}
        style={{ flex : 1}}
        initialRegion={{
          latitude: 19.0760,
          longitude: 72.8777,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        // onRegionChangeComplete={(region) => setRegion(region)}
      />
      <Button onPress={() => goToTokyo()} title="Go to Tokyo" />
      {/* <Button onPress={() => getMyLocation()} title="Go to My location" /> */}
      <Text style={styles.text}>Current latitude: {location.latitude}</Text>
    <Text style={styles.text}>Current longitude: {location.longitude}</Text>
      </>
    );
  }
}

const styles = StyleSheet.create ({
  map: {
     height: 400,
     marginTop: 80
  },
  text: {
    color : "black"
  }
})

export default Map;
