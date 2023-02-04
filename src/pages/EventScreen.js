import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Paragraph, Subheading, useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';

const EventScreen = ({route}) => {
  const {event} = route.params;
  const {colors} = useTheme();
  const navigation = useNavigation();

  let options = {
    description: 'Online Fee',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    amount: '25000',
    key: 'rzp_test_631wMxKie5nOL2',
    name: 'Test',
    prefill: {
      email: 'test@email.com',
      contact: '9191919191',
      name: 'ReactNativeForYou',
    },
    theme: {color: '#528FF0'},
  };

  const onPressButton = () => {
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        Alert.alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  

  const Detail = ({name, value}) => {
    return (
      <View
        style={{
          marginVertical: 5,
          flexDirection: 'row',
          marginLeft: 5,
          width: '80%',
        }}>
        <Paragraph style={{color: colors.background, fontWeight: 'bold'}}>
          {name}:-{' '}
        </Paragraph>
        <Paragraph style={{color: colors.background}}>{value}</Paragraph>
      </View>
    );
  };

  return (
    <ImageBackground source={{uri: event.image}} style={styles.container}>
      <View
        style={{...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.4)'}}
      />
      <Subheading
        style={{
          color: colors.accent,
          fontSize: 18,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        {event.name}
      </Subheading>
      <Paragraph style={{color: colors.background}}>
        By ~{event.createdBy}
      </Paragraph>
      <ScrollView
        style={{
          flex: 1,
          marginTop: 10,
          borderWidth: 2,
          borderColor: colors.disabled,
          borderRadius: 10,
          padding: 10,
        }}>
        <View style={{flex: 1}}></View>
        <Paragraph
          style={{
            color: '#00CFDE',
            fontWeight: 'bold',
            fontSize: 16,
            textDecorationLine: 'underline',
          }}>
          About Event:
        </Paragraph>
        <Paragraph style={{color: colors.background}}>
          {event.description}
        </Paragraph>
        <View style={{marginTop: 10}}>
          <Paragraph
            style={{
              color: '#00CFDE',
              fontWeight: 'bold',
              fontSize: 16,
              textDecorationLine: 'underline',
            }}>
            Event Description
          </Paragraph>
          <Detail name={'Target Amount'} value={event.targetAmount} />
          <Detail
            name={'Event Date'}
            value={new Date(event.event_date).toLocaleDateString()}
          />
          <Detail name={'No. of Volunteers Required'} value={event.startup} />
          {/* <Detail name={'Location'} value={event.address} /> */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-evenly',
            }}>
            <Button
              title={'Donate'}
              onPress={() => onPressButton()}
              style={'solid'}
              buttonStyle={{
                backgroundColor: '#00CFDE',
                height: 50,
                width: 120,
                borderRadius: 30,
                marginBottom: 20,
              }}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: 18,
              }}
            />
          </View>
          <Button
            title={'Chat'}
            style={'solid'}
            onPress={() => {
              navigation.navigate('Chat');
            }}
            buttonStyle={{
              backgroundColor: '#00CFDE',
              height: 50,
              width: 120,
              borderRadius: 30,
              marginBottom: 20,
              alignSelf: 'center',
            }}
            titleStyle={{
              fontWeight: 'bold',
              fontSize: 18,
            }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default EventScreen;
