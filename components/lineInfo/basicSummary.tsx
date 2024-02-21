import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {LineSummaryProps} from '../../dataFolder/appTypes';

const BasicSummary = (props: LineSummaryProps) => {
  const {lineDetails, basicDetailsHeadingText} = props;

  return (
    <>
      {/* basic summary heading text */}
      <View style={basicSummaryStyles.contentheadercontainer}>
        {basicDetailsHeadingText?.map(text => {
          return (
            <View style={basicSummaryStyles.headerCell}>
              <Text style={basicSummaryStyles.headerText}>{text}</Text>
            </View>
          );
        })}
      </View>
      {/* basic summary */}
      <View style={basicSummaryStyles.contentcontainer}>
        {Object.keys(lineDetails).map(key => (
          <>
            <View key={key} style={basicSummaryStyles.summaryCell}>
              <Text>{lineDetails[0].name}</Text>
            </View>
            <View
              key={key}
              style={[
                basicSummaryStyles.summaryCell,
                {backgroundColor: lineDetails[0].color},
              ]}
            />
          </>
        ))}
      </View>
    </>
  );
};

export default BasicSummary;

const basicSummaryStyles = StyleSheet.create({
  headerCell: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  headerText: {fontWeight: 'bold'},
  contentheadercontainer: {
    marginTop: 60,
    flexDirection: 'row',
  },
  summaryCell: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  summaryText: {fontWeight: 'bold'},
  contentcontainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
});
