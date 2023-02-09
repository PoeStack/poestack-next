import Image from "next/image";
import StyledCard from "../components/styled-card";

export default function Home() {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="w-full flex flex-row justify-center">
          <Image
            width={1144}
            height={1134}
            src={
              "https://cdn.discordapp.com/attachments/616816643233808394/1063540695387885628/image.png"
            }
            alt={""}
          />
        </div>

        <div className="w-full flex justify-center">
          <div>
            <StyledCard title={"Welcome to PoeStack!"}>
              PoeStack&apos;s goal is to help track, manage, and sell your POE
              stash tabs. PoeStack is currently under development in alpha there
              are many changes and features to come. If you are interested in
              learning more feel free to poke around. If you have any questions
              join our Discord and ask! If you want a quick intro on setting up
              a bulk listing check out this video{" "}
              <a href="https://www.youtube.com/watch?v=1n6QlDiuldA">
                https://www.youtube.com/watch?v=1n6QlDiuldA
              </a>
            </StyledCard>
          </div>
        </div>

        <div className="w-full flex flex-row justify-center">
          <Image
            width={1144}
            height={1134}
            src={
              "https://cdn.discordapp.com/attachments/616816643233808394/1063508968246349865/image.png"
            }
            alt={""}
          />
        </div>
      </div>
    </>
  );
}
