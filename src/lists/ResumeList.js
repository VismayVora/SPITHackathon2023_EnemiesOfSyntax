import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ResumeCard from '../cards/ResumeCard';
const ResumeList = ({data }) => {
  return (
    <>
      <View style={styles.listStyle}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ResumeCard
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

export default ResumeList;
