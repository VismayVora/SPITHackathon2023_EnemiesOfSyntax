import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {CometChat} from '@cometchat-pro/react-native-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ReceiverChat = ({message}) => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: 'lightblue',
        alignSelf: 'flex-start',
        borderRadius: 10,
        marginVertical: 10,
      }}>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
        }}>
        {message}
      </Text>
    </View>
  );
};

const SenderChat = ({message}) => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: 'lightyellow',
        alignSelf: 'flex-end',
        borderRadius: 10,
        marginVertical: 10,
      }}>
      <Text
        style={{
          fontSize: 16,
          maxWidth: 200,
        }}>
        {message}
      </Text>
    </View>
  );
};

const IndividualChat = ({route, navigation}) => {
  const {uid} = route.params;
  const [receiver, setReceiver] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUid, setCurrentUid] = useState('');
  const [input, setInput] = useState('');
  useEffect(() => {
    let receiver = new CometChat.UsersRequestBuilder()
      .setLimit(1)
      .setUIDs([uid])
      .build();
    receiver.fetchNext().then(r => {
      setReceiver(r[0]);
    });
  }, [uid]);

  useEffect(() => {
    CometChat.getLoggedinUser().then(
      user => {
        setCurrentUid(user.uid);
        console.log('user details:', user.uid);
      },
      error => {
        console.log('error getting details:', {error});
      },
    );
  }, [uid]);
  useEffect(() => {
    let limit = 30;
    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUID(uid)
      .setLimit(limit)
      .build();

    messagesRequest.fetchPrevious().then(
      messages => {
        setMessages(messages);
        console.log('Message list fetched:', messages);
      },
      error => {
        console.log('Message fetching failed with error:', error);
      },
    );
  }, [uid]);

  const sendMessage = () => {
    let receiverType = CometChat.RECEIVER_TYPE.USER;
    let textMessge = new CometChat.TextMessage(uid, input, receiverType);
    CometChat.sendMessage(textMessge).then(
      message => {
        console.log('Message sent successfully:', message);
        let limit = 30;
        let messagesRequest = new CometChat.MessagesRequestBuilder()
          .setUID(uid)
          .setLimit(limit)
          .build();

        messagesRequest.fetchPrevious().then(
          messages => {
            setMessages(messages);
            console.log('Message list fetched:', messages);
          },
          error => {
            console.log('Message fetching failed with error:', error);
          },
        );
      },
      error => {
        console.log('Message sending failed with error:', error);
      },
    );
    setInput('');
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderColor: 'lightgray',
          alignItems: 'center',
        }}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          name="arrow-back"
          size={30}
          color="black"
        />
        <Image
          source={{
            uri: receiver?.avatar
              ? receiver?.avatar
              : 'https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg',
          }}
          style={{
            height: 50,
            width: 50,
            resizeMode: 'contain',
            borderRadius: 100,
            marginLeft: 20,
          }}
        />
        <View
          style={{
            marginLeft: 20,
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
            {receiver?.name}
          </Text>
          <Text>{receiver?.status}</Text>
        </View>
      </View>
      <ScrollView style={{padding: 10}}>
        {messages.map(msg => {
          if (msg.sender.uid === currentUid) {
            return <SenderChat key={msg.data.text} message={msg.data.text} />;
          } else {
            return <ReceiverChat key={msg.data.text} message={msg.data.text} />;
          }
        })}
      </ScrollView>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={{flex: 1, marginRight: 10, paddingHorizontal: 10}}
          placeholder="Enter Message"
          value={input}
          onChangeText={text => setInput(text)}
        />
        <Button
          title="Send"
          onPress={() => {
            sendMessage();
          }}
        />
      </View>
    </View>
  );
};

export default IndividualChat;

const styles = StyleSheet.create({});
