import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {LineStopsAccessibilityProps} from '../../dataFolder/appTypes';

const LineStopAccessibility = (props: LineStopsAccessibilityProps) => {
  const {additionalProperties} = props;

  return (
    <View style={lineStopsAccessibilityStyles.textCellWithTopPadding}>
      {/* accessibility data is not available */}
      {additionalProperties.length === 0 && (
        <Text>{'No accessibility data available'}</Text>
      )}
      {/* display available accessibility data */}
      {additionalProperties.map(ap => {
        return (
          <View style={lineStopsAccessibilityStyles.rowContainer} key={ap.key}>
            <View style={lineStopsAccessibilityStyles.rowCell}>
              <Text>{ap.key}</Text>
            </View>
            <View style={lineStopsAccessibilityStyles.rowCell}>
              <Text>{ap.value}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default LineStopAccessibility;

const lineStopsAccessibilityStyles = StyleSheet.create({
  textCellWithTopPadding: {
    flex: 1,
    marginTop: 10,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  rowCell: {
    flex: 1,
  },
});
