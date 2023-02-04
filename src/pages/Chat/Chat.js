import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CometChat} from '@cometchat-pro/react-native-chat';

const Chat = ({navigation}) => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    CometChat.getLoggedinUser().then(
      user => {
        console.log('user details:', {user});
      },
      error => {
        console.log('error getting details:', {error});
      },
    );

    let usersRequest = new CometChat.UsersRequestBuilder().setLimit(30).build();
    usersRequest.fetchNext().then(userList => {
      setUserList(userList);
    });
  }, []);
  return (
    <View>
      <ScrollView>
        {userList.map(user => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Individual', {
                uid: user.uid,
              });
            }}
            key={user.uid}>
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                backgroundColor: 'white',
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: user.avatar
                    ? user.avatar
                    : 'https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg',
                }}
                style={{
                  height: 50,
                  width: 50,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
              <View
                style={{
                  marginLeft: 20,
                }}>
                <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
                  {user.name}
                </Text>
                <Text>{user.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
