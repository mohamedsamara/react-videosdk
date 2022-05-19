import { useMeeting } from "@videosdk.live/react-sdk";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { formatAMPM } from "../../../utils";

type Message = {
  id: string;
  message: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  topic: string;
};

interface MessagesProps {
  messages: Array<Message>;
}

const Messages = (props: MessagesProps) => {
  const { messages } = props;
  const { localParticipant } = useMeeting();

  return (
    <>
      {messages?.map((message: Message) => {
        const { id, senderName, senderId, message: text, timestamp } = message;
        const isMe = localParticipant.id === senderId;

        return (
          <Box
            key={id}
            bgcolor={isMe ? "#2196f3" : "#eff2f5"}
            mb={2}
            p={2}
            borderRadius={8}
            overflow="hidden"
            width="fit-content"
            minWidth="100px"
            className={`m-box ${isMe ? "me" : ""}`}
            display="flex"
            flexDirection="column"
            alignSelf={isMe ? "flex-end" : ""}
            ml={isMe ? "auto" : "inherit"}
          >
            <Typography
              color={isMe ? "white" : "black"}
              variant="body1"
              component="p"
            >
              {senderName}
            </Typography>

            <Typography
              color={isMe ? "white" : "black"}
              variant="body1"
              component="p"
              mt={1}
            >
              {text}
            </Typography>

            <Typography
              color={isMe ? "white" : "black"}
              variant="body2"
              component="p"
              mt={2}
            >
              {formatAMPM(new Date(timestamp))}
            </Typography>
          </Box>
        );
      })}
    </>
  );
};

export default Messages;
