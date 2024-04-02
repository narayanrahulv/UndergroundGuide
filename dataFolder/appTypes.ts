import {LineStatusDetails} from '../dataFolder/models/lineStatusModels';
import {
  StopPoint,
  additionalProperties,
  LineModeGroup,
} from '../dataFolder/models/stopPointsModels';

//=========
//display related types
//=========
export type highLevelLineDetails = {
  name: lineNames;
  color: string;
};

export type lineNames =
  | 'central'
  | 'bakerloo'
  | 'victoria'
  | 'hammersmith-city'
  | 'circle'
  | 'jubilee'
  | 'northern'
  | 'piccadilly'
  | 'district'
  | 'metropolitan'
  | 'select a line'
  | 'not found';

export type lineSummarySections = 'basic' | 'status' | 'serviceType';

//=========
//props
//=========
export type LineSummaryHeaderProps = {
  headingText: string[];
  section?: lineSummarySections;
};

export type LineSummaryDetailsProps = {
  lineSummary: highLevelLineDetails[];
  section?: lineSummarySections;
};

export type LineStatusAndServiceTypeProps = {
  lineName: lineNames;
  section?: lineSummarySections;
  color?: string;
  statusHeadingText?: string[];
  serviceTypesHeadingText?: string[];
};

export type LineStopsProps = {
  lineName: lineNames;
  color?: string;
  section?: lineSummarySections;
};

export type OtherLinesAtStopProps = {
  lineModeGroups: LineModeGroup[];
export type LineStopsTransportModesProps = {
  modes: string[];
};

export type LineStopsAccessibilityProps = {
  additionalProperties: additionalProperties[];
};

export type useFetchDataProps = {
  apiURL: string;
  section?: lineSummarySections;
  fetchedDataType?: string;
};

//=========
//general types
//=========
export type useFetchHookReturnedData = {
  dataLoading: boolean;
  dataRetrievalError: string | null;
  dataRetrieved: LineStatusDetails[] | StopPoint[] | undefined;
};
