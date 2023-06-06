import { LadderViewVectorFields } from "@models/ladder-view-models";
import Image from "next/image";

export default function LadderViewCharacterRow({
  character,
}: {
  character: LadderViewVectorFields;
}) {
  return (
    <>
      <div className="rounded-lg bg-surface-primary">
        <Image
          src={`/assets/poe/classes/${character.class}.png`}
          alt={character.class ?? "na"}
          width={70}
          height={90}
        />
      </div>
    </>
  );
}
