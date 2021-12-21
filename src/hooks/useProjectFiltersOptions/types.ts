export interface Option {
  value: string;
  label: string;
}

export interface FilterOptions {
  error: string;
  options: Option[];
}

export interface AllFilterOptions {
  allTags: FilterOptions;
  allTypes: FilterOptions;
  allSupervisorNames: FilterOptions;
  allStates: FilterOptions;
}
