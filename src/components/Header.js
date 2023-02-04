import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {Title, useTheme} from 'react-native-paper';

const Header = ({title, showBack}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <View style={{flexDirection: 'row', marginBottom: 10}}>
      {showBack && (
        <Ionicons
          name="arrow-back"
          style={{fontSize: 25, color: colors.text, marginRight: 15}}
          onPress={navigation.goBack}
        />
      )}
      <Title style={{fontSize: 24}}>{title}</Title>
    </View>
  );
};

export default Header;
