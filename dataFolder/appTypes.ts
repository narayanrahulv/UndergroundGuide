//basic display types
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
//end basic display types

//props
export type LineSummaryHeaderProps = {
  headingText: string[];
  section?: lineSummarySections;
};

export type LineSummaryDetailsProps = {
  lineSummary: highLevelLineDetails[];
  section?: lineSummarySections;
};

export type LineStatusAndServiceTypeProps = {
  lineName: string;
  section?: lineSummarySections;
  color?: string;
  statusHeadingText?: string[];
  serviceTypesHeadingText?: string[];
};

export type LineStopsProps = {
  lineId: string;
};

export type useFetchDataProps = {
  apiURL: string;
  section?: lineSummarySections;
};
//end props

//models representing data retrieved from back-end
export type HighLevelLineStatus = {
  id: string;
  name: string;
  lineStatuses: LineStatus[];
  serviceTypes: ServiceType[];
};

export type LineStatusDetails = {
  id: string;
  name: string;
  lineStatuses: LineStatus[];
  serviceTypes: ServiceType[];
};

export type LineModeTubeNames = {
  id: string;
  name: string;
};

export type LineStatus = {
  type: string;
  id: number;
  statusSeverity: number;
  statusSeverityDescription: string;
  reason: string;
  created: string;
  validityPeriods: any;
};

export type ServiceType = {
  $type: string;
  name: string;
  uri: string;
};

export type Crowding = {
  $type: string;
};

export type LineStops = {
  lineId: string;
  lineName: string;
  direction: string;
  stations: Stations[];
};

export type Stations = {
  name: string;
};
//end models representing data retrieved from back-end
