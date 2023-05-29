import StyledSelect2 from "@components/library/styled-select-2";
import { useStashViewContext } from "@contexts/stash-view-context";
import { StashViewTab } from "@models/stash-view-models";

import { STASH_TAB_ICON_MAP } from "./stash-view-tab-selection-card";

export default function StashViewTabSelectVertical({
  selectedTabIds,
  onSelectChange,
}: {
  selectedTabIds: string[];
  onSelectChange: (e: StashViewTab) => void;
}) {
  const { stashTabs } = useStashViewContext();
  return (
    <>
      <div className="flex flex-col space-y-1 overflow-y-auto">
        {stashTabs?.map((tab) => (
          <>
            <div className="flex items-center space-x-1">
              <input
                type="checkbox"
                id={tab.id}
                className="w-4 h-4 text-content-accent bg-gray-100 border-gray-300 rounded"
                checked={selectedTabIds?.includes(tab.id) ?? false}
                onChange={(e) => {
                  onSelectChange(tab);
                }}
              />
              <label htmlFor={tab.id} className={`cursor-pointer flex-1`}>
                {tab.name}
              </label>
              <div>
                <img src={STASH_TAB_ICON_MAP[tab.type]} alt="" />
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
