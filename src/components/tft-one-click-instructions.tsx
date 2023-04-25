import YouTube from "react-youtube";
import StyledCard from "./styled-card";

export function TftOneClickInstructions() {
  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <p>Instructions</p>

          <div className="pl-10">
            <ul className="list-disc">
              <li>
                <span className="text-red-500">Important</span> If you&apos;ve
                just joined TFT you must go through the verification process to
                remove the trade restricted role before you can post.
              </li>
              <li>
                If you haven&apos;t logged in there will be a page showing the 3
                steps to start using the tool. The items with a red circle need
                to be completed. Click the gold text that follows on each item
                to login, connect your account, and join TFT. Once you&apos;ve
                completed all items press the refresh button.
              </li>
              <li>
                Once on the page you should see a page that has a table on the
                right and a list of stash tabs on the left along with some other
                options. Select stash tabs that you would like to pull items
                from.
              </li>
              <li>
                Once you are happy with your stash tab selections or if you are
                returning to the page press &quot;Snapshot Tabs&quot; to process
                your selections.
              </li>
              <li>
                Once this is complete turn your attention to the dropdown below
                &quot;Snapshot Tabs&quot;, here select which TFT category you
                would like to post.
              </li>
              <li>
                Once you&apos;ve made a selection the list of items should be
                filtered to only items matching your category.
              </li>
              <li>
                Make any further changes to the price of items and when you are
                ready press the Post To TFT button.
              </li>
              <li>
                A bot will process your request and post the message to the
                appropriate channel in TFT with a mention so you can see the
                message.
              </li>
              <li>
                If you would like to make further posts simply change the
                category selection you don&apos;t need to reselect tabs or grab
                items again if nothing has changed.
              </li>
            </ul>
          </div>

          <div className="flex space-x-2">
            <YouTube
              videoId={"v2BVj0pl0Io"}
              opts={{
                height: "360",
                width: "680",
                playerVars: {
                  autoplay: 0,
                },
              }}
              className=""
            />
            <YouTube
              videoId={"yYLf8tqVbxA"}
              opts={{
                height: "360",
                width: "680",
                playerVars: {
                  autoplay: 0,
                },
              }}
              className=""
            />
          </div>
          <div className="flex space-x-2">
            <YouTube
              videoId={"7JYdgkIH8i4"}
              opts={{
                height: "360",
                width: "680",
                playerVars: {
                  autoplay: 0,
                },
              }}
              className=""
            />
          </div>
        </div>
      </StyledCard>
    </>
  );
}
