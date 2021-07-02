export interface AllDocumentsInterface {
  offset: number;
  total_rows: number;
  rows: Row[];
}

export interface Row {
  id: string;
  key: string;
  value: { rev: string };

  // Only included if include_docs is set to true during query.
  doc?: any;
}
