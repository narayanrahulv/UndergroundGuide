import {Text, View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {LineStopsProps} from '../../dataFolder/appTypes';
import {tflAPIEndpoints} from '../../dataFolder/undergroundLineData';
import {useFetchData} from '../../hooks/useFetchData';
import {useFetchHookReturnedData} from '../../dataFolder/appTypes';
import {isStopPoint} from '../../helpers/helpers';

//can navigatge here from lineSummaryDetails via a button that says "see stops on this line"
const LineStopsDetails = (props: LineStopsProps) => {
  const {lineName, section} = props;

  //if we have a value passed in for lineName, we will set a URL to call the API to retrieve stop points on the line
  let apiURL =
    tflAPIEndpoints.lineStopsSequenceUrl.prefix +
    lineName +
    tflAPIEndpoints.lineStopsSequenceUrl.suffix;

  //call the API via the useFetchData custom hook
  const stopsData: useFetchHookReturnedData = useFetchData({
    apiURL: apiURL,
    section: section,
  });

  return (
    <>
      {/* stop points are only shown if we have a value for dataRetrieved */}
      {stopsData.dataRetrieved && stopsData.dataRetrieved.length > 0 && (
        <>
          {isStopPoint(stopsData.dataRetrieved) && (
            <>
              <ScrollView>
                {stopsData.dataRetrieved.map(s => {
                  return (
                    <View
                      style={lineStopsPanelStyles.boxSimple}
                      key={s?.commonName}>
                      <View style={lineStopsPanelStyles.textCell}>
                        <Text>{s?.commonName}</Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </>
          )}
        </>
      )}
    </>
  );
};

export default LineStopsDetails;

const lineStopsPanelStyles = StyleSheet.create({
  boxSimple: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    margin: 20,
    flexDirection: 'row',
  },
  textCell: {
    flex: 1,
  },
});
