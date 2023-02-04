import React from 'react';
import { View, StyleSheet } from 'react-native';
import HorizontalList from '../lists/HorizontalList';
import data from '../../fakeData'

const CompanyJobs = ({ }) => {

  return <HorizontalList data={data} />;
};


export default CompanyJobs;
