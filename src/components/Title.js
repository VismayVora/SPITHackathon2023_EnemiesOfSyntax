import React from 'react';
import { Text } from 'react-native';

const Title = ({ children, numberOfLines = 2, size = 20}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{ fontWeight: '500',color: '#000000' ,fontSize: size , alignContent: 'center', alignSelf : 'center', justifyContent: 'center' }}
    >
      {children}
    </Text>
  );
};

export default Title;
