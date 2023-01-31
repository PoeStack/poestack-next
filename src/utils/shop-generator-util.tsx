export default function generateShop(items) {
  console.log(items);
  const out = items?.map(
    (i) =>
      `[linkItem location="Stash${i.stashTabIndex}" league="${"Sanctum"}" x="${
        i.x
      }" y="${i.y}"] ~b/o ${Math.round(i.totalValueChaos)}/${
        i.stackSize ?? 1
      } chaos\n`
  );
  navigator.clipboard.writeText(out.join(""));
}
