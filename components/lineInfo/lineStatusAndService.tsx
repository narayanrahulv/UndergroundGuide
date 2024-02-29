import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {tflAPIEndpoints} from '../../dataFolder/undergroundLineData';
import useFetchData from '../../hooks/useFetchData';
import {LineStatusAndServiceTypeProps} from '../../dataFolder/appTypes';
import LineNameAndColorPanel from '../../components/lineInfo/lineNameAndColorPanel';

const LineStatusAndService = (props: LineStatusAndServiceTypeProps) => {
  const {lineName, section, color, statusHeadingText, serviceTypesHeadingText} =
    props;

  //if we have a value passed in for lineDetails, we will set a URL to call the API
  let apiURL = lineName
    ? tflAPIEndpoints.lineStatusEndpointUrl.prefix +
      lineName +
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
      {dataRetrieved !== null && dataRetrieved !== [] && (
        <>
          {/* line status header */}
          <LineNameAndColorPanel
            name={lineName ?? 'not found'}
            color={color ?? ''}
          />
          {/* line status heading text */}
          <View style={serviceTypeSummaryStyles.contentheadercontainer}>
            {statusHeadingText?.map(text => {
              return (
                <View style={serviceTypeSummaryStyles.headerCell} key={text}>
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
              <View style={serviceTypeSummaryStyles.summaryCell}>
                <Text>{'Retrieving line status'}</Text>
              </View>
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
                <View style={serviceTypeSummaryStyles.headerCell} key={text}>
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
              <View style={serviceTypeSummaryStyles.summaryCell} key={st.name}>
                <Text>{st.name}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* if no data is retrieved, display a prompt indicating that no status and service type info was retrieved */}
      {dataRetrieved === null && (
        <View style={serviceTypeSummaryStyles.contentcontainer}>
          <Text>{'Line status and service type data not available'}</Text>
        </View>
      )}
    </>
  );
};

export default LineStatusAndService;

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
  boxSimple: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    margin: 20,
    flexDirection: 'row',
  },
});
