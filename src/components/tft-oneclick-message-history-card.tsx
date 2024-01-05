import { useContext, useEffect, useState } from "react";

import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { OneClickMessageHistory } from "@generated/graphql";

import StyledButton from "./library/styled-button";
import { useMessagePostedContext } from "@contexts/post-message-events-context";

export default function TftOneClickMessageHistoryCard() {
  const { messagePosted, setMessagePosted } = useMessagePostedContext();
  const [messages, setMessages] = useState<OneClickMessageHistory[] | null>(
    null
  );
  const [fetch] = useLazyQuery(
    gql`
      query TftOneClickMessageHistory {
        tftOneClickMessageHistory {
          messageId
          channelId
          userId
          timestamp
          exportType
          exportSubType
          rateLimitExpires
        }
      }
    `,
    {
      fetchPolicy: "no-cache",
      onCompleted(data) {
        setMessages(data.tftOneClickMessageHistory);
      },
    }
  );

  useEffect(() => {
    if (messagePosted) {
      fetch().finally(() => setMessagePosted(false));
    }
  }, [messagePosted, setMessagePosted, fetch])

  const [deleteMessage] = useMutation(
    gql`
      mutation DeleteTftOneClickMessage($messageId: String!) {
        deleteTftOneClickMessage(messageId: $messageId)
      }
    `
  );

  const [time, setTime] = useState<Date>(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div>Message History</div>
        <StyledButton
          text={messages ? "Refresh" : "Load"}
          onClick={() => {
            fetch();
          }}
        />
        {!!messages && (
          <div className="flex flex-col">
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Time</th>
                  <th>Cooldown</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((e) => (
                  <>
                    <tr>
                      <td>{e.exportType}</td>
                      <td>{new Date(e.timestamp).toLocaleString()}</td>
                      <td>
                        {Math.round(
                          Math.max(
                            0,
                            new Date(e.rateLimitExpires).getTime() -
                              time.getTime()
                          ) / 1000
                        )}{" "}
                        Seconds
                      </td>
                      <td>
                        <StyledButton
                          text={"Delete Message"}
                          onClick={() => {
                            deleteMessage({
                              variables: { messageId: e.messageId },
                            });
                          }}
                        />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
