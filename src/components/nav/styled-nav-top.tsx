import GggAuthBtn from "@components/ggg-auth-btn";

export default function StyledNavTop() {
  return (
    <>
      <div className="h-[50px] bg-surface-primary flex items-center">
        <div className="flex-1"></div>
        <div className="pr-2">
          <GggAuthBtn />
        </div>
      </div>
    </>
  );
}
