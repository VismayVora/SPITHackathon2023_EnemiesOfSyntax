import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
const AddEventC = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [targetAmount, setTargetAmount] = useState(0);
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [eventDate, setEventDate] = useState('');
  const [targetVolunteers, setTargetVolunteers] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const post = async () => {
    console.log(value);
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('description', desc);
    formdata.append('images', image);
    formdata.append('targetAmount', parseInt(targetAmount));
    formdata.append('collectedAmount', parseInt(collectedAmount));
    formdata.append('event_date', eventDate);
    formdata.append('targetVolunteers', parseInt(targetVolunteers));
    formdata.append('startup', value);
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Token 72f957f003d1ae579df255c5e46c5adefcb0d7c7',
    );
    myHeaders.append(
      'Cookie',
      'csrftoken=o4q1Ihf3JTBVbPIRuFvCtHZVT3RHp0X8; sessionid=0rx0ut9910ocx5ggaz1l6en6khbzxg1n',
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://127.0.0.1:8000/news/funding/', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setTitle('');
    setDesc('');
  };
  const selectImage = async () => {
    const res = await launchImageLibrary({
      mediaType: 'photo',
    });
    console.log(res.assets[0].uri);
    setImage({
      uri: res.assets[0].uri,
      name: res.assets[0].fileName,
      type: res.assets[0].type,
    });
  };

  const getStartUps = async () => {
    var config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/account/startup/',
      headers: {
        Authorization: 'Token 72f957f003d1ae579df255c5e46c5adefcb0d7c7',
      },
    };
    axios(config)
      .then(function (response) {
        const sups = [];
        console.log(response.data);
        const s = response.data;
        s.map(startup => {
          sups.push({label: startup.legalNameOfBusiness, value: startup.id});
        });
        setItems(sups);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getStartUps();
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <View
        style={{
          alignItems: 'center',
          padding: 15,
          elevation: 3,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Upload A Campaign
        </Text>
      </View>
      <ScrollView>
        {image ? (
          <View>
            <Image
              source={{
                uri: image.uri,
              }}
              style={{
                width: '100%',
                height: 300,
              }}
            />
          </View>
        ) : null}
        <View
          style={{
            padding: 30,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
              marginBottom: 10,
            }}>
            Enter Details
          </Text>
          {items && (
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select a Startup"
              textStyle={{
                fontSize: 16,
              }}
            />
          )}
          <View
            style={{
              padding: 5,
              borderRadius: 10,
              elevation: 2,
              backgroundColor: 'white',
              marginVertical: 20,
            }}>
            <TextInput
              value={title}
              onChangeText={e => setTitle(e)}
              style={styles.textInput}
              placeholder="Enter Title"
            />
          </View>
          <View
            style={{
              padding: 5,
              borderRadius: 10,
              elevation: 2,
              backgroundColor: 'white',
              marginBottom: 20,
            }}>
            <TextInput
              value={desc}
              onChangeText={e => setDesc(e)}
              style={styles.textInput}
              placeholder="Enter Description"
              numberOfLines={4}
              multiline={true}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                padding: 5,
                borderRadius: 10,
                elevation: 2,
                backgroundColor: 'white',
                marginVertical: 20,
              }}>
              <TextInput
                value={targetAmount}
                onChangeText={e => setTargetAmount(e)}
                style={styles.textInput}
                placeholder="Targeted Amount"
              />
            </View>
            <View
              style={{
                padding: 5,
                borderRadius: 10,
                elevation: 2,
                backgroundColor: 'white',
                marginVertical: 20,
              }}>
              <TextInput
                value={collectedAmount}
                onChangeText={e => setCollectedAmount(e)}
                style={styles.textInput}
                placeholder="Collected Amount"
              />
            </View>
          </View>
          <View
            style={{
              padding: 5,
              borderRadius: 10,
              elevation: 2,
              backgroundColor: 'white',
              marginVertical: 20,
            }}>
            <TextInput
              value={eventDate}
              onChangeText={e => setEventDate(e)}
              style={styles.textInput}
              placeholder="Event Date in DD-MM-YYYY"
            />
          </View>
          <View
            style={{
              padding: 5,
              borderRadius: 10,
              elevation: 2,
              backgroundColor: 'white',
              marginVertical: 20,
            }}>
            <TextInput
              value={targetVolunteers}
              onChangeText={e => setTargetVolunteers(e)}
              style={styles.textInput}
              placeholder="Target Volunteers"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginTop: 10,
            }}>
            <View>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: 'lightblue',
                  borderRadius: 100,
                  alignSelf: 'baseline',
                }}
                onPress={selectImage}>
                <AntDesign name="camerao" size={30} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                }}>
                Image
              </Text>
            </View>
            <TouchableOpacity
              style={{
                padding: 12,
                backgroundColor: 'lightblue',
                borderRadius: 10,
              }}
              onPress={post}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 17,
                }}>
                Upload
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddEventC;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
  },
});
