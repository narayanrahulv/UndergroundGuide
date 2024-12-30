import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {highLevelLineDetails} from '../../dataFolder/appTypes';

//each panel will display the line name and color below it
const LineNameAndColorPanel = (props: highLevelLineDetails) => {
  const {name, color} = props;

  return (
    <View style={lineNameAndColorPanelStyles.boxSimple}>
      <View style={lineNameAndColorPanelStyles.textCell}>
        <Text>{name}</Text>
      </View>
      <View
        testID="line-name-and-color-cell"
        style={[
          lineNameAndColorPanelStyles.colorCell,
          {backgroundColor: color},
        ]}
      />
    </View>
  );
};

export default LineNameAndColorPanel;

const lineNameAndColorPanelStyles = StyleSheet.create({
  boxSimple: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    margin: 20,
    flexDirection: 'row',
  },
  textCell: {
    flex: 1,
  },
  colorCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 20,
  },
});
