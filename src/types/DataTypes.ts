export enum ConnectorType {
  J1772 = "J1772",
  Type2 = "Type2",
  CCS2 = "CCS 2",
  Type3 = "Type 3",
}

export enum ConnectorStatus {
  available = "available",
  unavailable = "unavailable",
}

export interface Pin {
  _id: string | number;
  title: string;
  latitude: number;
  longitude: number;
  connectors: {
    type: ConnectorType;
    status: ConnectorStatus;
  }[];
}

export interface Connector {
  type: ConnectorType;
  status: ConnectorStatus;
}
