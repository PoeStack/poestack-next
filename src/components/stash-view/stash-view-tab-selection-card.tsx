import StyledCard from "@components/styled-card";
import { PoeStashTab } from "@generated/graphql";
import { StashViewSettings } from "pages/poe/stash-view";

export function StashViewTabSelectionCard({
  tabs,
  stashViewSettings,
  setStashViewSettings,
}: {
  tabs: PoeStashTab[];
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
}) {
  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-1 max-h-[600px] overflow-y-auto">
          Stash Tabs
          {tabs?.map((tab) => (
            <>
              <div className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-content-accent bg-gray-100 border-gray-300 rounded"
                  checked={stashViewSettings.checkedTabIds.includes(tab.id)}
                  onChange={(e) => {
                    if (stashViewSettings.checkedTabIds.includes(tab.id)) {
                      setStashViewSettings({
                        ...stashViewSettings,
                        checkedTabIds: stashViewSettings.checkedTabIds.filter(
                          (e) => e !== tab.id
                        ),
                      });
                    } else {
                      setStashViewSettings({
                        ...stashViewSettings,
                        checkedTabIds: [
                          ...stashViewSettings.checkedTabIds,
                          tab.id,
                        ],
                      });
                    }
                  }}
                />
                <div
                  className={`${
                    stashViewSettings.selectedTabId === tab.id
                      ? "text-content-accent"
                      : "text-white"
                  } cursor-pointer`}
                  onClick={() => {
                    setStashViewSettings({
                      ...stashViewSettings,
                      selectedTabId: tab.id,
                    });
                  }}
                >
                  {tab.name}
                </div>
              </div>
            </>
          ))}
        </div>
      </StyledCard>
    </>
  );
}
