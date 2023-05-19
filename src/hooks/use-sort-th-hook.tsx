import { Dispatch, useCallback, useEffect, useReducer, useRef } from "react";

import {
  ColumnsSortingMap,
  SortableTableColumns,
  SortingDirections,
} from "@components/sortable-table-header";

type SortChangeHandler = (
  key: string | undefined,
  dir: SortingDirections
) => void;

/**
 * Hook that defines the functionality needed for an instance
 * of the {@link SortableTableHeader} component.
 * @param columns {@link SortableTableColumns} definitions the headers are made of.
 * @param onSortChange A callback that will be executed whenever the
 * sorting behavior of the columns is changed.
 * @returns The map of { key: sorting type } for {@link SortableTableHeader}
 * and the dispatch function to update a specific key in the map.
 */
export default function useSortableTable(
  columns: SortableTableColumns,
  onSortChange: SortChangeHandler
): [ColumnsSortingMap, Dispatch<string>] {
  const defaults = createDefaultSortingMap(columns);

  /*
   * Track column sorting directions
   */
  const [map, updateMap] = useReducer(
    (state: ColumnsSortingMap, action: string) => {
      if (!Object.hasOwn(state, action)) {
        throw new Error(`Columns do not have a key ${action}`);
      }

      const newState = { ...defaults };

      if (state[action] === "none") {
        newState[action] = "desc";
      } else if (state[action] === "asc") {
        newState[action] = "none";
      } else if (state[action] === "desc") {
        newState[action] = "asc";
      }

      return newState;
    },
    defaults
  );

  /*
   * Save the callback as a ref so render cycles
   * don't cause reevaluation of the callback.
   */
  const callbackRef = useRef<SortChangeHandler>();

  useEffect(() => {
    callbackRef.current = onSortChange;
  }, [onSortChange]);

  /*
   * Execute callback when the sorting direction changes.
   */
  useEffect(() => {
    const sortKey = Object.keys(map).find((k) => map[k] !== "none");

    const sortDirection = sortKey ? map[sortKey] : "desc";

    if (callbackRef?.current) {
      callbackRef.current(sortKey, sortDirection);
    }

    //memoizedSortChange(sortKey, sortDirection);
  }, [map]);

  return [map, updateMap];
}

/**
 * Internal function for creating the map of { key: sorting behavior }
 * pairs used by {@link useSortableTable}
 */
function createDefaultSortingMap(
  cols: SortableTableColumns
): ColumnsSortingMap {
  return cols.reduce((def, col) => {
    def[col.key] = "none";
    return def;
  }, {});
}
