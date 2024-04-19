import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import LineStatusAndService from '../components/lineInfo/lineStatusAndService';

const LineStatusScreen = ({navigation, route}) => {
  const {lineName, color, statusHeadingText, serviceTypesHeadingText} =
    route.params;

  return (
    <View>
      <LineStatusAndService
        lineName={lineName}
        section={'lineStatus'}
        color={color}
        statusHeadingText={statusHeadingText}
        serviceTypesHeadingText={serviceTypesHeadingText}
      />
      {/* link to line stops */}
      <View style={lineStatusStyles.contentlinkcontainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('LineStops', {
              lineName: lineName,
              color: color,
            })
          }>
          <Text style={lineStatusStyles.linkText}>{'View stops'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const lineStatusStyles = StyleSheet.create({
  linkText: {fontWeight: 'bold', color: 'blue'},
  contentlinkcontainer: {
    marginTop: 50,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default LineStatusScreen;
