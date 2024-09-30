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

export interface Column {
  key: keyof Issue;
  label: string;
  filterable?: boolean;
}

export enum SortOrder {
  'Asc' = 'ascending',
  'Desc' = 'descending',
}
