import StyledButton from "@components/styled-button";
import { usePoeStackAuth } from "@contexts/user-context";
import { useRouter } from "next/router";

export default function TftOneClickButton({
  loading,
  onClick,
}: {
  loading: boolean;
  onClick: () => void;
}) {
  const { profile } = usePoeStackAuth();
  const router = useRouter();

  if (!profile?.discordUserId) {
    return (
      <StyledButton
        text={"Connect Discord for TFT One-Click"}
        onClick={() => {
          window.open(
            "https://discord.com/api/oauth2/authorize?client_id=1075074940275019836&redirect_uri=https%3A%2F%2Fpoestack.com%2Fdiscord%2Fconnected&response_type=code&scope=identify",
            "_ blank"
          );
        }}
      />
    );
  }

  return (
    <StyledButton
      text={loading ? "Loading..." : `Post to TFT (coming soon)`}
      onClick={onClick}
    />
  );
}
