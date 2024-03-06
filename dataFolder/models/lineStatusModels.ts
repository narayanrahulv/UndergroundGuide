export type LineStatusDetails = {
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
