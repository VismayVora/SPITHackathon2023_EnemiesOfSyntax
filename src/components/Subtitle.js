import React from 'react';
import { Text } from 'react-native';

const Subtitle = ({ children, numberOfLines = 2, size = 13 }) => {
  return (
    <Text numberOfLines={numberOfLines} style={{ fontWeight: '400', fontSize: size , alignSelf : 'center'}}>
      {children}
    </Text>
  );
};

export default Subtitle;
