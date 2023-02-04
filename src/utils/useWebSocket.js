import {useEffect, useState, useContext} from 'react';
import io from 'socket.io-client';

export const useWebSockets = ({roomId, enabled, sender}) => {
  const [messages, setMessages] = useState([
    {
      text: 'hey',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'Test User',
        avatar: 'https://pbs.twimg.com/media/D8dDZukXUAAXLdY.jpg',
      },
    },
    {
      text: 'hello there',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'NGO1',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&usqp=CAU',
      },
    },
    {
      text: 'What is this event about ?',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'Test User',
        avatar: 'https://pbs.twimg.com/media/D8dDZukXUAAXLdY.jpg',
      },
    },
    {
      text: 'So basically , it is a charity based event to collect donations and funds to help the underprivilidged',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'NGO1',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&usqp=CAU',
      },
    },
  ]);
  const input = 'send-chat-message';
  const output = 'chat-message';
  const socket = io('base');

  const send = messages => {
    if (messages.trim() === '') {
      return;
    }

    socket.emit(input, messages);
    setMessages(m => [
      {
        text: messages,
        createdAt: new Date(),
      },
      ...m,
    ]);
  };

  //   const fetchFromDevice = async () => {
  //     try {
  //       let res = await StorageManager.get(roomId);
  //       if (res === undefined) {
  //         return [];
  //       }

  //       return res;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(async () => {
  //     try {
  //       setMessages(await fetchFromDevice());

  //       let prior = await getAllChats(roomId);
  //       prior = prior
  //         .map(i => backendToGifted(i))
  //         .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  //       setMessages(prior);
  //       console.log(prior);
  //       await StorageManager.put(roomId, prior);
  //     } catch (e) {
  //       console.log('Error in getting previous chats');
  //     }
  //   }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    setMessages(m => m.reverse());
    socket.on(output, msg => {
      setMessages(prev => [
        {
          text: msg.message,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: msg.sender,
            avatar:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&usqp=CAU',
          },
        },
        ...prev,
      ]);
    });

    return () => socket.disconnect();
  }, [enabled, roomId]);

  return {
    send,
    messages,
  };
};
