import { useRouter } from "next/router";
import { useState } from "react";

import { gql, useQuery } from "@apollo/client";
import StyledCard from "@components/library/styled-card";
import StyledInput from "@components/library/styled-input";
import StyledLoading from "@components/library/styled-loading";
import { POE_LEAGUES } from "@contexts/league-context";
import { LivePricingSummaryEntry } from "@generated/graphql";

export default function CompassesEv() {
  const router = useRouter();

  const [sextantValue, setSextantValue] = useState<number>(7);
  const [minSaleValue, setMinSaleValue] = useState<number>(0);
  const [blockedWeight, setBlockedWeight] = useState<number>(3000);
  const [valueMultiplier, setValueMultiplier] = useState<number>(100);

  const [livePricingEntires, setLivePricingEntires] = useState<
    LivePricingSummaryEntry[]
  >([]);
  useQuery(
    gql`
      query CompassEvPrices($search: LivePricingSummarySearch!) {
        livePricingSummarySearch(search: $search) {
          entries {
            itemGroup {
              hashString
            }
            valuation {
              value
            }
            stockValuation {
              value
            }
          }
        }
      }
    `,
    {
      variables: {
        search: {
          league: router.query.league ?? POE_LEAGUES[0],
          itemGroupHashStrings: [
            ...COMPASSES.map((e) => e.hashString),
            SEXTANT_HASH,
          ],
          limit: 100,
          quantityMin: router.query.stockQuantity
            ? parseInt(router.query.stockQuantity as string)
            : 25,
        },
      },
      onCompleted(data) {
        setLivePricingEntires(data.livePricingSummarySearch?.entries);

        setSextantValue(
          data.livePricingSummarySearch?.entries?.find(
            (e) => e.itemGroup.hashString === SEXTANT_HASH
          )?.valuation?.value ?? 7
        );
      },
    }
  );

  if (!livePricingEntires.length) {
    return <StyledLoading />;
  }

  const totalWeight =
    COMPASSES.reduce((p, c) => p + c.weight, 0) - blockedWeight;

  COMPASSES.forEach((e) => {
    e.probability = e.weight / totalWeight;
    e.value =
      (livePricingEntires.find((v) => v.itemGroup.hashString === e.hashString)
        ?.valuation?.value ?? 0) *
      (valueMultiplier / 100);
    e.weightedValue = e.value * e.probability;
  });

  const totalWeightedValue = COMPASSES.filter(
    (e) => (e.value ?? 0) >= minSaleValue
  ).reduce((p, c) => p + (c.weightedValue ?? 0), 0);
  COMPASSES.sort((a, b) => b.value! - a.value!);

  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <div>
            Expected Value Per Click: {totalWeightedValue - sextantValue - 1}{" "}
            Chaos
          </div>
          <div className="flex space-x-2 items-center">
            <div>Sextant Value</div>
            <StyledInput
              type="number"
              value={sextantValue}
              onChange={(e) => {
                setSextantValue(e);
              }}
            />
          </div>
          <div className="flex space-x-2 items-center">
            <div>Value Multiplier (%)</div>
            <StyledInput
              type="number"
              value={valueMultiplier}
              onChange={(e) => {
                setValueMultiplier(e);
              }}
            />
          </div>
          <div className="flex space-x-2 items-center">
            <div>Blocked Weight</div>
            <StyledInput
              type="number"
              value={blockedWeight}
              onChange={(e) => {
                setBlockedWeight(e);
              }}
            />
          </div>
          <div className="flex space-x-2 items-center">
            <div>Min Sale Value</div>
            <StyledInput
              type="number"
              value={minSaleValue}
              onChange={(e) => {
                setMinSaleValue(e);
              }}
            />
          </div>
        </div>
        <table className="divide-y divide-gray-700">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
              >
                Weight
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
              >
                Probability
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
              >
                Value
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
              >
                Weighted Value
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPASSES.map((compass) => {
              return (
                <>
                  <tr
                    className={
                      compass.value! < minSaleValue ? "text-red-600" : ""
                    }
                  >
                    <td>{compass.displayName}</td>
                    <td>{compass.weight}</td>
                    <td>{compass.probability! * 100}</td>
                    <td>{compass.value}</td>
                    <td>{compass.weightedValue}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </StyledCard>
    </>
  );
}

const SEXTANT_HASH = "2d6cc40c05b48f5cfa58fb21be3dfdef8f235c8b";

const COMPASSES: {
  key: string;
  hashString: string;
  displayName: string;
  weight: number;
  probability?: number;
  value?: number;
  weightedValue?: number;
}[] = [
  {
    key: "the first 3 possessed monsters drop an additional polished scarab your maps contain an additional tormented betrayer compass",
    hashString: "4fe4e24cc5ae32c792f0ad5ea6f8147b59e1a810",
    displayName: "Polished Scarab",
    weight: 175,
  },
  {
    key: "your maps contain a mirror of delirium compass",
    hashString: "804e8c201669e384e61e16b76881ff823d6e897e",
    displayName: "Mirror of Delirium",
    weight: 100,
  },
  {
    key: "rerolling favours at ritual altars in your maps has no cost the first 1 time compass",
    hashString: "5441137124f4f653d612513bc1e80d002d12bdcb",
    displayName: "Ritual Rerolling",
    weight: 50,
  },
  {
    key: "area contains a smuggler's cache compass",
    hashString: "722c32190de71283a44351df89b704f81ecd2318",
    displayName: "Smuggler's Cache",
    weight: 250,
  },
  {
    key: "25% increased magic pack size compass",
    hashString: "ef3024d1a80ac4a93d705848eb39905abaa2a58e",
    displayName: "Magic Pack Size",
    weight: 500,
  },
  {
    key: "slaying enemies close together can attract monsters from beyond this realm 25% increased beyond demon pack size in your maps compass",
    hashString: "87fc5eef04ad9c1041cc6f0b8688721bd6ebb77a",
    displayName: "Beyond",
    weight: 250,
  },
  {
    key: "your maps contain an additional abyss your maps can contain abysses compass",
    hashString: "07faa800e46159cfe3b7ae4ce7c16cca4514ae6f",
    displayName: "Abyss",
    weight: 250,
  },
  {
    key: "maps found in your maps are corrupted with 8 modifiers compass",
    hashString: "21dad4b2673e0c8a3addf8d05a82cdfff277b35f",
    displayName: "8 Modifiers",
    weight: 50,
  },
  {
    key: "your maps contain ritual altars compass",
    hashString: "8cc914d373c400a34ac453bf2f99961fb87c2316",
    displayName: "Ritual Altars",
    weight: 100,
  },
  {
    key: "map bosses drop 1 additional unique item compass",
    hashString: "02dcd7827996d26372bd9f712096792d0ca1b804",
    displayName: "Boss Drop Unique",
    weight: 500,
  },
  {
    key: "your maps contain an additional gloom shrine 50% increased duration of shrine effects on players in your maps compass",
    hashString: "d57b82a1c5d1780a467984be17694e1510d2034b",
    displayName: "Gloom Shrine",
    weight: 1000,
  },
  {
    key: "the first 3 possessed monsters drop an additional gilded scarab your maps contain an additional tormented betrayer compass",
    hashString: "f6c0f3a5b4e646fa67a385300c2ba339c1d09a75",
    displayName: "Gilded Scarab",
    weight: 60,
  },
  {
    key: "catalysts dropped by metamorphs in your maps are duplicated metamorphs in your maps have 100% more life compass",
    hashString: "e495cd42d915b526bbd06f03e4ac7dcd12614c3f",
    displayName: "Catalysts Duplicate",
    weight: 50,
  },
  {
    key: "create a copy of beasts captured in your maps compass",
    hashString: "d521f1d95f879f7f1050e3ded0a56681250d7409",
    displayName: "Copy of Beasts",
    weight: 50,
  },
  {
    key: "your maps contain an additional resonating shrine 50% increased duration of shrine effects on players in your maps compass",
    hashString: "7859e7d77eb4ab04180673faed5c20821bec4161",
    displayName: "Resonating Shrine",
    weight: 1000,
  },
  {
    key: "your maps contain 6 additional packs of corrupted vaal monsters items dropped by corrupted vaal monsters in your maps have 25% chance to be corrupted compass",
    hashString: "6e5b9ee72ef5e91a71aa4287bf02aaa57f4e3989",
    displayName: "Vaal Monsters Items Corrupted",
    weight: 250,
  },
  {
    key: "your maps contain a blight encounter compass",
    hashString: "b254622ed5eb29503e25e48f72af8a51faf654fa",
    displayName: "Blight",
    weight: 250,
  },
  {
    key: "the first 3 possessed monsters drop an additional unique item your maps contain an additional tormented graverobber compass",
    hashString: "f4aa9a710d991b1fa9c9625a7c37da0b58de0017",
    displayName: "Tormented Graverobber",
    weight: 250,
  },
  {
    key: "breaches in your maps belong to xoph breaches in your maps contain 3 additional clasped hands compass",
    hashString: "316854331cafa2b3e3b073666b16d18d29462f6a",
    displayName: "Xoph",
    weight: 50,
  },
  {
    key: "breaches in your maps belong to esh breaches in your maps contain 3 additional clasped hands compass",
    hashString: "6072be35b7ec2c7719f1f4ab95474258216a35b3",
    displayName: "Esh",
    weight: 50,
  },
  {
    key: "your maps contain jun compass",
    hashString: "0bcbc6d797812193afc48d7dc95bc982b7bde164",
    displayName: "Jun",
    weight: 125,
  },
  {
    key: "players' vaal skills do not apply soul gain prevention your maps contain 6 additional packs of corrupted vaal monsters compass",
    hashString: "b043eac1a6b73180fe21affcf5a30541c49bb2a1",
    displayName: "Soul Gain Prevention",
    weight: 250,
  },
  {
    key: "breaches in your maps belong to uul-netol breaches in your maps contain 3 additional clasped hands compass",
    hashString: "c2378e83a6c3ac5db427bbb13c06c59c86050852",
    displayName: "Uul-Netol",
    weight: 50,
  },
  {
    key: "100% increased intelligence gained from immortal syndicate targets encountered in your maps compass",
    hashString: "5da37a3b24becb8c85e24732d7f77efd0567ee36",
    displayName: "Syndicate Intelligence",
    weight: 50,
  },
  {
    key: "map bosses are accompanied by bodyguards an additional map drops on completing your maps compass",
    hashString: "0114fd099c915185a02c470699d0c08b3f771e8f",
    displayName: "Bodyguards",
    weight: 250,
  },
  {
    key: "delirium reward bars fill 100% faster in your maps compass",
    hashString: "5ce9f3063dfc14dbf82553c9bd53ff8e180ec9ff",
    displayName: "Delirium Reward",
    weight: 50,
  },
  {
    key: "your maps contain the sacred grove compass",
    hashString: "72d45300a992c86e464065878dcf6108fcb629c9",
    displayName: "Sacred Grove",
    weight: 100,
  },
  {
    key: "players gain an additional vaal soul on kill your maps contain 6 additional packs of corrupted vaal monsters compass",
    hashString: "f2bece1e9f402e7f9baf3964d0f725dcbe1189da",
    displayName: "Vaal Soul on Kill",
    weight: 500,
  },
  {
    key: "player's life and mana recovery from flasks are instant your maps contain 6 additional packs of monsters that heal compass",
    hashString: "f2d808a3631f74b17c081af9ca208264109409a7",
    displayName: "Flasks Instant",
    weight: 1000,
  },
  {
    key: "your maps contain 25 additional clusters of mysterious barrels compass",
    hashString: "b4dce28fb829c095c52214772e99d2eef07964f7",
    displayName: "Mysterious Barrels",
    weight: 250,
  },
  {
    key: "breaches in your maps belong to tul breaches in your maps contain 3 additional clasped hands compass",
    hashString: "00c86ad48fc1c4d1e2052e93261ab1de364be50e",
    displayName: "Tul",
    weight: 50,
  },
  {
    key: "your maps contain 6 additional packs of monsters that convert when killed compass",
    hashString: "c81a9f9f78bdbb4d69febe1c57a2ee1730d0c703",
    displayName: "Convert Monsters",
    weight: 1000,
  },
  {
    key: "your magic maps contain 4 additional packs of magic monsters your normal maps contain 4 additional packs of normal monsters your rare maps contain 4 additional rare monster packs compass",
    hashString: "52d25e9670dcf67fb768c99b5e3f3a5ffdc26856",
    displayName: "Rare Map Rare Packs",
    weight: 1000,
  },
  {
    key: "players and monsters take 12% increased chaos damage your maps contain 6 additional packs of monsters that deal chaos damage compass",
    hashString: "9f3fa39a229908805846f69bcc796613a7a99f5d",
    displayName: "Chaos Monsters",
    weight: 1000,
  },
  {
    key: "players and their minions cannot take reflected damage your maps contain 4 additional packs with mirrored rare monsters compass",
    hashString: "a774d859f50d8ac7f39b6590f9413d89da1f8d99",
    displayName: "Reflected",
    weight: 1000,
  },
  {
    key: "lifeforce dropped by harvest monsters in your maps is duplicated harvest monsters in your maps have 100% more life harvests in your maps contain at least one crop of purple plants compass",
    hashString: "d618c376bdd8b8d2efd5571b569fea40ea2e99ab",
    displayName: "Purple Plants",
    weight: 50,
  },
  {
    key: "rogue exiles deal 20% increased damage rogue exiles drop 2 additional jewels rogue exiles in your maps have 20% increased life your maps are inhabited by 2 additional rogue exiles compass",
    hashString: "8e33443c65672f377ca710b6c881742c9d349a40",
    displayName: "Rogue Exiles",
    weight: 500,
  },
  {
    key: "players and monsters take 12% increased physical damage your maps contain 6 additional packs of monsters that deal physical damage compass",
    hashString: "b4e5267341b2204c9e24a9247074a4de71bc3aac",
    displayName: "Physical Monsters",
    weight: 1000,
  },
  {
    key: "monsters imprisoned by essences have a 50% chance to contain a remnant of corruption your maps contain an additional essence compass",
    hashString: "26797cd38c9a2fe5b6a23ce400cabe8c868c5e4a",
    displayName: "Essence",
    weight: 500,
  },
  {
    key: "final map boss in each map drops an additional conqueror map map bosses have 200% more life map bosses deal 100% more damage compass",
    hashString: "d43769b6ceccfb6b23afc80da6dd8499ad30a4ba",
    displayName: "Conqueror Map",
    weight: 50,
  },
  {
    key: "map bosses deal 20% increased damage your maps have 20% quality compass",
    hashString: "4c2e1b519f68b79acc7613672e691ecee0c579ab",
    displayName: "Map 20% Quality",
    weight: 500,
  },
  {
    key: "the first 3 possessed monsters drop an additional rusted scarab your maps contain an additional tormented betrayer compass",
    hashString: "a015cbc81e2e37ebe0d55ba1b60d61b9d94adc61",
    displayName: "Rusted Scarab",
    weight: 520,
  },
  {
    key: "area contains metamorph monsters compass",
    hashString: "4ea0f5dc296c2ed09243060ae82c3e3ecb511010",
    displayName: "Metamorph",
    weight: 250,
  },
  {
    key: "players and monsters take 12% increased lightning damage your maps contain 6 additional packs of monsters that deal lightning damage compass",
    hashString: "53ee54d8584428742f958010ace9562cbdaedbba",
    displayName: "Lightning Monsters",
    weight: 1000,
  },
  {
    key: "the first 3 possessed monsters drop an additional map your maps contain an additional tormented heretic compass",
    hashString: "fb615b4c897987f2ace1a858bfa78027050fe457",
    displayName: "Tormented Heretic",
    weight: 250,
  },
  {
    key: "your maps contain alva compass",
    hashString: "d2fcc5ce3e9c7dcf72caf5f0ad9e85622db052cc",
    displayName: "Alva",
    weight: 125,
  },
  {
    key: "map bosses of your corrupted maps drop 2 additional vaal items items found in your maps have 5% chance to be corrupted compass",
    hashString: "59db9bddacb1b747928013dec8d7dac0f853a321",
    displayName: "Boss Drop Vaal",
    weight: 500,
  },
  {
    key: "unique monsters drop corrupted items compass",
    hashString: "4972b425e5c5dbbf1f70758780f67ad5934f5fdc",
    displayName: "Unique Monsters Drop Corrupted",
    weight: 250,
  },
  {
    key: "map bosses are accompanied by a mysterious harbinger map bosses drop additional currency shards harbingers in your maps drop additional currency shards compass",
    hashString: "9fddac84d0dfb71451d16d85d968753f8e30ec3b",
    displayName: "Mysterious Harbinger",
    weight: 250,
  },
  {
    key: "your maps contain einhar compass",
    hashString: "68a5ea72965ca53fda1a8246556fbe1adf4c02e7",
    displayName: "Einhar",
    weight: 125,
  },
  {
    key: "legion monsters in your maps have 100% more life splinters and emblems dropped by legion monsters in your maps are duplicated compass",
    hashString: "afc086120fabd9ff4940aa35a19a5144d41d7082",
    displayName: "Splinters Emblems Duplicate",
    weight: 50,
  },
  {
    key: "lifeforce dropped by harvest monsters in your maps is duplicated harvest monsters in your maps have 100% more life harvests in your maps contain at least one crop of blue plants compass",
    hashString: "54a29c85a329a51d4c10a252b413af93579d0c1a",
    displayName: "Blue Plants",
    weight: 50,
  },
  {
    key: "your maps contain niko compass",
    hashString: "96d238edadc58fb4ef2838fc1a5377696e3eb3c9",
    displayName: "Niko",
    weight: 125,
  },
  {
    key: "players and monsters take 12% increased cold damage your maps contain 6 additional packs of monsters that deal cold damage compass",
    hashString: "3fc477e66d835f3913f80dd166b8222e10c7273f",
    displayName: "Cold Monsters",
    weight: 1000,
  },
  {
    key: "players and monsters take 12% increased fire damage your maps contain 6 additional packs of monsters that deal fire damage compass",
    hashString: "d49c61f7ef786af94749acd3615263f6b9870ed6",
    displayName: "Fire Monsters",
    weight: 1000,
  },
  {
    key: "your maps can contain breaches your maps contain an additional breach compass",
    hashString: "b03ea6ad8f1a65af4df49322086b71b947692e5e",
    displayName: "Breach",
    weight: 250,
  },
  {
    key: "your maps contain 2 additional strongboxes strongboxes in your maps are corrupted strongboxes in your maps are at least rare compass",
    hashString: "17434c036c638553c7b60d64c9edc4233f3d3929",
    displayName: "Strongbox Corrupted",
    weight: 500,
  },
  {
    key: "your maps contain hunted traitors compass",
    hashString: "dc45f867b7ba129ca847edc8d89397e0f5888272",
    displayName: "Hunted Traitors",
    weight: 250,
  },
  {
    key: "strongbox monsters are enraged strongbox monsters have 500% increased item quantity your maps contain an additional strongbox compass",
    hashString: "093c0eb9dbb1cac474ca1d98d69e84348a9ade1d",
    displayName: "Strongbox Enraged",
    weight: 250,
  },
  {
    key: "your maps contain 100% increased number of runic monster markers compass",
    hashString: "4ee2f6fa568bce251ded12e9a71c453479fb79cc",
    displayName: "Runic Monster Markers",
    weight: 50,
  },
  {
    key: "your maps contain an additional legion encounter compass",
    hashString: "dfd58dd74be6ef8bfb4fa53fbcb6ebfd40aabcde",
    displayName: "Legion",
    weight: 250,
  },
  {
    key: "breaches in your maps belong to chayula breaches in your maps contain 3 additional clasped hands compass",
    hashString: "01dc99bb036ca3cb150057991229d5dc26b93fe7",
    displayName: "Chayula",
    weight: 50,
  },
  {
    key: "lifeforce dropped by harvest monsters in your maps is duplicated harvest monsters in your maps have 100% more life harvests in your maps contain at least one crop of yellow plants compass",
    hashString: "03f0bb1bbfd25ae35665b29a33d7ef1dccf79e27",
    displayName: "Yellow Plants",
    weight: 50,
  },
  {
    key: "non-unique heist contracts found in your maps have an additional implicit modifier compass",
    hashString: "552f6c2a3988dba7941ca9651cfc1d23d1b5410a",
    displayName: "Contracts Implicit",
    weight: 50,
  },
  {
    key: "map bosses have 20% increased life quality bonus of your maps also applies to rarity of items found compass",
    hashString: "79dc8e562172b9c99bf006737a83c08af53df2bb",
    displayName: "Map Quality to Rarity",
    weight: 500,
  },
  {
    key: "your maps are alluring compass",
    hashString: "4a4840d5bccb3457e67e62e506799e64ab3bd937",
    displayName: "Alluring",
    weight: 10,
  },
  {
    key: "oils found in your maps are 1 tier higher cost of building and upgrading blight towers in your maps is doubled compass",
    hashString: "7eb4e1fb4cd36278f2ea1fff098b77ebaeff2105",
    displayName: "Oils Tier",
    weight: 50,
  },
];
