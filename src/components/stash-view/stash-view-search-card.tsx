import StyledCard from "@components/library/styled-card";
import StyledInput from "@components/library/styled-input";
import { useStashViewContext } from "@contexts/stash-view-context";

export function StashViewSearchCard() {
  const { stashViewSettings, setStashViewSettings } = useStashViewContext();

  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <StyledInput
            value={stashViewSettings.searchString}
            placeholder="Search..."
            onChange={(e) => {
              setStashViewSettings({ ...stashViewSettings, searchString: e });
            }}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-content-accent bg-gray-100 border-gray-300 rounded"
              checked={stashViewSettings.filterCheckedTabs}
              onChange={(e) => {
                setStashViewSettings({
                  ...stashViewSettings,
                  filterCheckedTabs: !stashViewSettings.filterCheckedTabs,
                });
              }}
            />
            <div>
              Filter ({stashViewSettings.checkedTabIds.length}) Selected Tabs
            </div>
          </div>
          <div>Min Quantity</div>
          <StyledInput
            type="number"
            value={stashViewSettings.minItemQuantity}
            onChange={(e) => {
              setStashViewSettings({
                ...stashViewSettings,
                minItemQuantity: e !== null ? parseInt(e) : null,
              });
            }}
          />
          <div>Min Value</div>
          <StyledInput
            type="number"
            value={stashViewSettings.minItemValue}
            onChange={(e) => {
              setStashViewSettings({
                ...stashViewSettings,
                minItemValue: e !== null ? parseInt(e) : null,
              });
            }}
          />
          <div>Min Total Value</div>
          <StyledInput
            type="number"
            value={stashViewSettings.minItemStackValue}
            onChange={(e) => {
              setStashViewSettings({
                ...stashViewSettings,
                minItemStackValue: e !== null ? parseInt(e) : null,
              });
            }}
          />
        </div>
      </StyledCard>
    </>
  );
}
