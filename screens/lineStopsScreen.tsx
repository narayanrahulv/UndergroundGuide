import React from 'react';
import {View} from 'react-native';
import LineStop from '../components/lineInfo/lineStop';

const LineStopsScreen = ({route}) => {
  const {lineName, color} = route.params;

  return (
    <View>
      <LineStop lineName={lineName} section={'lineStop'} color={color} />
    </View>
  );
};

export default LineStopsScreen;
