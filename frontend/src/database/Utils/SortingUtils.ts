import { DateSortable } from '../types/internal/DateSortable';

export class SortingUtils {
  static sortByIso8061Date(arrayToSort: DateSortable[]) {
    return arrayToSort.sort(function (a, b) {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
  }
}
