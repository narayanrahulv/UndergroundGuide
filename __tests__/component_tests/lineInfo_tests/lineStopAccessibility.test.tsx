import React from 'react';
import {render} from '@testing-library/react-native';
import LineStopAccessibility from '../../../components/lineInfo/lineStopAccessibility';
import {LineStopsAccessibilityProps} from '../../../dataFolder/appTypes';

// Sample data for the tests
const mockAccessibilityData: LineStopsAccessibilityProps = {
  additionalProperties: [
    {
      category: 'accessibility',
      key: 'accessvialift',
      sourceSystemKey: '',
      value: '',
    },
    {
      category: 'accessibility',
      key: 'toilet',
      sourceSystemKey: '',
      value: '',
    },
  ],
};

const emptyAccessibilityData: LineStopsAccessibilityProps = {
  additionalProperties: [],
};

describe('LineStopAccessibility', () => {
  it('should render "No accessibility data available" when no data is passed', () => {
    const {getByText} = render(
      <LineStopAccessibility
        additionalProperties={emptyAccessibilityData.additionalProperties}
      />,
    );

    // Assert that the empty state message is rendered
    const emptyMessage = getByText('No accessibility data available');
    expect(emptyMessage).toBeTruthy();
  });

  it('should render accessibility data when provided', () => {
    const {getByText} = render(
      <LineStopAccessibility
        additionalProperties={mockAccessibilityData.additionalProperties}
      />,
    );

    // Assert that each key and value from mockAccessibilityData is rendered
    mockAccessibilityData.additionalProperties.forEach(({key}) => {
      expect(getByText(key)).toBeTruthy();
    });
  });
});
