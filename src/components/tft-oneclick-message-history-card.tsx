import { useEffect, useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";
import { OneClickMessageHistory } from "@generated/graphql";

import StyledButton from "./library/styled-button";

export default function TftOneClickMessageHistoryCard() {
  const [messages, setMessages] = useState<OneClickMessageHistory[]>([]);
  const { refetch } = useQuery(
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
      onCompleted(data) {
        setMessages(data.tftOneClickMessageHistory);
      },
    }
  );

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

  useEffect(() => {
    const interval = setInterval(() => refetch(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div>Message History</div>
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
      </div>
    </>
  );
}
