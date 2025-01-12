import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {LineStatusScreen} from '../../screens';
import {LineStatusAndService} from '../../components/lineInfo';

// Mocking the LineStatusAndService component
jest.mock('../../components/lineInfo', () => {
  return {
    LineStatusAndService: jest.fn(() => null), // mock implementation
  };
});

describe('<LineStatusScreen />', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockRoute = {
    params: {
      lineName: 'northern',
      color: 'black',
      statusHeadingText: ['Status', 'Reason'],
      serviceTypesHeadingText: ['Service Type'],
    },
  };

  it('should render LineStatusAndService with correct props', () => {
    render(<LineStatusScreen navigation={mockNavigation} route={mockRoute} />);

    // Check if LineStatusAndService is called with correct props
    expect(LineStatusAndService).toHaveBeenCalledWith(
      expect.objectContaining({
        lineName: 'northern',
        color: 'black',
        statusHeadingText: ['Status', 'Reason'],
        serviceTypesHeadingText: ['Service Type'],
      }),
      {},
    );
  });

  it('should render "View stops" link correctly', () => {
    const {getByText} = render(
      <LineStatusScreen navigation={mockNavigation} route={mockRoute} />,
    );

    // Check if "View stops" text is rendered
    const viewStopsLink = getByText('View stops');
    expect(viewStopsLink).toBeTruthy();
  });

  it('should navigate to LineStops screen when "View stops" is pressed', () => {
    const {getByText} = render(
      <LineStatusScreen navigation={mockNavigation} route={mockRoute} />,
    );

    const viewStopsLink = getByText('View stops');

    // Simulate button press
    fireEvent.press(viewStopsLink);

    // Check if navigate was called with the expected parameters
    expect(mockNavigation.navigate).toHaveBeenCalledWith('LineStops', {
      lineName: 'northern',
      color: 'black',
    });
  });
});
