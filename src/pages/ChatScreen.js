import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/Header';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {useTheme} from 'react-native-paper';
import {useWebSockets} from '../utils/useWebSocket';

const ChatScreen = () => {
  const {colors} = useTheme();
  const [text, setText] = useState('');
  const {messages, send} = useWebSockets({
    enabled: true,
  });

  // const onSend = useCallback((messages = []) => {
  //   send('Text', messages);
  // }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: colors.primary,
            marginVertical: 5,
          },
          left: {
            backgroundColor: '#fff',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: colors.text,
          },
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header showBack={true} title={'NGO1'} />
      <GiftedChat
        messages={messages}
        onSend={messages => send(messages[messages.length - 1].text)}
        showAvatarForEveryMessage={true}
        //placeholder="Type your message here..."
        //renderInputToolbar={renderInputToolbar}
        user={{
          // _id: currentUser._id,
          // name: currentUser.name,
          // avatar: currentUser.profile,
        }}
        renderBubble={renderBubble}
        multiline={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {},
});

export default ChatScreen;
