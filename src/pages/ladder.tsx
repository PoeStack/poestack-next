import StyledPaginate from "@components/library/styled-paginate";
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
      <table className="min-w-full bg-surface-primary">
        <thead>
          <tr>
            <th scope="col" className="text-left text-sm font-semibold"></th>
            <th scope="col" className="text-left text-sm font-semibold">
              Name
            </th>
            <th scope="col" className="text-left text-sm font-semibold">
              Progress
            </th>
            <th scope="col" className="text-left text-sm font-semibold">
              Skills
            </th>
            <th
              colSpan={3}
              scope="col"
              className="text-center text-sm font-semibold"
            >
              Player Defence
            </th>
            <th scope="col" className="text-left text-sm font-semibold">
              Keystones
            </th>
            <th scope="col" className="text-left text-sm font-semibold">
              Atlas Strategy
            </th>
            <th scope="col" className="text-left text-sm font-semibold"></th>
            <th scope="col" className="text-left text-sm font-semibold"></th>
            <th scope="col" className="text-left text-sm font-semibold"></th>
          </tr>
        </thead>
        <tbody className="space-y-2 divide-y divide-slate-700/50">
          {allCharacters.slice(0, 20).map((e) => (
            <LadderViewCharacterRow key={e.characterName} character={e} />
          ))}
        </tbody>

        <StyledPaginate
          currentSkip={0}
          onSelectionChange={(_) => {}}
          limit={25}
          hasMore={false}
        />
      </table>
    </>
  );
}
