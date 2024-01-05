import {highLevelLineDetails} from '../dataFolder/appTypes';

export const undergroundLineDetails: highLevelLineDetails[] = [
  {
    name: 'central',
    color: 'red',
  },
  {
    name: 'district',
    color: 'green',
  },
  {
    name: 'piccadilly',
    color: 'purple',
  },
  {
    name: 'northern',
    color: 'black',
  },
  {
    name: 'jubilee',
    color: 'gray',
  },
  {
    name: 'circle',
    color: 'yellow',
  },
  {
    name: 'hammersmith-city',
    color: 'pink',
  },
  {
    name: 'victoria',
    color: 'deepskyblue',
  },
  {
    name: 'bakerloo',
    color: 'brown',
  },
  {
    name: 'metropolitan',
    color: 'magenta',
  },
];

export const basicLineSummaryHeadings: string[] = ['Name', 'Color Code'];

export const lineStatusSummaryHeadings: string[] = ['Line Status', 'Reason'];

export const lineServiceTypesHeadings: string[] = ['service types'];

export const tflAPIEndpoints = {
  lineNamesUrl: {
    url: 'https://api.tfl.gov.uk/Line/Mode/tube',
  },
  lineStatusEndpointUrl: {
    prefix: 'https://api.tfl.gov.uk/Line/',
    suffix: '/Status',
  },
  lineStopsSequenceUrl: {
    prefix: 'https://api.tfl.gov.uk/Line/',
    suffix: '/Route/Sequence/',
  },
};
