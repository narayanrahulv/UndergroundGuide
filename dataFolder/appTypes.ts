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
  lineName: string;
  section?: lineSummarySections;
};

export type useFetchDataProps = {
  apiURL: string;
  section?: lineSummarySections;
};
//end props
