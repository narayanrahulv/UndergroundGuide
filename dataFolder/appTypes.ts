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

export type HighLevelLineStatus = {
  // $type: string;
  id: string;
  name: string;
  // modeName: string;
  // disruptions: any;
  // created: string;
  // modified: string;
  lineStatuses: LineStatus[];
  // routeSections: any;
  serviceTypes: ServiceType[];
  // crowding: Crowding;
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
