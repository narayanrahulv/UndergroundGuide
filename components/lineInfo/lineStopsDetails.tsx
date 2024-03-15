import {Text, View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {LineStopsProps} from '../../dataFolder/appTypes';
import {tflAPIEndpoints} from '../../dataFolder/undergroundLineData';
import {useFetchData} from '../../hooks/useFetchData';
import {useFetchHookReturnedData} from '../../dataFolder/appTypes';
import {isStopPoint} from '../../helpers/helpers';
import LineNameAndColorPanel from '../../components/lineInfo/lineNameAndColorPanel';

//can navigatge here from lineSummaryDetails via a button that says "see stops on this line"
const LineStopsDetails = (props: LineStopsProps) => {
  const {lineName, color, section} = props;

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
              {/* line stops header */}
              <LineNameAndColorPanel
                name={lineName ?? 'not found'}
                color={color ?? ''}
              />
              <ScrollView>
                {stopsData.dataRetrieved.map(s => {
                  return (
                    <View
                      style={lineStopsPanelStyles.boxSimple}
                      key={s?.commonName}>
                      <View style={lineStopsPanelStyles.textCell}>
                        <Text>{s?.commonName}</Text>
                      </View>
                      <View style={lineStopsPanelStyles.textCellWithTopPadding}>
                        <Text style={lineStopsPanelStyles.boldtext}>
                          {'Modes of transport at this station'}
                        </Text>
                      </View>
                      <View style={lineStopsPanelStyles.textCellWithTopPadding}>
                        {s?.modes.map(m => {
                          return <Text key={m}>{m}</Text>;
                        })}
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
    flexDirection: 'column',
  },
  textCell: {
    flex: 1,
  },
  textCellWithTopPadding: {
    flex: 1,
    marginTop: 10,
  },
  boldtext: {
    fontWeight: 'bold',
  },
});
