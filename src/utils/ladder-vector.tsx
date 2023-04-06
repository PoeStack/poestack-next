import { CustomLadderGroup } from "@generated/graphql";

export class LadderVectorUtil {

    public static parse(rawVector: LadderVectorRaw): LadderVector {
        const ladderVector: LadderVector = new LadderVector();

        const itemKeysIndex = Object.entries(rawVector.types).find((e) => e[1] === 'itemKeys')?.[0];

        while (rawVector.vectors.length) {
            const vector: any[][] = rawVector.vectors.shift()!;

            const out: LadderVectorEntry = {
                characterId: "",
                snapshotId: "",
                name: "",
                pobDps: 0,
                level: 0,
                life: 0,
                energyShield: 0,
                totalValueChaos: 0,
                totalValueDivine: 0,
                itemKeys: [],
                passiveNodeKeys: [],
                topItemNames: [],
                topItemIcons: [],
                characterClass: "",
                mainSkillKey: "",
                twitchProfileName: "",
                userId: ""
            };

            for (const subVector of vector) {
                if (subVector[0] === 'r') {
                    out.characterId = subVector[1];
                    out.snapshotId = subVector[2];
                    out.name = subVector[3];
                    out.pobDps = subVector[4];
                    out.level = subVector[5];
                    out.life = subVector[6];
                    out.energyShield = subVector[7];
                    out.totalValueChaos = subVector[8];
                    out.totalValueDivine = subVector[9];
                    out.userId = subVector[10];
                    out.twitchProfileName = subVector[11];
                } else {
                    const type = subVector[0];
                    const typeKey = rawVector.types[type];

                    if (typeKey === 'general') {
                        out.characterClass = rawVector.values["" + type]?.["" + subVector[1]];
                        out.mainSkillKey = rawVector.values["" + type]?.["" + subVector[2]];

                        if (out.mainSkillKey === "null") out.mainSkillKey = undefined;
                    } else {
                        const storageKey = typeKey === 'topItemNames' ? itemKeysIndex : type;
                        for (const vKey of subVector.slice(1)) {
                            const v = rawVector.values["" + storageKey]?.["" + vKey];
                            out[typeKey]?.push(v);
                        }
                    }
                }
            }

            ladderVector.entires.push(out);
        }

        ladderVector.entires.sort((a, b) => b.level - a.level);

        ladderVector.entires.forEach((e) => {
            ladderVector.classAggregation[e.characterClass] = 0;
            ladderVector.mainSkillKeyAggregation[e.mainSkillKey ?? 'na'] = 0;
            e.itemKeys.forEach((ik) => ladderVector.itemKeyAggregation[ik] = 0);
        });

        return ladderVector;
    }


    private static executeFilter(query: string | string[] | undefined, values: (string | undefined | null)[]) {
        const filteredValues: string[] = values.filter((e) => !!e) as string[];
        const flatQuery = [query ?? ''].flatMap((e) => e).filter((e) => e?.length);

        const include = flatQuery.filter((e) => !e.startsWith("!"));
        const exclude = flatQuery.filter((e) => e.startsWith("!"));
        if (include.length && !filteredValues.length) {
            return false;
        }
        if (include.length && !filteredValues.some((item) => include.includes(item))) {
            return false;
        }
        if (exclude.length && filteredValues.some((item) => exclude.includes(`!${item}`))) {
            return false;
        }
        return true;
    }

    public static executeSearch(baseVector: LadderVector, search: LadderVectorSearch, ladderGroup: CustomLadderGroup | null): LadderVector {
        const nextVector = baseVector.copy();

        const validUserIds = ladderGroup?.members.map((e) => e.userId) ?? [];

        nextVector.entires = nextVector.entires.filter((vector) => {
            if (!LadderVectorUtil.executeFilter(search.class, [vector.characterClass])) {
                return false;
            }

            if (!LadderVectorUtil.executeFilter(search.skill, [vector.mainSkillKey])) {
                return false;
            }

            if (!LadderVectorUtil.executeFilter(search.item, vector.itemKeys)) {
                return false;
            }

            if(validUserIds.length && !validUserIds.includes(vector.userId)) {
                return false;
            }

            return true;
        })

        nextVector.entires.forEach((e) => {
            nextVector.classAggregation[e.characterClass] = nextVector.classAggregation[e.characterClass] + 1;
            nextVector.mainSkillKeyAggregation[e.mainSkillKey ?? 'na'] = nextVector.mainSkillKeyAggregation[e.mainSkillKey ?? 'na'] + 1;
            e.itemKeys.forEach((ik) => nextVector.itemKeyAggregation[ik] = nextVector.itemKeyAggregation[ik] + 1);
        })

        return nextVector;
    }
}

export class LadderVector {
    entires: LadderVectorEntry[] = [];

    classAggregation: Record<string, number> = {};
    itemKeyAggregation: Record<string, number> = {};
    mainSkillKeyAggregation: Record<string, number> = {};

    public copy(): LadderVector {
        const copy = new LadderVector();
        copy.entires = [...this.entires];
        copy.classAggregation = { ...this.classAggregation };
        copy.itemKeyAggregation = { ...this.itemKeyAggregation };
        copy.mainSkillKeyAggregation = { ...this.mainSkillKeyAggregation };
        return copy;
    }
}

export interface LadderVectorSearch {
    class?: string[],
    skill?: string[],
    item?: string[],
}

export interface LadderVectorEntry {
    characterId: string;
    snapshotId: string;
    name: string;
    characterClass: string;
    mainSkillKey?: string;
    pobDps: number;
    level: number;
    life: number;
    energyShield: number;
    totalValueChaos: number;
    totalValueDivine: number;
    itemKeys: string[]
    passiveNodeKeys: string[]
    topItemNames: string[]
    topItemIcons: string[]
    twitchProfileName: string;
    userId: string;
}

export interface LadderVectorRaw {
    vectors: any[][];
    types: Record<number, any>;
    values: Record<number, any>;
}