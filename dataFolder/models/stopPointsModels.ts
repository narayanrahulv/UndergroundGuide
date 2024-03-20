export type StopPoint = {
  modes: string[];
  lineModeGroups: LineModeGroup[];
  stopType: string;
  stationNaptan: string;
  commonName: string;
  additionalProperties: additionalProperties[];
  lat: number;
  lon: number;
};

export type LineModeGroup = {
  modeName: string;
  lineIdentifier: string[];
};

export type additionalProperties = {
  category: string;
  key: string;
  sourceSystemKey: string;
  value: string;
};
