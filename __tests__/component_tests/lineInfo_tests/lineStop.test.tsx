import React from 'react';
import {render, screen} from '@testing-library/react-native';
import LineStop from '../../../components/lineInfo/lineStop';
import {useFetchData} from '../../../hooks';
import {StopPoint} from '../../../dataFolder/models/stopPointsModels';

// Mock the `useFetchData` hook
jest.mock('../../../hooks', () => ({
  useFetchData: jest.fn(),
}));

const mockStopData: StopPoint[] = [
  {
    modes: ['tube', 'bus'],
    lineModeGroups: [
      {modeName: 'tube', lineIdentifier: ['bakerloo', 'hammersmith-city']},
      {modeName: 'tube', lineIdentifier: ['jubilee', 'metropolitan']},
      {modeName: 'bus', lineIdentifier: ['1', '2']},
    ],
    stopType: '',
    stationNaptan: '',
    commonName: 'Kings Cross',
    additionalProperties: [
      {
        category: 'accessibility',
        key: 'accessvialift',
        sourceSystemKey: '',
        value: '',
      },
      {category: 'facilities', key: 'toilet', sourceSystemKey: '', value: ''},
    ],
    lat: 0,
    lon: 0,
  },
];

describe('LineStop Component', () => {
  it('should render loading state correctly', () => {
    // Mock the hook to return a loading state
    (useFetchData as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(
      <LineStop lineName="metropolitan" color="magenta" section="lineStop" />,
    );

    // check that retrieving message is displayed
    expect(screen.getByText(/Retrieving line stops information/i)).toBeTruthy();
  });

  it('should render error state correctly', () => {
    // Mock the hook to return an error state
    (useFetchData as jest.Mock).mockReturnValue({
      isLoading: false,
      error: 'Something went wrong',
      data: null,
    });

    render(<LineStop lineName="central" color="red" section="lineStop" />);

    // check that error message is displayed
    expect(
      screen.getByText(/Something went wrong while retrieving data/i),
    ).toBeTruthy();
  });

  it('should render stop data correctly', async () => {
    // Mock the hook to return successful data
    (useFetchData as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: {data: mockStopData},
    });

    render(<LineStop lineName="central" color="red" section="lineStop" />);

    // Check if the stop name is displayed
    expect(screen.getByText('Kings Cross')).toBeTruthy();

    // Check if the "Modes of transport" text and related data is present
    expect(screen.getByText('Modes of transport at this station')).toBeTruthy();
    expect(screen.getByText('tube')).toBeTruthy();
    expect(screen.getByText('bus')).toBeTruthy();

    // Check if other lines serving the station are correctly rendered
    expect(screen.getByText('Lines serving this station')).toBeTruthy();
    expect(screen.getByText('bakerloo')).toBeTruthy();
    expect(screen.getByText('hammersmith-city')).toBeTruthy();
    expect(screen.getByText('jubilee')).toBeTruthy();
    expect(screen.getByText('metropolitan')).toBeTruthy();

    // Check if accessibility features are correctly rendered
    expect(screen.getByText('Accessibility at this station')).toBeTruthy();
    expect(screen.getByText('accessvialift')).toBeTruthy();
  });
});
