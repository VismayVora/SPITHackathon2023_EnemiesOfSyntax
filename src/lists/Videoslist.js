import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import VideoCard from '../cards/VideoCard';

const VideosList = ({data }) => {
  return (
    <>
      <View style={styles.listStyle}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <VideoCard
              item={item}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    margin:5
  },
});

export default VideosList;
