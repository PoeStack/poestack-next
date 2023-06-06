import { LadderViewVectorFields } from "@models/ladder-view-models";

export class LadderViewVectorParser {
  private header: any;
  private values: {
    metadata: {
      types: Record<
        number,
        { type: string; storageIndex: number; index: number }
      >;
    };
    values: Record<number, Record<number, any>>;
  } | null = null;
  private entries: LadderViewVectorFields[] = [];

  private parseVectorField(entry: any[][]): LadderViewVectorFields {
    const vectorFields: LadderViewVectorFields = {};
    let index = 0;
    for (const vector of entry) {
      const metadata = this.values?.metadata?.types?.[index];
      if (metadata) {
        if (metadata.type === "general") {
          LADDER_VIEW_GENERAL_FIELD_KEYS.forEach(
            (key, i) =>
              (vectorFields[key] =
                this.values?.values[metadata.storageIndex][vector[i]])
          );
        } else {
          vectorFields[metadata.type] = vector.map(
            (valueIndex) =>
              this.values?.values[metadata.storageIndex][valueIndex]
          );
        }
      } else {
        LADDER_VIEW_RAW_FIELD_KEYS.forEach(
          (key, i) => (vectorFields[key] = vector[i])
        );
      }
      index++;
    }
    console.log(vectorFields);
    return vectorFields;
  }

  public async loadCharacters(league: string, timestamp: string) {
    const bucket = `https://poe-stack-ladder-view.nyc3.digitaloceanspaces.com/v1/vectors/${league}/vectors/${timestamp}`;
    const headerResp = await fetch(`${bucket}/header.json`);
    const valuesResp = await fetch(`${bucket}/values.json`);

    if (headerResp.ok && valuesResp.ok) {
      this.header = await headerResp.json();

      this.values = await valuesResp.json();
      const entries: any[][] = [];
      for (
        let chunk = 0;
        chunk < Math.min(this.header.totalChunks, 3);
        chunk++
      ) {
        const chunkResp = await fetch(`${bucket}/entries_${chunk}.json`);
        if (chunkResp.ok) {
          const chunkJson = await chunkResp.json();
          for (const entry of chunkJson.entries) {
            const vectorFields = this.parseVectorField(entry);
            this.entries.push(vectorFields);
          }
        }
      }
      console.log(this.values);
    }
  }
}

export const LADDER_VIEW_GENERAL_FIELD_KEYS = [
  "pantheonMajor",
  "pantheonMinor",
  "enchant",
  "weaponCategory",
  "bandit",
  "patreonTier",
  "twitchProfileName",
  "class",
];

export const LADDER_VIEW_RAW_FIELD_KEYS = [
  "characterOpaqueKey",
  "level",
  "rank",
];
