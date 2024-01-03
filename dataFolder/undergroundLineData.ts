import {highLevelLineDetails} from '../dataFolder/appTypes';

export const undergroundLineDetails: highLevelLineDetails[] = [
  {
    name: 'central',
    color: 'red',
    direction: 'east west',
  },
  {
    name: 'district',
    color: 'green',
    direction: 'east west',
  },
  {
    name: 'piccadilly',
    color: 'purple',
    direction: 'east west',
  },
  {
    name: 'northern',
    color: 'black',
    direction: 'north south',
  },
  {
    name: 'jubilee',
    color: 'gray',
    direction: 'north south',
  },
  {
    name: 'circle',
    color: 'yellow',
    direction: 'east west',
  },
  {
    name: 'hammersmith-city',
    color: 'pink',
    direction: 'east west',
  },
  {
    name: 'victoria',
    color: 'deepskyblue',
    direction: 'east west',
  },
  {
    name: 'bakerloo',
    color: 'brown',
    direction: 'north south',
  },
];

export const lineNames: string[] = [
  'central',
  'bakerloo',
  'victoria',
  'hammersmith-city',
  'circle',
  'jubilee',
  'northern',
  'piccadilly',
  'district',
];

export const basicLineSummaryHeadings: string[] = [
  'Name',
  'Color Code',
  'Direction',
];

export const lineStatusSummaryHeadings: string[] = ['Line Status', 'Reason'];

export const lineServiceTypesHeadings: string[] = ['service types'];

export const tflAPIEndpoints = {
  lineStatusEndpointUrl: {
    prefix: 'https://api.tfl.gov.uk/Line/',
    suffix: '/Status',
  },
  lineStopsSequenceUrl: {
    prefix: 'https://api.tfl.gov.uk/Line/',
    suffix: '/Route/Sequence/',
  },
};
