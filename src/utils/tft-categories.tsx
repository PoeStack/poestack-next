import { StashViewItemSummary } from "@generated/graphql";

export interface TftCategory {
  tags: string[];
  icon: string;
  overrideEnabled?: boolean;
  filter?: (item: StashViewItemSummary) => boolean;
}

export const TFT_CATEGORIES: Record<string, TftCategory> = {
  compasses: {
    tags: ["compass"],
    overrideEnabled: true,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ2hhcmdlZENvbXBhc3MiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/ea8fcc3e35/ChargedCompass.png",
    filter: (item) =>
      [4, 16].includes(
        item.itemGroup?.properties?.find((e) => e["key"] === "uses")?.value
      ),
  },
  "essence high": {
    tags: ["essence"],
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXNzZW5jZS9Ib3Jyb3IxIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/748d594bde/Horror1.png",
    filter: (item) =>
      [
        "shrieking",
        "deafening",
        "hysteria",
        "insanity",
        "horror",
        "delirium",
      ].some((s) => item.searchableString.includes(s)),
  },
  essence: {
    tags: ["essence"],
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXNzZW5jZS9Db250ZW1wdDYiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/332e9b32e9/Contempt6.png",
  },
  scarabs: {
    tags: ["scarab"],
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvU2NhcmFicy9UaWVyNFNjYXJhYkhhcmJpbmdlcnMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/81caefbf3f/Tier4ScarabHarbingers.png",
  },
  heist: {
    tags: ["contract", "blueprint"],
    overrideEnabled: true,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSGVpc3QvQ29udHJhY3RJdGVtIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/8262f2ca0e/ContractItem.png",
  },
  beast: {
    tags: ["beast"],
    overrideEnabled: true,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQmVzdGlhcnlPcmJGdWxsIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/3214b44360/BestiaryOrbFull.png",
  },
  fossils: {
    tags: ["fossil"],
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsdmUvR2x5cGhpY0Zvc3NpbCIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/f5b3c6edf7/GlyphicFossil.png",
  },
  catalysts: {
    tags: ["catalyst"],
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ2F0YWx5c3RzL0NoYW9zUGh5c2ljYWxDYXRhbHlzdCIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/bbdf8917e4/ChaosPhysicalCatalyst.png",
  },
  fragments: {
    tags: ["fragment"],
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0JyZWFjaEZyYWdtZW50c0NoYW9zIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/04b5c032f4/BreachFragmentsChaos.png",
  },
  cards: {
    tags: ["card"],
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvRGl2aW5hdGlvbi9JbnZlbnRvcnlJY29uIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/f34bf8cbb5/InventoryIcon.png",
  },
  "delirium orbs": {
    tags: ["delirium orb"],
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsaXJpdW0vRGVsaXJpdW1PcmJTY2FyYWJzIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/fa4c5160ca/DeliriumOrbScarabs.png",
  },
  logbooks: {
    tags: ["logbook"],
    overrideEnabled: true,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvTWFwcy9FeHBlZGl0aW9uQ2hyb25pY2xlMyIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/2802fe605e/ExpeditionChronicle3.png",
  },
  oils: {
    tags: ["oil"],
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvT2lscy9Hb2xkZW5PaWwiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/69094a06e9/GoldenOil.png",
  },
  incubators: {
    tags: ["incubator"],
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSW5jdWJhdGlvbi9JbmN1YmF0aW9uQXJtb3VyIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/637c41a730/IncubationArmour.png",
  },
};
