import React from 'react';
import { View, StyleSheet } from 'react-native';
import HorizontalList from '../lists/HorizontalList';
import data from '../../fakeData'
import VideosList from '../lists/Videoslist';

const YoutubeVideos = ({ }) => {

  return <VideosList data={data} />;
};


export default YoutubeVideos;
