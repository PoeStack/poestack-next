import { useState } from "react";

import StyledCard from "@components/library/styled-card";
import StyledInput from "@components/library/styled-input";
import { useStashViewContext } from "@contexts/stash-view-context";

export function StashViewSearchCard() {
  const { stashViewSettings, setStashViewSettings } = useStashViewContext();

  return (
    <>
      <StyledCard className="space-y-2">
        <div className="flex">
          <StyledInput
            value={stashViewSettings.searchString}
            placeholder="Search..."
            onChange={(e) => {
              setStashViewSettings({
                ...stashViewSettings,
                searchString: e,
              });
            }}
          />
        </div>
        <div className="flex space-x-2">
          <StyledInput
            type="number"
            placeholder="Min Quantity"
            value={stashViewSettings.minItemQuantity}
            onChange={(e) => {
              setStashViewSettings({
                ...stashViewSettings,
                minItemQuantity: e !== null ? parseInt(e) : null,
              });
            }}
          />
          <StyledInput
            type="number"
            placeholder="Min Value"
            value={stashViewSettings.minItemValue}
            onChange={(e) => {
              setStashViewSettings({
                ...stashViewSettings,
                minItemValue: e !== null ? parseInt(e) : null,
              });
            }}
          />
          <StyledInput
            type="number"
            placeholder="Min Total Value"
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
