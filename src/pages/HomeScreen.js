import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import EventCard from '../components/EventCard';
import Header from '../components/Header';

const HomeScreen = () => {
  const [events, setEvents] = useState([
    {
      _id: 1,
      name: "Neelam's Life's Mission Is To Give Abandoned People With Disabilities Love & Respect, Join Her",
      description:
        "Neelam's Life's Mission Is To Give Abandoned People With Disabilities Love & Respect, Join Her Neelam's Life's Mission Is To Give Abandoned People With Disabilities Love & Respect, Join Her",
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9HMDplkER-A9s2Z1V8Ay79sIs3MPVw9V-Zw&usqp=CAU',
      createdBy: 'Lorem Ipsum',
      targetAmount: 1000000,
      collectedAmount: 900000,
      event_date: new Date().toString(),
      contributors: 100,
      subEvents: ['Intro', 'Do-work', 'Come Back'],
      targetVolunteers: 100,
      registeredVolunteers: 10,
      address: 'test building , Test Lane , test city :- 8797383 ',
      latitude: -21.25653,
      longitude: -100.84926,
    },
    {
      _id: 2,
      name: "Neelam's Life's Mission Is To Give Abandoned People With Disabilities Love & Respect, Join Her",
      description:
        "Neelam's Life's Mission Is To Give Abandoned People With Disabilities Love & Respect, Join Her Neelam's Life's Mission Is To Give Abandoned People With Disabilities Love & Respect, Join Her",
      image: 'https://thelogicalindian.com/h-upload/2020/01/27/152340-10-1.jpg',
      createdBy: 'Lorem Ipsum',
      targetAmount: 9000000,
      collectedAmount: 700000,
      event_date: new Date().toString(),
      contributors: 50,
      subEvents: ['Intro', 'Do-work', 'Come Back'],
      targetVolunteers: 80,
      registeredVolunteers: 7,
      address: 'test building , Test Lane , test city :- 8797383 ',
      latitude: 19.1061636,
      longitude: 72.8369622,
    },
  ]);

  return (
    <View style={styles.container}>
      <Header title={'Events'} />
      <FlatList
        data={events}
        keyExtractor={(x, i) => i.toString()}
        renderItem={({item}) => <EventCard event={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default HomeScreen;
