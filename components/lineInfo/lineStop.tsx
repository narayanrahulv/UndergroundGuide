import {Text, View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {LineStopsProps} from '../../dataFolder/appTypes';
import {tflAPIEndpoints} from '../../dataFolder/undergroundLineData';
import {useFetchData} from '../../hooks/useFetchData';
import {useFetchHookReturnedData} from '../../dataFolder/appTypes';
import {isStopPoint, lineColorMap} from '../../helpers/helpers';
import LineNameAndColorPanel from '../../components/lineInfo/lineNameAndColorPanel';
import LineStopTransportModes from '../lineInfo/lineStopTransportModes';
import LineStopAccessibility from '../lineInfo/lineStopAccessibility';

//can navigatge here from lineSummaryDetails via a button that says "see stops on this line"
const LineStop = (props: LineStopsProps) => {
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
                      {/* stop common name */}
                      <View style={lineStopsPanelStyles.textCell}>
                        <Text style={lineStopsPanelStyles.stationNameText}>
                          {s?.commonName}
                        </Text>
                      </View>
                      {/* modes of transport avaiilable at stop eg: tube/bus */}
                      <View style={lineStopsPanelStyles.textCellWithTopPadding}>
                        <Text style={lineStopsPanelStyles.boldtext}>
                          {'Modes of transport at this station'}
                        </Text>
                      </View>
                      <LineStopTransportModes modes={s?.modes} />
                      <View style={lineStopsPanelStyles.textCellWithTopPadding}>
                        <Text style={lineStopsPanelStyles.boldtext}>
                          {'Other lines at this station'}
                        </Text>
                      </View>
                      <View style={lineStopsPanelStyles.textCellWithTopPadding}>
                        <>
                          {s?.lineModeGroups
                            .filter(m => m.modeName === 'tube')
                            .map(li => {
                              return li?.lineIdentifier.map(i => {
                                return (
                                  <>
                                    <View
                                      style={{
                                        backgroundColor: lineColorMap.get(i),
                                      }}
                                      key={i}>
                                      {lineColorMap.get(i) === 'yellow' ||
                                        (lineColorMap.get(i) === 'pink' && (
                                          <Text
                                            key={i}
                                            style={{color: 'black'}}>
                                            {i}
                                          </Text>
                                        ))}
                                      {lineColorMap.get(i) !== 'yellow' &&
                                        lineColorMap.get(i) !== 'pink' && (
                                          <Text
                                            key={i}
                                            style={{color: 'white'}}>
                                            {i}
                                          </Text>
                                        )}
                                    </View>
                                  </>
                                );
                              });
                            })}
                        </>
                      </View>
                      {/* accessibility available at this station */}
                      <View style={lineStopsPanelStyles.textCellWithTopPadding}>
                        <Text style={lineStopsPanelStyles.boldtext}>
                          {'Accessibility at this station'}
                        </Text>
                      </View>
                      <View style={lineStopsPanelStyles.textCellWithTopPadding}>
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
