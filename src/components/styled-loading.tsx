import Image from "next/image";

export default function StyledLoading({
  message,
}: {
  message?: string | null | undefined;
}) {
  return (
    <>
      <div className="flex flex-col space-y-2 items-center justify-center h-screen">
        <div className="mx-auto animate-spin">
          <Image src={"/KEKW.png"} height={48} width={48} alt={"Kekw"}></Image>
        </div>
        {message && (
          <>
            <div>{message}</div>
          </>
        )}
      </div>
    </>
  );
}
