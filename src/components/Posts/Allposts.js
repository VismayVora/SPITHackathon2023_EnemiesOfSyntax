import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  Share,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../../theme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function AllPosts({ navigation }) {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const { user } = useSelector(state => state.user);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Share this post`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var axios = require('axios');
    var data = '';
    var config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/api/posts/',
      headers: {
        'Authorization': 'Token 8ee751c251eee9774e1e4a508ac3dc8f2b2791a6',
        'Content-Type': 'application/json'
      },
      data: data
    };


    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.reverse()));
        setFilteredData(response.data);
        setMasterData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.owner
          ? item.owner.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredData(newData);
      setSearch(text);
    }
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(masterData);
      setSearch(text);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginTop: 10,
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{
                height: 55,
                width: 55,
                borderRadius: 100,
              }}
              source={{
                uri: 'https://media.licdn.com/dms/image/D4D03AQG0ZaR1QnxdZQ/profile-displayphoto-shrink_400_400/0/1670765121248?e=1678924800&v=beta&t=9eRfx-uzBukZ7VGvVJU7RSOGGGu66lUC3jUAU2ASpEQ',
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: '600', color: 'black', fontSize: 16 }}>
                {item.owner}
              </Text>
              <Text style={{ color: 'black' }}>{item.title}</Text>
            </View>
          </View>
          <Text
            style={{
              color: '#4186F5',
            }}>
            + Follow
          </Text>
        </View>
        <Text style={{ marginTop: 10 }}>{item.body}</Text>
        <Image
          source={{
            uri: item.images_post,
          }}
          style={{
            width: '100%',
            height: 300,
            marginTop: 10,
            resizeMode: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,

            borderTopColor: 'lightgray',
            borderTopWidth: 1,
            paddingTop: 20,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <AntDesign name="like2" size={25} style={{ marginHorizontal: 20 }} />
            <Text>{item.like_on_post_count}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Fontisto
              name="commenting"
              size={25}
              style={{ marginHorizontal: 20 }}
            />
            <Text>{item.comment_on_post_count}</Text>
          </View>
          <TouchableOpacity onPress={onShare}>
            <AntDesign name="sharealt" size={25} />
          </TouchableOpacity>
          {/* <Feather name="send" size={25} /> */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: 'white',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: 'https://media.licdn.com/dms/image/D4D03AQG0ZaR1QnxdZQ/profile-displayphoto-shrink_400_400/0/1670765121248?e=1678924800&v=beta&t=9eRfx-uzBukZ7VGvVJU7RSOGGGu66lUC3jUAU2ASpEQ',
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
          />
          <View
            style={{
              marginLeft: 20,
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 3,
              paddingHorizontal: 5,
              backgroundColor: theme.colors.greyLight,
            }}>
            <AntDesign name="search1" size={20} />
            <TextInput
              style={{
                flex: 0.8,
                height: 40,
              }}
              placeholder="Search"
              value={search}
              onChangeText={text => searchFilter(text)}
            />
          </View>
        </View>
        <AntDesign
          name="message1"
          size={25}
          onPress={() => {
            navigation.navigate('ChatMain');
          }}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={({ id }) => id}
        contentContainerStyle={{}}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#3BCBFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 10,
  },
  feedItem: {
    backgroundColor: '#00CBA9',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    margin: 25,
    shadowColor: '#000000',
    shadowOffset: { height: 15 },
    shadowRadius: 15,
    shadowOpacity: 10,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 20,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: 'white',
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
  input: {
    padding: 10,
    flex: 1,
    borderBottomColor: 'black',
    backgroundColor: '#00CBA9',
  },
  inputCard: {
    margin: 25,
    flexDirection: 'row',
    backgroundColor: '#000000',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 100,
    borderColor: 'white',
    borderWidth: 0.5,
  },
});
