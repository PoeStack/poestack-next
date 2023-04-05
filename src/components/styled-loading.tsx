import Image from "next/image";

export default function StyledLoading() {
  return (
    <>
      <div className="flex items-center justify-center h-screen mx-auto">
        <Image src={"/KEKW.png"} height={48} width={48} alt={"Kekw"}></Image>
      </div>
    </>
  );
}
