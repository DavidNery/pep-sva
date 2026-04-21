export interface SsvvRecord {
  Hora: string;
  [key: string]: string | number;
}

export interface HgtRecord {
  Hora: string;
  HGT: string;
}

export interface SsvvResponse {
  dados: SsvvRecord[];
}

export interface HgtResponse {
  dados: HgtRecord[];
}