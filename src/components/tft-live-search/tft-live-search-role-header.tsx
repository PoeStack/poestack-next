import moment from "moment";
import Image from "next/image";

import { StyledTooltip } from "@components/library/styled-tooltip";

export function TftLiveSearchRoleHeader({ listing }) {
  return (
    <>
      <div className="flex space-x-1">
        <StyledTooltip
          texts={[
            listing.userDiscordDisplayRole ??
              listing.userDiscordHighestRole ??
              "None",
          ]}
          placement={"auto"}
        >
          <div className="flex space-x-1">
            {!!listing.userDiscordDisplayRole && (
              <Image
                height={25}
                width={25}
                src={`/assets/tft/roles/${listing.userDiscordDisplayRole}.png`}
                alt={""}
              />
            )}
            <div
              style={{
                color: listing.userDiscordDisplayRoleColor ?? "#f1f1f1",
              }}
              className="text-lg"
            >
              {listing.userDiscordName}
            </div>
          </div>
        </StyledTooltip>
        <div className="flex-1"></div>
        <div className="text-sm">
          {moment(listing.updatedAtTimestamp).subtract(10, "seconds").fromNow()}
        </div>
      </div>
    </>
  );
}
