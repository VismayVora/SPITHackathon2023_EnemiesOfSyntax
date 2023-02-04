import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SmallCard from '../cards/SmallCard';
const HorizontalList = ({data }) => {
  return (
    <>
      <View style={styles.listStyle}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <SmallCard
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

export default HorizontalList;
