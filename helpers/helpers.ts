import {StopPoint} from '../dataFolder/models/stopPointsModels';
import {LineStatusDetails} from '../dataFolder/models/lineStatusModels';

export function isStopPoint(
  obj: LineStatusDetails[] | StopPoint[],
): obj is StopPoint[] {
  return typeof obj === 'object' && obj !== null && 'commonName' in obj[0];
}

export function isLineStatusDetails(
  obj: LineStatusDetails[] | StopPoint[],
): obj is LineStatusDetails[] {
  return typeof obj === 'object' && obj !== null && 'name' in obj[0];
}

export const lineColorMap = new Map();
lineColorMap.set('central', 'red');
lineColorMap.set('district', 'green');
lineColorMap.set('piccadilly', 'purple');
lineColorMap.set('northern', 'black');
lineColorMap.set('jubilee', 'gray');
lineColorMap.set('circle', 'yellow');
lineColorMap.set('hammersmith-city', 'pink');
lineColorMap.set('victoria', 'deepskyblue');
lineColorMap.set('bakerloo', 'brown');
lineColorMap.set('metropolitan', 'magenta');
