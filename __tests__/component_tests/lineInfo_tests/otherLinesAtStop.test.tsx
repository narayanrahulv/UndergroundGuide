import React from 'react';
import {render} from '@testing-library/react-native';
import OtherLinesAtStop from '../../../components/lineInfo/otherLinesAtStop';

// Mock data for testing
const mockLineModeGroups = [
  {modeName: 'tube', lineIdentifier: ['bakerloo', 'hammersmith-city']},
  {modeName: 'tube', lineIdentifier: ['jubilee', 'metropolitan']},
  {modeName: 'bus', lineIdentifier: ['1', '2']},
];

// Mock the `lineColorMap` to match the expected color logic
jest.mock('../../../helpers/helpers', () => ({
  lineColorMap: new Map([
    ['bakerloo', 'brown'],
    ['hammersmith-city', 'pink'],
    ['jubilee', 'gray'],
    ['metropolitan', 'magenta'],
  ]),
}));

describe('OtherLinesAtStop', () => {
  it('renders correctly only displaying tube lines filtered, bus lines should not be shown', () => {
    const {getByText} = render(
      <OtherLinesAtStop lineModeGroups={mockLineModeGroups} />,
    );

    // Check if the component renders tube lines
    expect(getByText('bakerloo')).toBeTruthy();
    expect(getByText('hammersmith-city')).toBeTruthy();
    expect(getByText('jubilee')).toBeTruthy();
    expect(getByText('metropolitan')).toBeTruthy();

    // Check if bus lines are not rendered
    expect(() => getByText('1')).toThrow();
    expect(() => getByText('2')).toThrow();
  });

  it('displays text color based on line color', () => {
    const {getByText} = render(
      <OtherLinesAtStop lineModeGroups={mockLineModeGroups} />,
    );

    // Check that 'hammersmith-city' (pink) has black text
    const hammersmithCityText = getByText('hammersmith-city');
    expect(hammersmithCityText.props.style).toEqual(
      expect.objectContaining({color: 'black'}),
    );

    // Check that 'metropolitan' (magenta) has white text
    const bakerlooText = getByText('bakerloo');
    expect(bakerlooText.props.style).toEqual(
      expect.objectContaining({color: 'white'}),
    );
  });

  it('applies correct background color for each line', () => {
    const {getByText} = render(
      <OtherLinesAtStop lineModeGroups={mockLineModeGroups} />,
    );

    // Check the background color for 'jubilee'
    const jubileeView = getByText('jubilee').parent;
    expect(jubileeView?.parent?.props.style).toEqual(
      expect.objectContaining({backgroundColor: 'gray'}),
    );

    // Check the background color for 'bakerloo'
    const bakerlooView = getByText('bakerloo').parent;
    expect(bakerlooView?.parent?.props.style).toEqual(
      expect.objectContaining({backgroundColor: 'brown'}),
    );
  });
});
