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
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
const UploadPost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [ytLink, setYtLink] = useState('');
  const post = async () => {
    console.log(image);
    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('body', desc);
    formdata.append('images_post', image);

    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization', 'Token 8ee751c251eee9774e1e4a508ac3dc8f2b2791a6'
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

    fetch('http://127.0.0.1:8000/api/posts/', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setTitle('');
    setDesc('');
    setYtLink('');
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
        {/* <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Upload A Post
        </Text> */}
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
            Report public spaces which are
            not under PWD already, to authorities.
          </Text>
          <View
            style={{
              padding: 5,
              borderRadius: 10,
              elevation: 2,
              backgroundColor: 'white',
              marginBottom: 20,
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
              padding: 5,
              borderRadius: 10,
              elevation: 2,
              backgroundColor: 'white',
              marginVertical: 20,
            }}>
            <TextInput
              value={ytLink}
              onChangeText={e => setYtLink(e)}
              style={styles.textInput}
              placeholder="Enter YouTube Link"
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
                  backgroundColor: '#2eb6b8',
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
                backgroundColor: '#2eb6b8',
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

export default UploadPost;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
  },
});
