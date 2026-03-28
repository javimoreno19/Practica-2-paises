export type Country = {
  name: {
    common: string;
    official: string;
  };
  flag: string;
  flags: {
    svg: string;
    png: string;
    alt?: string;
  };
  region: string;
  subregion?: string;
  capital?: string[];
  population: number;
  area?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
};