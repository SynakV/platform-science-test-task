export type FleetType = {
  totals: TotalsType;
  diagnostics: FleetItemType;
  prognostics: FleetItemType;
};

export type TotalsType = Record<string, number>;

export type FleetItemType = {
  totals: {
    engines: number;
  };
} & {
  [key: string]: FleetItemDataType;
};

export type FleetItemDataType = Record<string, Record<string, number>>;
