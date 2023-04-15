import YouTube from "react-youtube";
import StyledCard from "./styled-card";

export function TftOneClickInstructions() {
  return (
    <>
      <StyledCard>
        <div className="flex flex-col space-y-2">
          <p>Instructions</p>
          <div className="space-y-2">
            <p>
              If you haven&apos;t logged in there will be a page showing the 3 steps
              to start using the tool. The items with a red circle need to be
              completed. Click the gold text that follows on each item to login,
              connect your account, and join TFT. Once you&apos;ve completed all
              items press the refresh button.
            </p>
            <p>
              Once on the page you should see two drop downs. The first is to
              select the league you would like to sell items in and the second
              is to select what stash tabs you would like to pull items from.
              There will be further filtering options once stash tabs are
              selected so feel free to select many stash tabs containing
              different types of items.
            </p>
            <p>
              Once you are happy with your stash tab selections or if you are
              returning to the page press &quot;Grab Items&quot; to process your
              selections.
            </p>
            <p>
              You should now be able to see the items from the tabs you&apos;ve
              select and a final drop down should now be below &quot;Grab Items&quot; this
              dropdown is for selecting the bulk category you would like to
              post. IE if you want to sell compasses select compasses.
            </p>
            <p>
              Once you&apos;ve made a selection the list of items should be filtered
              to only items matching your category and a &quot;Post to TFT&quot; button
              should appear a long with a total value, multiplier, and listed
              value.
            </p>
            <p>
              Make any further changes to the price of items and when you are
              ready press the Post To TFT button.
            </p>
            <p>
              A bot will process your request and post the message to the
              appropriate channel in TFT with a mention so you can see the
              message.
            </p>
            <p>
              If you would like to make further posts simply change the category
              selection you don&apos;t need to reselect tabs or grab items again if
              nothing has changed.
            </p>
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
        </div>
      </StyledCard>
    </>
  );
}