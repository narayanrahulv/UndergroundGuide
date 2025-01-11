import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import LineStatusAndService from '../../../components/lineInfo/lineStatusAndService';
import {useFetchData} from '../../../hooks/useFetchData';

// Mock the useFetchData hook
jest.mock('../../../hooks/useFetchData', () => ({
  useFetchData: jest.fn(),
}));

describe('LineStatusAndService', () => {
  it('displays a loading message when data is being fetched', () => {
    // Mock the hook to return isLoading as true
    (useFetchData as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(
      <LineStatusAndService
        lineName="central"
        section="lineStatus"
        color="red"
        statusHeadingText={['Status', 'Reason']}
        serviceTypesHeadingText={['Service Type']}
      />,
    );

    expect(
      screen.getByText('Retrieving line status and line service information'),
    ).toBeTruthy();
  });

  it('displays error message when there is an error', () => {
    // Mock useFetchData to return an error
    (useFetchData as jest.Mock).mockReturnValue({
      isLoading: false,
      error: true,
      data: {data: []},
    });

    render(
      <LineStatusAndService
        lineName="piccadilly"
        section="lineStatus"
        color="red"
        statusHeadingText={['Status', 'Reason']}
        serviceTypesHeadingText={['Service Type']}
      />,
    );

    expect(
      screen.getByText('Something went wrong while retrieving data'),
    ).toBeTruthy();
  });

  it('should render line status and service types when data is available', async () => {
    // Mock useFetchData to return valid data
    const mockData = {
      data: [
        {
          lineStatuses: [
            {
              statusSeverityDescription: 'Good Service',
              reason: 'No issues',
            },
          ],
          serviceTypes: [{name: 'Regular'}, {name: 'Night'}],
        },
      ],
    };

    (useFetchData as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: mockData,
    });

    render(
      <LineStatusAndService
        lineName="district"
        section="lineStatus"
        color="red"
        statusHeadingText={['Status', 'Reason']}
        serviceTypesHeadingText={['Service Type']}
      />,
    );

    await waitFor(() => {
      // Check if the status and reason are rendered
      expect(screen.getByText('Good Service')).toBeTruthy();
      expect(screen.getByText('No issues')).toBeTruthy();

      // Check if the service types are rendered
      expect(screen.getByText('Regular')).toBeTruthy();
      expect(screen.getByText('Night')).toBeTruthy();
    });
  });
});
