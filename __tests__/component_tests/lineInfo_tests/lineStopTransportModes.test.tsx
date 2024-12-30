import React from 'react';
import {render} from '@testing-library/react-native'; // This renders the component
import {LineStopTransportModes} from '../../../components/lineInfo';
import {LineStopsTransportModesProps} from '../../../dataFolder/appTypes';

// Mock data for tests
const mockModes: LineStopsTransportModesProps['modes'] = [
  'Bus',
  'Tram',
  'Train',
];

describe('LineStopTransportModes', () => {
  it('renders "No transport mode data available" when modes is empty', () => {
    // Render the component with an empty array
    const {getByText} = render(<LineStopTransportModes modes={[]} />);

    // Check if the text is displayed
    expect(getByText('No transport mode data available')).toBeTruthy();
  });

  it('renders transport modes when modes are provided', () => {
    // Render the component with the mock data
    const {getByText} = render(<LineStopTransportModes modes={mockModes} />);

    // Check if each transport mode is rendered
    mockModes.forEach(mode => {
      expect(getByText(mode)).toBeTruthy();
    });
  });

  it('does not render "No transport mode data available" when modes are provided', () => {
    const {queryByText} = render(<LineStopTransportModes modes={mockModes} />);

    // Check if the "No transport mode data available" text is NOT rendered
    expect(queryByText('No transport mode data available')).toBeNull();
  });
});
