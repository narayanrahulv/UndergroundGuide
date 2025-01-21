import React from 'react';
import {render} from '@testing-library/react-native';
import LineStopsScreen from '../../screens/lineStopsScreen';
import {LineStop} from '../../components/lineInfo';

// Mock the LineStop component
jest.mock('../../components/lineInfo', () => {
  return {
    LineStop: jest.fn(() => null), // Mock it as a simple component
  };
});

describe('LineStopsScreen', () => {
  it('renders LineStop with correct props', () => {
    const route = {
      params: {
        lineName: 'metropolitan',
        color: 'magenta',
      },
    };

    // Render the screen with mocked route params
    render(<LineStopsScreen route={route} />);

    // Ensure LineStop is called with the correct props
    expect(LineStop).toHaveBeenCalledWith(
      expect.objectContaining({
        lineName: 'metropolitan',
        color: 'magenta',
        section: 'lineStop',
      }),
      expect.anything(),
    );
  });
});
