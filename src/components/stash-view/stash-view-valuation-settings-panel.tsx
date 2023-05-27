import { useEffect, useState } from "react";

import { gql, useMutation } from "@apollo/client";
import StyledButton from "@components/library/styled-button";
import StyledInput from "@components/library/styled-input";
import StyledSelect2 from "@components/library/styled-select-2";
import { useStashViewContext } from "@contexts/stash-view-context";
import { usePoeStackAuth } from "@contexts/user-context";
import { GeneralUtils } from "@utils/general-util";

export default function StashViewValuationSettingsPanel() {
  const { stashViewSettings, setStashViewSettings } = useStashViewContext();
  const { profile, refetchMyProfile } = usePoeStackAuth();

  const [lp, setLp] = useState(10);

  useEffect(() => {
    setLp(profile?.preferences?.listingPercent ?? 10);
  }, [profile?.preferences?.listingPercent, setLp]);

  const [updateLp] = useMutation(gql`
    mutation UpdatePreferenceListingPercent($listingPercent: Float!) {
      updatePreferenceListingPercent(listingPercent: $listingPercent)
    }
  `);

  return (
    <>
      <div className="flex-col space-y-1">
        <div>Valuation Type</div>
        <StyledSelect2
          selected={stashViewSettings.selectedValuationType ?? "stock"}
          onSelectChange={(e) => {
            setStashViewSettings({
              ...stashViewSettings,
              selectedValuationType: e,
            });
          }}
          items={["stock", "basic"]}
        />
        <div>Listing Percent</div>
        <StyledInput
          type="number"
          value={lp}
          onChange={(e) => {
            setLp(Math.min(Math.max(1, parseInt(e)), 99));
          }}
        />
        <StyledButton
          className={
            lp === (profile?.preferences?.listingPercent ?? 10) ? "hidden" : ""
          }
          text={"Save"}
          onClick={() => {
            updateLp({
              variables: { listingPercent: lp },
              onCompleted() {
                refetchMyProfile();
              },
            });
          }}
        />
      </div>
    </>
  );
}
