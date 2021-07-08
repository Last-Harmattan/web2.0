/**
 * @interface
 * @member {ok} - Status of database action
 * @member {id} - Id of the object on that an action is performed
 * @member {rev} - Current revision of the document in the database
 */
export interface DbEntryMethaData {
  ok: Boolean;
  id: string;
  rev: string;
}
