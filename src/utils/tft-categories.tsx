import { StashViewExporters } from "./stash-view-exporters";

export interface TftCategory {
  tags: string[];
  export: any;
  icon: string;
}

export const TFT_CATEGORIES: Record<string, TftCategory> = {
  compasses: {
    tags: ["compass"],
    export: StashViewExporters.exportTftCompassesBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ2hhcmdlZENvbXBhc3MiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/ea8fcc3e35/ChargedCompass.png"
  },
  essence: {
    tags: ["essence"],
    export: StashViewExporters.exportTftGenericBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXNzZW5jZS9Db250ZW1wdDYiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/332e9b32e9/Contempt6.png",
  },
  fossils: {
    tags: ["fossil"],
    export: StashViewExporters.exportTftGenericBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsdmUvR2x5cGhpY0Zvc3NpbCIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/f5b3c6edf7/GlyphicFossil.png",
  },
  scarabs: {
    tags: ["scarab"],
    export: StashViewExporters.exportTftGenericBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvU2NhcmFicy9UaWVyNFNjYXJhYkhhcmJpbmdlcnMiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/81caefbf3f/Tier4ScarabHarbingers.png",
  },
  catalysts: {
    tags: ["catalyst"],
    export: StashViewExporters.exportTftGenericBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQ2F0YWx5c3RzL0NoYW9zUGh5c2ljYWxDYXRhbHlzdCIsInciOjEsImgiOjEsInNjYWxlIjoxfV0/bbdf8917e4/ChaosPhysicalCatalyst.png",
  },
  beasts: {
    tags: ["beast"],
    export: StashViewExporters.exportTftGenericBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQmVzdGlhcnlPcmJGdWxsIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/3214b44360/BestiaryOrbFull.png",
  },
  fragments: {
    tags: ["fragment"],
    export: StashViewExporters.exportTftGenericBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvQnJlYWNoL0JyZWFjaEZyYWdtZW50c0NoYW9zIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/04b5c032f4/BreachFragmentsChaos.png"
  },
  cards: {
    tags: ["card"],
    export: StashViewExporters.exportTftGenericBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvRGl2aW5hdGlvbi9JbnZlbnRvcnlJY29uIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/f34bf8cbb5/InventoryIcon.png",
  },
  "delirium orbs": {
    tags: ["delirium orb"],
    export: StashViewExporters.exportTftGenericBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsaXJpdW0vRGVsaXJpdW1PcmJTY2FyYWJzIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/fa4c5160ca/DeliriumOrbScarabs.png",
  },
  oils: {
    tags: ["oil"],
    export: StashViewExporters.exportTftGenericBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvT2lscy9Hb2xkZW5PaWwiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/69094a06e9/GoldenOil.png",
  },
  incubators: {
    tags: ["incubator"],
    export: StashViewExporters.exportTftGenericBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvSW5jdWJhdGlvbi9JbmN1YmF0aW9uQXJtb3VyIiwidyI6MSwiaCI6MSwic2NhbGUiOjF9XQ/637c41a730/IncubationArmour.png",
  },
  resonators: {
    tags: ["resonator"],
    export: StashViewExporters.exportTftGenericBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRGVsdmUvUmVyb2xsMngyQyIsInciOjIsImgiOjIsInNjYWxlIjoxfV0/584267701b/Reroll2x2C.png",
  },
  artifacts: {
    tags: ["artifacts"],
    export: StashViewExporters.exportTftGenericBulk,
    icon: "https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQ3VycmVuY3kvRXhwZWRpdGlvbi9CYXJ0ZXJSZWZyZXNoQ3VycmVuY3kiLCJ3IjoxLCJoIjoxLCJzY2FsZSI6MX1d/bf3e6fbe8f/BarterRefreshCurrency.png",
  },
};
