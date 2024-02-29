/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  undergroundLineDetails,
  lineStatusSummaryHeadings,
  lineServiceTypesHeadings,
} from '../dataFolder/undergroundLineData';
import LineNameAndColorPanel from '../components/lineInfo/lineNameAndColorPanel';

const MainScreen = ({navigation}) => {
  return (
    <>
      <View style={mainScreenStyles.maincontainer}>
        {/* flat list of panels showing tube lines and respective colors */}
        <SafeAreaView>
          <FlatList
            data={undergroundLineDetails}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('LineStatus', {
                    lineName: item.name,
                    color: item.color,
                    statusHeadingText: lineStatusSummaryHeadings,
                    serviceTypesHeadingText: lineServiceTypesHeadings,
                  })
                }>
                <LineNameAndColorPanel name={item.name} color={item.color} />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.name}
          />
        </SafeAreaView>
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
