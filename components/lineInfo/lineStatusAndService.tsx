import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {tflAPIEndpoints} from '../../dataFolder/undergroundLineData';
import {useFetchData} from '../../hooks';
import {LineStatusAndServiceTypeProps} from '../../dataFolder/appTypes';
import {LineNameAndColorPanel} from '../../components/lineInfo';
import {LineStatusDetails} from '../../dataFolder/models/lineStatusModels';

const LineStatusAndService = (props: LineStatusAndServiceTypeProps) => {
  const {lineName, section, color, statusHeadingText, serviceTypesHeadingText} =
    props;

  //if we have a value passed in for lineName, we will set a URL to call the API
  let apiURL = lineName
    ? tflAPIEndpoints.lineStatusEndpointUrl.prefix +
      lineName +
      tflAPIEndpoints.lineStatusEndpointUrl.suffix
    : '';

  const {isLoading, error, data} = useFetchData({
    apiURL: apiURL,
    section: section,
  });

  const displayData: LineStatusDetails[] = data?.data;

  return (
    <>
      {/* if we encounter an error while retrieving data, display an error message */}
      {error && (
        <View style={serviceTypeSummaryStyles.contentcontainer}>
          <Text>{'Something went wrong while retrieving data'}</Text>
        </View>
      )}

      {isLoading ? (
        // display loading message if applicable
        <View style={serviceTypeSummaryStyles.contentcontainer}>
          <Text>{'Retrieving line status and line service information'}</Text>
        </View>
      ) : (
        <>
          {displayData[0]?.lineStatuses[0] && (
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
                    <View
                      style={serviceTypeSummaryStyles.headerCell}
                      key={text}>
                      <Text style={serviceTypeSummaryStyles.headerText}>
                        {text}
                      </Text>
                    </View>
                  );
                })}
              </View>

              {/* line status summary */}
              <View style={serviceTypeSummaryStyles.contentcontainer}>
                <View style={serviceTypeSummaryStyles.summaryCell}>
                  <Text>
                    {displayData[0]?.lineStatuses[0]?.statusSeverityDescription}
                  </Text>
                </View>
                <View style={serviceTypeSummaryStyles.summaryCell}>
                  <Text>{displayData[0]?.lineStatuses[0]?.reason}</Text>
                </View>
              </View>

              {/* line service types heading text */}
              <View style={serviceTypeSummaryStyles.contentheadercontainer}>
                {serviceTypesHeadingText?.map(text => {
                  return (
                    <View
                      style={serviceTypeSummaryStyles.headerCell}
                      key={text}>
                      <Text style={serviceTypeSummaryStyles.headerText}>
                        {text}
                      </Text>
                    </View>
                  );
                })}
              </View>

              {/* line service types (i.e. regular/night service) summary: serviceType */}
              <View style={serviceTypeSummaryStyles.contentcontainer}>
                {displayData[0]?.serviceTypes.map(st => (
                  <View
                    style={serviceTypeSummaryStyles.summaryCell}
                    key={st.name}>
                    <Text>{st.name}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </>
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
