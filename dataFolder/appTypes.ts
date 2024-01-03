export type highLevelLineDetails = {
  name: lineNames;
  color: string;
  direction?: direction;
};

export type direction =
  | 'north south'
  | 'east west'
  | 'unknown'
  | 'not found'
  | 'select a line';

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
  | 'select a line'
  | 'not found';

export type lineSummarySections = 'basic' | 'status' | 'serviceType';

export type LineSummaryHeaderProps = {
  headingText: string[];
  section?: lineSummarySections;
};

export type LineSummaryDetailsProps = {
  lineSummary: highLevelLineDetails[];
  section?: lineSummarySections;
};

export type LineStopsProps = {
  lineId: string;
};

export type useFetchDataProps = {
  apiURL: string;
  section?: lineSummarySections;
};

export type HighLevelLineStatus = {
  id: string;
  name: string;
  lineStatuses: LineStatus[];
  serviceTypes: ServiceType[];
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
