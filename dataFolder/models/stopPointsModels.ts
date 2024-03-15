export type StopPoint = {
  modes: string[];
  lineModeGroups: LineModeGroup[];
  stopType: string;
  stationNaptan: string;
  commonName: string;
  lat: number;
  lon: number;
};

export type LineModeGroup = {
  modeName: string;
  lineIdentifier: string[];
};
