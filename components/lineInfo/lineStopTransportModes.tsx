import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {LineStopsTransportModesProps} from '../../dataFolder/appTypes';

const LineStopTransportModes = (props: LineStopsTransportModesProps) => {
  const {modes} = props;

  return (
    <View style={lineStopsTransportModesStyles.textCellWithTopPadding}>
      {/* transport mode data is not available */}
      {modes.length === 0 && <Text>{'No transport mode data available'}</Text>}
      {/* display available transport mode data */}
      {modes.map(m => {
        return <Text key={m}>{m}</Text>;
      })}
    </View>
  );
};

export default LineStopTransportModes;

const lineStopsTransportModesStyles = StyleSheet.create({
  textCellWithTopPadding: {
    flex: 1,
    marginTop: 10,
  },
});
