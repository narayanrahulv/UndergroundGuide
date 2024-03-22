import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {OtherLinesAtStopProps} from '../../dataFolder/appTypes';
import {lineColorMap} from '../../helpers/helpers';

const OtherLinesAtStop = (props: OtherLinesAtStopProps) => {
  const {lineModeGroups} = props;

  return (
    <View style={otherLinesAtStopStyles.textCellWithTopPadding}>
      {/* display available accessibility data */}
      {lineModeGroups
        .filter(m => m.modeName === 'tube')
        .map(li => {
          return li?.lineIdentifier.map(i => {
            return (
              <View
                style={{
                  backgroundColor: lineColorMap.get(i),
                }}
                key={i}>
                {lineColorMap.get(i) === 'yellow' ||
                  (lineColorMap.get(i) === 'pink' && (
                    <Text key={i} style={otherLinesAtStopStyles.blackText}>
                      {i}
                    </Text>
                  ))}
                {lineColorMap.get(i) !== 'yellow' &&
                  lineColorMap.get(i) !== 'pink' && (
                    <Text key={i} style={otherLinesAtStopStyles.whiteText}>
                      {i}
                    </Text>
                  )}
              </View>
            );
          });
        })}
    </View>
  );
};

export default OtherLinesAtStop;

const otherLinesAtStopStyles = StyleSheet.create({
  textCellWithTopPadding: {
    flex: 1,
    marginTop: 10,
  },
  whiteText: {
    color: 'white',
  },
  blackText: {
    color: 'black',
  },
});
