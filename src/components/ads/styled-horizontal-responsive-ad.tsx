import { Adsense } from "@ctrl/react-adsense";

export default function StyledHorizontalResponsiveAd() {
  return (
    <>
      <div className="h-[250px]">
        <Adsense
          client="ca-pub-1917075558725173"
          slot="8271991000"
          style={{ display: "inline-block", width: "900px", height: "250px" }}
          format="auto"
          responsive="true"
        />
      </div>
    </>
  );
}
