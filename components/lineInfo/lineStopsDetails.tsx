import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {LineStopsProps, LineStops} from '../../dataFolder/appTypes';
import {tflAPIEndpoints} from '../../dataFolder/undergroundLineData';
import useFetchData from '../../hooks/useFetchData';

//can navigatge here from lineSummaryDetails via a button that says "see stops on this line"
const LineStopsDetails = (props: LineStopsProps) => {
  const {lineName, section} = props;

  //if we have a value passed in for lineName, we will set a URL to call the API to retrieve stop points on the line
  let apiURL =
    tflAPIEndpoints.lineStopsSequenceUrl.prefix +
    lineName +
    tflAPIEndpoints.lineStopsSequenceUrl.suffix +
    'inbound';

  //call the API via the useFetchData custom hook
  const {dataLoading, dataRetrieved} = useFetchData({
    apiURL: apiURL,
    section: section,
  });
  // useEffect(() => {
  //   fetch(apiURL)
  //     .then(resp => resp.json())
  //     .then(data => setLineStops(data))
  //     .catch(error => console.error(error));
  // }, [apiURL]);

  console.log('++++++');
  console.log(JSON.stringify(dataRetrieved));
  console.log('++++++');

  return (
    <View>
      <Text>{'list of stops'}</Text>
    </View>
  );
};

export default LineStopsDetails;
