import StyledSelect2 from "@components/library/styled-select-2";
import { useStashViewContext } from "@contexts/stash-view-context";

import { STASH_TAB_ICON_MAP } from "./stash-view-tab-selection-card";

export default function StashViewTabSelect() {
  const {
    stashTabs,
    stashViewSettings,
    setStashViewSettings,
    refetchStashTabs,
  } = useStashViewContext();
  return (
    <>
      <StyledSelect2
        selected={stashTabs?.find(
          (e) => e.id === stashViewSettings.selectedTabId
        )}
        onSelectChange={(e) => {
          setStashViewSettings({ ...stashViewSettings, selectedTabId: e.id });
        }}
        items={stashTabs ?? []}
        mapToText={(e) => e.name}
        mapToIcon={(e) => STASH_TAB_ICON_MAP[e?.type]}
      />
    </>
  );
}
