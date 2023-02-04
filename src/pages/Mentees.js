/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {Card} from '../components/MentorMentees';
import {SearchBar} from '../components/SearchBar';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CardMentees } from '../components/MentorMentees/CardMentees';
const Mentees = ({navigation}) => {
  const [person, setPerson] = useState(['']);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [mentors, setMentors] = useState([]);
  const {user} = useSelector(state => state.user);
  useEffect(() => {
    if (text === '') getMentorsList();
  }, [text]);
  const getMentorsList = async () => {
    setLoading(true);
    console.log(user?.token);
    var config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/account/startups_list/',
      headers: {
        Authorization: `Token ${user?.token}`,
        Cookie:
          'csrftoken=o4q1Ihf3JTBVbPIRuFvCtHZVT3RHp0X8; sessionid=0rx0ut9910ocx5ggaz1l6en6khbzxg1n',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setMentors(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getSearchedMentors = async () => {
    var data = new FormData();
    data.append('expertise', 'Tech');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Token ${user?.token}`);
    myHeaders.append(
      'Cookie',
      'csrftoken=o4q1Ihf3JTBVbPIRuFvCtHZVT3RHp0X8; sessionid=0rx0ut9910ocx5ggaz1l6en6khbzxg1n',
    );
    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/account/search_startups/',
      headers: myHeaders,
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setMentors(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const renderItem = ({item}) => {
    return <CardMentees navigation={navigation} data={item} />;
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignSelf: 'center',
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {width: 3, height: 3},
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 1,
      }}>
      <StatusBar backgroundColor="black" />
      <View style={styles.searchView}>
        <SearchBar
          onSearch={text => setText(text)}
          value={text}
          placeHolder="Search in mentors by name..."
          placeHolderTextColor="black"
        />
        <AntDesign
          onPress={() => {
            getSearchedMentors();
          }}
          name="search1"
          size={30}
        />
      </View>
      {loading ? (
        <View style={{marginVertical: 10}}>
          <ActivityIndicator size="large" color="#32475b" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={mentors}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            numColumns={2}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  headerText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#ffc400',
  },
  textInput: {
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
  },
  searchView: {
    marginVertical: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export {Mentees};
