import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {LineSummaryDetailsProps} from '../dataFolder/appTypes';
import {tflAPIEndpoints} from '../dataFolder/undergroundLineData';
import useFetchData from '../hooks/useFetchData';

const LineSummaryDetails = (props: LineSummaryDetailsProps) => {
  const {lineSummary} = props;
  const {section} = props;

  //if section = status or serviceType, fetch line status data from TFL end point
  //build the API url that needs to be called
  let apiURL =
    tflAPIEndpoints.lineStatusEndpointUrl.prefix +
    lineSummary[0].name +
    tflAPIEndpoints.lineStatusEndpointUrl.suffix;

  //call the API via the useFetchData custom hook
  const {dataLoading, dataRetrieved} = useFetchData({
    apiURL: apiURL,
    section: section,
  });

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
            </>
          ))}
        </View>
      )}
      {/* line status summary */}
      {section === 'status' && dataRetrieved !== null && (
        <View style={lineSummaryDetailsStyles.contentcontainer}>
          {dataLoading ? (
            <Text>{'Retrieving line status'}</Text>
          ) : (
            <>
              <View style={lineSummaryDetailsStyles.summaryCell}>
                <Text>
                  {dataRetrieved[0]?.lineStatuses[0]?.statusSeverityDescription}
                </Text>
              </View>
              <View style={lineSummaryDetailsStyles.summaryCell}>
                <Text>{dataRetrieved[0]?.lineStatuses[0]?.reason}</Text>
              </View>
            </>
          )}
        </View>
      )}
      {/* line service types (i.e. regular/night service) summary: serviceType */}
      {section === 'serviceType' && dataRetrieved !== null && (
        <View style={lineSummaryDetailsStyles.contentcontainer}>
          {dataRetrieved[0]?.serviceTypes.map(st => (
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
