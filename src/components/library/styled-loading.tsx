import Image from "next/image";

export default function StyledLoading({
  message,
}: {
  message?: string | null | undefined;
}) {
  return (
    <>
      <div className="flex flex-col space-y-2 items-center justify-center h-screen">
        <div className="bg-surface-primary p-1 rounded-full">
          <div className="mx-auto animate-spin rounded-full">
            <Image
              src={"/KEKW.png"}
              className=" rounded-full"
              height={48}
              width={48}
              alt={"Kekw"}
            ></Image>
          </div>
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
