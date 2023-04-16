import { PoeStashTab, StashViewItemSummary } from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";

export function exportToForumShop(
  items: StashViewItemSummary[],
  tabs: PoeStashTab[],
  stashSettings: StashViewSettings
): string {
  let output = "";


  for(const item of items) {
    output += `${item.x} ${item.y} ${item.valueChaos}\n`
  }

  return output;
}
