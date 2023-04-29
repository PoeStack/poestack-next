import { Adsense } from "@ctrl/react-adsense";

export default function StyledHorizontalBannerAd() {
  return (
    <>
      <div className="w-[728px] h-[120px]">
        <Adsense
          client="ca-pub-1917075558725173"
          slot="3910112150"
          style={{ display: "inline-block", width: "728px", height: "120px" }}
          format="Display"
        />
      </div>
    </>
  );
}
