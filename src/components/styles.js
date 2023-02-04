import {StyleSheet} from 'react-native';
import { height, width} from '../Consts';

const styles = StyleSheet.create({
  incomingMsgBox: {
    backgroundColor: 'white',
    maxWidth: '70%',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  container:{
    flex:1,
    backgroundColor: 'white',
    margin:10
  },
  incomingMsgText: {color: 'black', fontSize: 16},

  sentMsgBox: {
    backgroundColor: 'green',
    maxWidth: '80%',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 5,
  },

  sentMsgText: {color: '#fff', fontSize: 16},

  typeMsgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  
  },

  typeMsgBox: {
    borderWidth: 0.8,
    borderColor: 'grey',
 backgroundColor: 'white',
    width: width*0.80,
    borderRadius: 20,
    margin:5
  },

  sendBtn: {
    width: width*0.13,
    alignItems: 'center',
    justifyContent: 'center',
 borderRadius: 10,
    margin:2

  },
  send: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: height * 0.035,

},

  sendTxt: {color: 'white'},
});

export default styles;