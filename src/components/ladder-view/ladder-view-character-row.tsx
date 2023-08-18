import { StyledTooltip } from "@components/library/styled-tooltip";
import { LadderViewVectorFields } from "@models/ladder-view-models";
import Image from "next/image";

export default function LadderViewCharacterRow({
  character,
}: {
  character: LadderViewVectorFields;
}) {
  return (
    <>
      <tr>
        <td className="py-2">
          <Image
            className={
              "rounded-lg " +
              (!!character.patreonTier
                ? PATREON_BORDER_COLORS[character.patreonTier]
                : "")
            }
            src={`/assets/poe/classes/${character.class}.png`}
            alt={character.class ?? "na"}
            width={70}
            height={90}
          />
        </td>
        <td>
          <div className="flex flex-col">
            <div className="font-semibold">{character.characterName}</div>
            <div className="text-sm">{character.profileName}</div>
          </div>
        </td>
        <td>
          <div className="flex flex-col text-sm">
            <div>lvl {character.level}</div>
            <div className="text-sm">rank {character.rank}</div>
            <div className="text-sm">100k views</div>
          </div>
        </td>
        <td>
          <div className="flex flex-col">
            <div className="flex items-center">
              {character.mainSkillKeys?.map((e) => (
                <div key={e}>
                  <StyledTooltip texts={[e]} placement={"auto"}>
                    <Image
                      src={`/assets/poe/skill_icons/${encodeURIComponent(
                        e.toLowerCase()
                      )}.png`}
                      alt={character.class ?? "na"}
                      width={34}
                      height={34}
                    />
                  </StyledTooltip>
                </div>
              ))}
            </div>
          </div>
          <div className="text-sm">
            {character.weaponCategory?.replaceAll("onehand", "")}
          </div>
        </td>
        <td>
          <div className="flex flex-col space-y-1 text-sm">
            <div>{character.life} life</div>
            <div>{character.energyShield} es</div>
          </div>
        </td>
        <td>
          <div className="flex flex-col space-y-1 text-sm">
            <div>{character.armour} ar</div>
            <div>{character.evasion} ev</div>
          </div>
        </td>
        <td>
          <div className="flex flex-col space-y-1 text-sm">
            <div className="flex">
              <div className="text-blue-500">{character.int}</div>/
              <div className="text-red-500">{character.str}</div>/
              <div className="text-green-500">{character.dex}</div>
            </div>
            <div className="flex">
              <div className="text-red-500">x</div>/
              <div className="text-cyan-500">x</div>/
              <div className="text-yellow-200">x</div>/
              <div className="text-purple-500">x</div>
            </div>
          </div>
        </td>
        <td>
          <div className="grid w-fit grid-cols-3 grid-rows-2 gap-1">
            {character.keyStoneKeys?.slice(0, 6).map((e) => (
              <div key={e}>
                <StyledTooltip texts={[e]} placement={"auto"}>
                  <Image
                    src={`/assets/poe/keystones/${encodeURIComponent(
                      e.toLowerCase()
                    )}.png`}
                    alt={character.class ?? "NA"}
                    width={28}
                    height={28}
                  />
                </StyledTooltip>
              </div>
            ))}
          </div>
        </td>
        <td>
          <div className="flex">
            <div className="flex-0 grid grid-cols-2 gap-2">
              {character.topAtlasNodeTypes?.map((e) => (
                <StyledTooltip key={e} texts={[e]} placement={"auto"}>
                  <Image
                    src={LADDER_VIEW_ATLAS_ICONS[e]}
                    alt={character.class ?? "na"}
                    width={28}
                    height={28}
                  />
                </StyledTooltip>
              ))}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

export const PATREON_BORDER_COLORS = {
  Bronze: "border-4 border-yellow-500/50",
  Silver: "border-4 border-indigo-400/50",
  Gold: "border-4 border-yellow-200/50",
};

export const LADDER_VIEW_ATLAS_ICONS = {
  delve:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsdmUvRnJhY3R1cmVkRm9zc2lsIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/ffb5b47984/FracturedFossil.png",
  heist:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSGVpc3QvSGVpc3RDb2luQ3VycmVuY3kiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/987a8953f9/HeistCoinCurrency.png",
  essence:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXNzZW5jZS9NYWRuZXNzMSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/4884b879d8/Madness1.png",
  bestiary:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQmVzdGlhcnlPcmJGdWxsIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/3214b44360/BestiaryOrbFull.png",
  legion:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9NYXJha2V0aEZyYWdtZW50IiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/7c42d58a5e/MarakethFragment.png",
  harbinger:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRnJhY3R1cmluZ09yYkNvbWJpbmVkIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/bb12c8fdcc/FracturingOrbCombined.png",
  delirium:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9EZWxpcml1bVNwbGludGVyIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/ae73b9445e/DeliriumSplinter.png",
  strongboxes:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvRGl2aW5hdGlvbi9JbnZlbnRvcnlJY29uIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/f34bf8cbb5/InventoryIcon.png",
  breach:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0NoYXl1bGFzRmxhd2xlc3NCcmVhY2hzdG9uZSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/0d6f8da0ec/ChayulasFlawlessBreachstone.png",

  harvest:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0NoYXl1bGFzRmxhd2xlc3NCcmVhY2hzdG9uZSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/0d6f8da0ec/ChayulasFlawlessBreachstone.png",
  betrayal:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0NoYXl1bGFzRmxhd2xlc3NCcmVhY2hzdG9uZSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/0d6f8da0ec/ChayulasFlawlessBreachstone.png",
  abyss:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0NoYXl1bGFzRmxhd2xlc3NCcmVhY2hzdG9uZSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/0d6f8da0ec/ChayulasFlawlessBreachstone.png",
  ritual:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0NoYXl1bGFzRmxhd2xlc3NCcmVhY2hzdG9uZSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/0d6f8da0ec/ChayulasFlawlessBreachstone.png",
  metamorph:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0NoYXl1bGFzRmxhd2xlc3NCcmVhY2hzdG9uZSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/0d6f8da0ec/ChayulasFlawlessBreachstone.png",
  blight:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0NoYXl1bGFzRmxhd2xlc3NCcmVhY2hzdG9uZSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/0d6f8da0ec/ChayulasFlawlessBreachstone.png",
  incursion:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0NoYXl1bGFzRmxhd2xlc3NCcmVhY2hzdG9uZSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/0d6f8da0ec/ChayulasFlawlessBreachstone.png",
  shrines:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0NoYXl1bGFzRmxhd2xlc3NCcmVhY2hzdG9uZSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/0d6f8da0ec/ChayulasFlawlessBreachstone.png",
  expedition:
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0NoYXl1bGFzRmxhd2xlc3NCcmVhY2hzdG9uZSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/0d6f8da0ec/ChayulasFlawlessBreachstone.png",
  "rogue exiles":
    "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0NoYXl1bGFzRmxhd2xlc3NCcmVhY2hzdG9uZSIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/0d6f8da0ec/ChayulasFlawlessBreachstone.png",
};
