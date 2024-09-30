export interface Issue {
  id: number;
  issueType: string;
  severity: string;
  component: string;
  selector: string;
  url: string;
  description: string;
  codeSnippet: string;
  screenshot: string;
}

export enum SortOrder {
  'Asc' = 'ascending',
  'Desc' = 'descending',
}

export interface Column<T> {
  key: keyof T;
  label: string;
  filterable?: boolean;
  sortable?: boolean;
}
