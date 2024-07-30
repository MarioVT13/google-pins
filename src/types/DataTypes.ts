export interface Pin {
  _id: number;
  title: string;
  latitude: number;
  longitude: number;
  connectors: {
    type: "J1772" | "Type2" | "CCS 2" | "Type 3";
    status: "available" | "unavailable";
  }[];
}

type ConnectorType = "J1772" | "Type2" | "CCS 2" | "Type 3";
type ConnectorStatus = "available" | "unavailable";

export interface Connector {
  type: ConnectorType;
  status: ConnectorStatus;
}
