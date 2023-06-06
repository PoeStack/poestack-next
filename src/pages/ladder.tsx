import { useLadderViewContext } from "@contexts/ladder-view-context";
import { useEffect } from "react";
import LadderViewCharacterRow from "../components/ladder-view/ladder-view-character-row";

export default function LadderView() {
  const { load, allCharacters } = useLadderViewContext();

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-2">
        {allCharacters.map((e) => (
          <LadderViewCharacterRow key={e.name} character={e} />
        ))}
      </div>
    </>
  );
}
