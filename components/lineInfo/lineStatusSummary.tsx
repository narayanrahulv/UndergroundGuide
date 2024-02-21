import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {tflAPIEndpoints} from '../../dataFolder/undergroundLineData';
import useFetchData from '../../hooks/useFetchData';
import {LineSummaryProps} from '../../dataFolder/appTypes';

const ServiceTypeSummary = (props: LineSummaryProps) => {
  const {lineDetails, section, statusHeadingText, serviceTypesHeadingText} =
    props;

  //if we have a value passed in for lineDetails, we will set a URL to call the API
  let apiURL = lineDetails
    ? tflAPIEndpoints.lineStatusEndpointUrl.prefix +
      lineDetails[0].name +
      tflAPIEndpoints.lineStatusEndpointUrl.suffix
    : '';

  //call the API via the useFetchData custom hook
  const {dataLoading, dataRetrieved} = useFetchData({
    apiURL: apiURL,
    section: section,
  });

  return (
    <>
      {/* line status & service types are only shown if we have a value for dataRetrieved */}
      {dataRetrieved !== null && (
        <>
          {/* line status heading text */}
          <View style={serviceTypeSummaryStyles.contentheadercontainer}>
            {statusHeadingText?.map(text => {
              return (
                <View style={serviceTypeSummaryStyles.headerCell}>
                  <Text style={serviceTypeSummaryStyles.headerText}>
                    {text}
                  </Text>
                </View>
              );
            })}
          </View>
          {/* line status summary */}
          <View style={serviceTypeSummaryStyles.contentcontainer}>
            {dataLoading ? (
              <Text>{'Retrieving line status'}</Text>
            ) : (
              <>
                <View style={serviceTypeSummaryStyles.summaryCell}>
                  <Text>
                    {
                      dataRetrieved[0]?.lineStatuses[0]
                        ?.statusSeverityDescription
                    }
                  </Text>
                </View>
                <View style={serviceTypeSummaryStyles.summaryCell}>
                  <Text>{dataRetrieved[0]?.lineStatuses[0]?.reason}</Text>
                </View>
              </>
            )}
          </View>
          {/* line service types heading text */}
          <View style={serviceTypeSummaryStyles.contentheadercontainer}>
            {serviceTypesHeadingText?.map(text => {
              return (
                <View style={serviceTypeSummaryStyles.headerCell}>
                  <Text style={serviceTypeSummaryStyles.headerText}>
                    {text}
                  </Text>
                </View>
              );
            })}
          </View>
          {/* line service types (i.e. regular/night service) summary: serviceType */}
          <View style={serviceTypeSummaryStyles.contentcontainer}>
            {dataRetrieved[0]?.serviceTypes.map(st => (
              <View style={serviceTypeSummaryStyles.summaryCell}>
                <Text>{st.name}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* if no data is retrieved, display a prompt indicating that no service type info was retrieved */}
      {dataRetrieved === null && (
        <View style={serviceTypeSummaryStyles.contentcontainer}>
          <Text>{'No service type data available'}</Text>
        </View>
      )}
    </>
  );
};

export default ServiceTypeSummary;

const serviceTypeSummaryStyles = StyleSheet.create({
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
