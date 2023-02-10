import { gql } from "@apollo/client";

export const ItemGroupsQuery = gql`
    query Entries($search: ItemGroupValueTimeseriesSearchInput!) {
      itemGroupValueTimeseriesSearch(search: $search) {
        results {
          series {
            entries {
              timestamp
              value
            }
            type
          }
          itemGroup {
            icon
            displayName
            key
            hashString
          }
        }
      }
    }
  `;