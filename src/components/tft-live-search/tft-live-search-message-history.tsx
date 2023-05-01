import StyledButton from "@components/library/styled-button";
import StyledCard from "@components/library/styled-card";
import { useTftLiveSearchCtx } from "@contexts/tft-live-search-context";

export function TftLiveSearchMessageHistory() {
  const { tftLiveSearchSettings, setTftLiveSearchSettings } =
    useTftLiveSearchCtx();

  return (
    <>
      <div className="space-y-2">
        <StyledCard>
          <StyledButton
            text={
              tftLiveSearchSettings.messageHistoryOpen
                ? "Listings"
                : "Message History"
            }
            onClick={() => {
              setTftLiveSearchSettings({
                ...tftLiveSearchSettings,
                messageHistoryOpen: !tftLiveSearchSettings.messageHistoryOpen,
              });
            }}
          />
        </StyledCard>
        <StyledCard>
          <table className="table-auto border-spacing-2 border-separate">
            <thead>
              <th></th>
              <th>Discord</th>
              <th>Ign</th>
              <th>Message</th>
            </thead>
            <tbody>
              {tftLiveSearchSettings.messageHistory.map((message) => (
                <>
                  <tr>
                    <td className="min-w-[100px]">
                      <StyledButton
                        text={"Copy Vouch"}
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `<@${message.userDiscordId}> +1 five-way service.`
                          );
                        }}
                      />
                    </td>
                    <td>{message.userDiscordName}</td>
                    <td>{message.userIgn}</td>
                    <td>{message.messageBody}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </StyledCard>
      </div>
    </>
  );
}
