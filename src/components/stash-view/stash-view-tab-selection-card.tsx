import StyledCard from "@components/styled-card";
import { PoeStashTab } from "@generated/graphql";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { StashViewSettings } from "pages/poe/stash-view";

export function StashViewTabSelectionCard({
  tabs,
  stashViewSettings,
  setStashViewSettings,
  refreshStashTabs,
}: {
  tabs: PoeStashTab[];
  stashViewSettings: StashViewSettings;
  setStashViewSettings: (e: StashViewSettings) => void;
  refreshStashTabs: () => void;
}) {
  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-1 max-h-[400px]">
          <div className="flex">
            <div>Stash Tabs</div>
            <div
              className="absolute right-2 w-6 h-6"
              onClick={() => {
                refreshStashTabs?.();
              }}
            >
              <ArrowPathIcon />
            </div>
          </div>
          <div className="flex flex-col space-y-1  overflow-y-auto">
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
        </div>
      </StyledCard>
    </>
  );
}
