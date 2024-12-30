import React from 'react';
import {render} from '@testing-library/react-native';
import LineNameAndColorPanel from '../../components/lineInfo/lineNameAndColorPanel';
import {highLevelLineDetails} from '../../dataFolder/appTypes';

describe('LineNameAndColorPanel', () => {
  it('should display the correct name and color', () => {
    const mockProps: highLevelLineDetails = {
      name: 'hammersmith-city',
      color: 'pink',
    };

    const {getByText, getByTestId} = render(
      <LineNameAndColorPanel {...mockProps} />,
    );

    // Check if the name is rendered correctly
    expect(getByText('hammersmith-city')).toBeTruthy();

    // Check if the color is applied correctly to the color cell
    const colorCell = getByTestId('line-name-and-color-cell');
    expect(colorCell.props.style[1].backgroundColor).toBe('pink');
  });
});
