import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {LineSummaryHeaderProps} from '../dataFolder/appTypes';

const LineSummaryHeader = (props: LineSummaryHeaderProps) => {
  const {headingText} = props;

  return (
    <View style={lineSummaryHeaderStyles.contentheadercontainer}>
      {headingText.map(text => {
        return (
          <View style={lineSummaryHeaderStyles.headerCell}>
            <Text style={lineSummaryHeaderStyles.headerText}>{text}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default LineSummaryHeader;

const lineSummaryHeaderStyles = StyleSheet.create({
  headerCell: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  headerText: {fontWeight: 'bold'},
  contentheadercontainer: {
    marginTop: 60,
    flexDirection: 'row',
  },
});
