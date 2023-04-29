import { Adsense } from "@ctrl/react-adsense";

export default function StyledVerticalBannerAd() {
  return (
    <>
      <div className="w-full h-[600px] sticky top-1/3 flex justify-center">
        <Adsense
          client="ca-pub-1917075558725173"
          slot="2853015508"
          style={{ display: "inline-block", width: "200px", height: "600px" }}
          format="Display"
        />
      </div>
    </>
  );
}
