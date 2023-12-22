import {Text, View, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  LineSummaryDetailsProps,
  HighLevelLineStatus,
} from '../dataFolder/appTypes';
import {tflAPIEndpoints} from '../dataFolder/undergroundLineData';

const LineSummaryDetails = (props: LineSummaryDetailsProps) => {
  const {lineSummary} = props;
  const {section} = props;

  const initLineStatus: HighLevelLineStatus[] = [];

  const [lineStatusLoading, setLineStatusLoading] = useState(true);
  const [lineStatusData, setLineStatusData] = useState(initLineStatus);

  //if section = status, fetch line status data from TFL end point once and save it in state for subsequent returns
  //build the API url that needs to be called
  let apiURL =
    tflAPIEndpoints.lineStatusEndpointUrl.prefix +
    lineSummary[0].name +
    tflAPIEndpoints.lineStatusEndpointUrl.suffix;

  //call the API
  useEffect(() => {
    fetch(apiURL)
      .then(resp => resp.json())
      .then(data => setLineStatusData(data))
      .catch(error => console.error(error))
      .finally(() => setLineStatusLoading(false));
  }, [apiURL]);

  return (
    <>
      {/* basic line summary */}
      {section === 'basic' && (
        <View style={lineSummaryDetailsStyles.contentcontainer}>
          {Object.keys(lineSummary).map(key => (
            <>
              <View key={key} style={lineSummaryDetailsStyles.summaryCell}>
                <Text>{lineSummary[0].name}</Text>
              </View>
              <View
                key={key}
                style={[
                  lineSummaryDetailsStyles.summaryCell,
                  {backgroundColor: lineSummary[0].color},
                ]}
              />
              <View key={key} style={lineSummaryDetailsStyles.summaryCell}>
                <Text>{lineSummary[0].direction}</Text>
              </View>
            </>
          ))}
        </View>
      )}
      {/* line status summary */}
      {section === 'status' && (
        <View style={lineSummaryDetailsStyles.contentcontainer}>
          {lineStatusLoading ? (
            <Text>{'Retrieving line status'}</Text>
          ) : (
            <>
              <View style={lineSummaryDetailsStyles.summaryCell}>
                <Text>
                  {
                    lineStatusData[0]?.lineStatuses[0]
                      ?.statusSeverityDescription
                  }
                </Text>
              </View>
              <View style={lineSummaryDetailsStyles.summaryCell}>
                <Text>{lineStatusData[0]?.lineStatuses[0]?.reason}</Text>
              </View>
            </>
          )}
        </View>
      )}
      {/* line service types (i.e. regular/night service) summary: serviceType */}
      {section === 'serviceType' && (
        <View style={lineSummaryDetailsStyles.contentcontainer}>
          {lineStatusData[0]?.serviceTypes.map(st => (
            <View style={lineSummaryDetailsStyles.summaryCell}>
              <Text>{st.name}</Text>
            </View>
          ))}
        </View>
      )}
    </>
  );
};

export default LineSummaryDetails;

const lineSummaryDetailsStyles = StyleSheet.create({
  summaryCell: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  summaryText: {fontWeight: 'bold'},
  contentcontainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
});
