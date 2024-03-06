import React from 'react';
import {View} from 'react-native';
import LineStopsDetails from '../components/lineInfo/lineStopsDetails';

const LineStopsScreen = ({route}) => {
  const {lineName} = route.params;

  return (
    <View>
      <LineStopsDetails lineName={lineName} />
    </View>
  );
};

export default LineStopsScreen;
