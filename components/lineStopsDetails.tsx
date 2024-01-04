import {Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {LineStopsProps, LineStops} from '../dataFolder/appTypes';
import {tflAPIEndpoints} from '../dataFolder/undergroundLineData';
//can navigatge here from lineSummaryDetails via a button that says "see stops on this line"
const LineStopsDetails = (props: LineStopsProps) => {
  const {lineId} = props;

  const initLineStops: LineStops = {
    lineId: '',
    lineName: '',
    direction: '',
    stations: [],
  };
  const [lineStopsData, setLineStops] = useState(initLineStops);

  //build the API url to get all the stops on this line
  let apiURL =
    tflAPIEndpoints.lineStopsSequenceUrl.prefix +
    lineId +
    tflAPIEndpoints.lineStopsSequenceUrl.suffix +
    'inbound';

  //call the API
  useEffect(() => {
    fetch(apiURL)
      .then(resp => resp.json())
      .then(data => setLineStops(data))
      .catch(error => console.error(error));
  }, [apiURL]);

  console.log('++++++');
  console.log(JSON.stringify(lineStopsData.stations[1]?.name));
  console.log('++++++');

  return (
    <View>
      <Text>{'list of stops'}</Text>
    </View>
  );
};

export default LineStopsDetails;
