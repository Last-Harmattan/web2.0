/**
 * Represents the result of a allDocuments query on the database
 *
 * @interface AllDocumentsInterface
 * @member offset - the skip if provided, or in CouchDB the actual offset
 * @member total_rows - the total number of non-deleted documents in the database
 * @member rows - rows containing the documents, or just the _id/_revs if you didn’t set include_docs to true.
 * (https://pouchdb.com/api.html#batch_fetch 05.07.2021 22:57)
 */
export interface AllDocumentsInterface {
  offset: number;
  total_rows: number;
  rows: Row[];
}

/**
 * Represents a result row of a allDocuments query on the Database
 *
 * @interface Row
 *
 * @member id
 * @member key
 * @member value
 * @member doc
 */
export interface Row {
  id: string;
  key: string;
  value: { rev: string };
  doc?: any;
}
