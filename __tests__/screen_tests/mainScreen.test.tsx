import React from 'react';
import {render} from '@testing-library/react-native';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {MainScreen} from '../../screens';
import {undergroundLineDetails} from '../../dataFolder/undergroundLineData';

// Mocking the LineNameAndColorPanel component
jest.mock('../../components/lineInfo/lineNameAndColorPanel', () => ({
  __esModule: true,
  default: ({name, color}: {name: string; color: string}) => (
    <div>
      <Text>{name}</Text>
      <div style={{backgroundColor: color}} />
    </div>
  ),
}));

// Mock data
const mockData = undergroundLineDetails;

// Mock Navigation
const navigate = jest.fn();

describe('MainScreen tests', () => {
  it('should render a list of underground lines', () => {
    const {getByText} = render(
      <NavigationContainer>
        <MainScreen navigation={{navigate}} />
      </NavigationContainer>,
    );

    // Check if the FlatList renders the items correctly
    mockData.forEach(item => {
      expect(getByText(item.name)).toBeTruthy();
    });
  });
});
