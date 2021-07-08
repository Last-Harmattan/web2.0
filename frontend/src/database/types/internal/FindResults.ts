/**
 * Represents the result of a find query on the database
 *
 * @interface FindResults
 * @param docs - List of the documents that matched the find query
 */
export interface FindResults {
  docs: any[];
}
