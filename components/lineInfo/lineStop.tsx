import {Text, View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {LineStopsProps} from '../../dataFolder/appTypes';
import {tflAPIEndpoints} from '../../dataFolder/undergroundLineData';
import {LineNameAndColorPanel} from '../../components/lineInfo';
import {OtherLinesAtStop} from '../lineInfo';
import {LineStopTransportModes} from '../lineInfo';
import {LineStopAccessibility} from '../lineInfo';
import {useFetchData} from '../../hooks';
import {StopPoint} from '../../dataFolder/models/stopPointsModels';

//can navigatge here from lineSummaryDetails via a button that says "see stops on this line"
const LineStop = (props: LineStopsProps) => {
  const {lineName, color, section} = props;

  //if we have a value passed in for lineName, we will set a URL to call the API to retrieve stop points on the line
  let apiURL =
    tflAPIEndpoints.lineStopsSequenceUrl.prefix +
    lineName +
    tflAPIEndpoints.lineStopsSequenceUrl.suffix;

  const {isLoading, error, data} = useFetchData({
    apiURL: apiURL,
    section: section,
  });

  const displayData: StopPoint[] = data?.data;

  return (
    <>
      {/* if we encounter an error while retrieving data, display an error message */}
      {error && (
        <View style={lineStopsPanelStyles.boxSimple}>
          <Text>{'Something went wrong while retrieving data'}</Text>
        </View>
      )}

      {isLoading ? (
        // display loading message if applicable
        <View style={lineStopsPanelStyles.boxSimple}>
          <Text>{'Retrieving line stops information'}</Text>
        </View>
      ) : (
        <>
          {/* stop points are only shown if we have a value for dataRetrieved  */}
          {displayData && (
            <>
              {/* line stops header */}
              <LineNameAndColorPanel
                name={lineName ?? 'not found'}
                color={color ?? ''}
              />
              <ScrollView>
                {displayData.map(s => {
                  return (
                    <View
                      style={lineStopsPanelStyles.boxSimple}
                      key={s?.commonName}>
                      <View style={lineStopsPanelStyles.textCell}>
                        <Text style={lineStopsPanelStyles.stationNameText}>
                          {s?.commonName}
                        </Text>
                      </View>

                      {/* modes of transport available at stop eg: tube/bus */}
                      <View style={lineStopsPanelStyles.textCellWithTopPadding}>
                        <Text style={lineStopsPanelStyles.boldtext}>
                          {'Modes of transport at this station'}
                        </Text>
                      </View>
                      <LineStopTransportModes modes={s?.modes} />
                      <View style={lineStopsPanelStyles.textCellWithTopPadding}>
                        <Text style={lineStopsPanelStyles.boldtext}>
                          {'Lines serving this station'}
                        </Text>
                      </View>
                      <OtherLinesAtStop lineModeGroups={s?.lineModeGroups} />
                      {/* accessibility available at this station */}
                      <View style={lineStopsPanelStyles.textCellWithTopPadding}>
                        <Text style={lineStopsPanelStyles.boldtext}>
                          {'Accessibility at this station'}
                        </Text>
                      </View>
                      <LineStopAccessibility
                        additionalProperties={s?.additionalProperties.filter(
                          a =>
                            a.category.toLowerCase() === 'accessibility' &&
                            (a.key.toLowerCase() === 'accessvialift' ||
                              a.key.toLowerCase() === 'limitedcapacitylift' ||
                              a.key.toLowerCase() === 'toilet'),
                        )}
                      />
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

export default LineStop;

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
  contentlinkcontainer: {
    marginTop: 50,
    textAlign: 'center',
    alignSelf: 'center',
  },
  textCellWithTopPadding: {
    flex: 1,
    marginTop: 10,
  },
  boldtext: {
    fontWeight: 'bold',
  },
  stationNameText: {fontWeight: 'bold', color: 'darkgreen'},
  linkText: {fontWeight: 'bold', color: 'blue'},
});
