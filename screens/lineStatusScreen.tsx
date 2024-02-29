import React from 'react';
import {View} from 'react-native';
import LineStatusAndService from '../components/lineInfo/lineStatusAndService';

const LineStatusScreen = ({route}) => {
  const {lineName, color, statusHeadingText, serviceTypesHeadingText} = route.params;

  return (
    <View>
      <LineStatusAndService
        lineName={lineName}
        color={color}
        statusHeadingText={statusHeadingText}
        serviceTypesHeadingText={serviceTypesHeadingText}
      />
    </View>
  );
};

export default LineStatusScreen;
