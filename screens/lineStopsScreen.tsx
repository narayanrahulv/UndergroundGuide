import React from 'react';
import {View} from 'react-native';
import LineStopsDetails from '../components/lineInfo/lineStopsDetails';

const LineStopsScreen = ({route}) => {
  const {lineName, color} = route.params;

  return (
    <View>
      <LineStopsDetails lineName={lineName} color={color} />
    </View>
  );
};

export default LineStopsScreen;
