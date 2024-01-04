/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {
  undergroundLineDetails,
  basicLineSummaryHeadings,
  lineStatusSummaryHeadings,
  lineServiceTypesHeadings,
  tflAPIEndpoints,
} from '../dataFolder/undergroundLineData';
import {highLevelLineDetails} from '../dataFolder/appTypes';
import LineSummaryHeader from '../components/lineSummaryHeader';
import LineSummaryDetails from '../components/lineSummaryDetails';
// import LineStopsDetails from '../components/lineStopsDetails';
import useFetchData from '../hooks/useFetchData';

const MainScreen = () => {
  //get line names from TFL API end point
  let lineNamesUrl = tflAPIEndpoints.lineNamesUrl.url;

  const {dataRetrieved} = useFetchData({
    apiURL: lineNamesUrl,
    section: 'basic',
  });

  let lineNames: string[] = [];

  dataRetrieved?.forEach(line => {
    lineNames.push(line.id);
  });

  const lineDetailsInitState: highLevelLineDetails[] = [
    {
      name: 'select a line',
      color: 'none',
      direction: 'select a line',
    },
  ];

  const emptyLineDetails: highLevelLineDetails = {
    name: 'not found',
    color: 'beige',
    direction: 'not found',
  };

  const [lineDetails, setLineDetails] = useState(lineDetailsInitState);

  const processChoice = (selectedLine: string) => {
    //filter undergroundLineDetails to provide further information on selectedLine value
    const selectedLineDetails = undergroundLineDetails.filter(
      l => l.name === selectedLine,
    );

    setLineDetails(selectedLineDetails ?? [emptyLineDetails]);
  };

  return (
    <>
      <View style={mainScreenStyles.maincontainer}>
        {/* line selection section */}
        <View style={mainScreenStyles.topredcontainer} />
        <View style={mainScreenStyles.topcontainer}>
          <View style={mainScreenStyles.textcontainer}>
            <Text>{'Pick a line to get more information about it'}</Text>
          </View>
          <View style={mainScreenStyles.dropdowncontainer}>
            <SelectDropdown data={lineNames} onSelect={processChoice} />
          </View>
        </View>
        <View style={mainScreenStyles.topbluecontainer} />
        {/* =============================================== */}
        {/* line details/summary section */}
        <LineSummaryHeader headingText={basicLineSummaryHeadings} />
        <LineSummaryDetails lineSummary={lineDetails} section={'basic'} />
        <LineSummaryHeader headingText={lineStatusSummaryHeadings} />
        <LineSummaryDetails lineSummary={lineDetails} section={'status'} />
        <LineSummaryHeader headingText={lineServiceTypesHeadings} />
        <LineSummaryDetails lineSummary={lineDetails} section={'serviceType'} />
        {/* =============================================== */}
        {/* line stops section */}
        {/* <LineStopsDetails lineId={'victoria'} /> */}
      </View>
    </>
  );
};

export default MainScreen;

const mainScreenStyles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'column',
    borderWidth: 1,
  },
  topcontainer: {
    backgroundColor: 'beige',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  topredcontainer: {
    width: '100%',
    height: 20,
    backgroundColor: 'red',
  },
  topbluecontainer: {
    width: '100%',
    height: 20,
    backgroundColor: 'blue',
  },
  textcontainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  dropdowncontainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  contentheadercontainer: {
    marginTop: 60,
    flexDirection: 'row',
  },
  contentcontainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
});
