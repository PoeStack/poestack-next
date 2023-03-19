import { LadderVector } from "@utils/ladder-vector";
import { useEffect, useState } from "react"

export default function Ladder() {

    const [ladderVector, setLadderVector] = useState<LadderVector | null>(null);
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/PoeStack/poestack-public-data/master/poe/leagues/Sanctum/ladder/current.json')
            .then((v) => {
                if (v.ok) {
                    return v.json();
                }
            })
            .then((v) => { setLadderVector(new LadderVector(v)) })
    }, []);

    if (!ladderVector) {
        return <>loading...</>
    }

    return <>
        <div>{ladderVector!.entries().map((e) => <><div>{e.name}: {e.mainSkillKey}</div></>)}</div>
    </>
}