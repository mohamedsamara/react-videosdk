import { useState } from "react";
import { usePubSub } from "@videosdk.live/react-sdk";

import commonStyles from "../../../utils/commonStyles";
import Title from "./Title";
import Messages from "./Messages";

interface ChatProps {
  tollbarHeight: any;
}

const Chat = (props: ChatProps) => {
  const { tollbarHeight } = props;

  const { publish, messages } = usePubSub("CHAT", {});
  const [message, setMessage] = useState("");
  return (
    <div
      style={{
        marginLeft: commonStyles.borderRadius,
        width: 400,
        backgroundColor: commonStyles.primary,
        overflowY: "scroll",
        borderRadius: commonStyles.borderRadius,
        height: `calc(100vh - ${
          tollbarHeight + 2 * commonStyles.borderRadius
        }px)`,
        padding: commonStyles.borderRadius,
      }}
    >
      <Title title={"Chat"} dark />

      <div style={{ display: "flex" }}>
        <input
          value={message}
          onChange={(e) => {
            const v = e.target.value;
            setMessage(v);
          }}
        />
        <button
          className={"button default"}
          onClick={() => {
            const m = message;

            if (m.length) {
              publish(m, { persist: true });
              setMessage("");
            }
          }}
        >
          Send
        </button>
      </div>
      <Messages messages={messages} />
    </div>
  );
};

export default Chat;
