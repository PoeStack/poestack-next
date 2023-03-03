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
  return (
    <StyledButton
      text={loading ? "Loading..." : `Post to TFT (coming soon)`}
      onClick={onClick}
    />
  );
}
