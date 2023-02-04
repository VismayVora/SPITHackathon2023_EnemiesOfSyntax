import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Share} from 'react-native';
import {Card, Subheading, Paragraph, useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BlogCard = ({blog}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey! there,\n this blog "${blog.title}"posted on ${new Date(
          blog.createdAt,
        ).toLocaleDateString()} is quite interesting do check It out :)`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const [didLike, setDidLike] = useState(false);

  return (
    <Card style={{marginTop: 15}}>
      <Card.Cover
        source={{
          uri: blog.image,
        }}
      />
      <Card.Content>
        <View style={styles.section}>
          <Subheading style={{fontWeight: 'bold', fontSize: 16, width: '80%'}}>
            {blog.title}
          </Subheading>
          <View
            style={{
              flexDirection: 'row',
              width: '15%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <FontAwesome
              name={didLike ? 'heart' : 'heart-o'}
              color={didLike ? 'red' : colors.text}
              onPress={() => {
                setDidLike(l => !l);
              }}
              size={20}
            />
            <Paragraph>{didLike ? blog.likes + 1 : blog.likes}</Paragraph>
          </View>
        </View>

        <Paragraph style={{color: colors.textBefore}}>
          By. {blog.createdBy}
        </Paragraph>
      </Card.Content>
      <View
        style={{
          ...styles.section,
          width: '70%',
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={onShare}
          style={{...styles.section, width: '25%', alignSelf: 'center'}}>
          <Ionicons
            name={'share-social-outline'}
            style={{
              fontSize: 26,
              color: colors.text,
            }}
          />
          <Paragraph style={{fontSize: 16}}>Share</Paragraph>
        </TouchableOpacity>
        <Button
          title={'Read More'}
          style={'solid'}
          onPress={() => navigation.navigate('BlogDetail', {blog})}
          buttonStyle={{
            backgroundColor: colors.disabled,
            height: 50,
            width: 120,
            borderRadius: 30,

            alignSelf: 'flex-end',
          }}
          titleStyle={{
            fontWeight: 'bold',
            fontSize: 18,
          }}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  info: {
    height: 40,
    width: '45%',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default BlogCard;
