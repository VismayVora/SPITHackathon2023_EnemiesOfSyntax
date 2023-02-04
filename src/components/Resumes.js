import React from 'react';
import { View, StyleSheet } from 'react-native';
import ResumeList from '../lists/ResumeList';
import data from '../../fakeData'

const Resumes = ({ }) => {

  return <ResumeList data={data} />;
};


export default Resumes;
