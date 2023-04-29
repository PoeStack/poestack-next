import { Adsense } from "@ctrl/react-adsense";

export default function StyledSquareResponsiveAd() {
  return (
    <>
      <div className="fixed z-50 bottom-0 right-0 w-[500px] h-[500px]">
        <Adsense
          client="ca-pub-1917075558725173"
          slot="4522170456"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
        />
      </div>
    </>
  );
}
