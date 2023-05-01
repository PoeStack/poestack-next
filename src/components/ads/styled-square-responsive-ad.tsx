import { Adsense } from "@ctrl/react-adsense";

export default function FixedAds() {
  return (
    <>
      <div>
        <div className="fixed z-50 top-28 right-[1%] w-[150px] h-[500px]">
          <Adsense
            client="ca-pub-1917075558725173"
            slot="4469612839"
            style={{ display: "block" }}
            format="auto"
            responsive="true"
          />
        </div>
        <div className="hidden 2xl:visible fixed z-50 top-28 left-[9%] w-[150px] h-[500px]">
          <Adsense
            client="ca-pub-1917075558725173"
            slot="4469612839"
            style={{ display: "block" }}
            format="auto"
            responsive="true"
          />
        </div>
        <div className="fixed z-50 bottom-0 right-0 w-[500px] h-[500px]">
          <Adsense
            client="ca-pub-1917075558725173"
            slot="4522170456"
            style={{ display: "block" }}
            format="auto"
            responsive="true"
          />
        </div>
      </div>
    </>
  );
}
