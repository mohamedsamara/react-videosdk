import { useState } from "react";
import { usePubSub } from "@videosdk.live/react-sdk";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";

import Messages from "./Messages";

interface ChatProps {
  open: boolean;
  toggleDrawer: () => void;
}

const Chat = (props: ChatProps) => {
  const { open, toggleDrawer } = props;
  const { publish, messages } = usePubSub("CHAT");
  const [message, setMessage] = useState("");

  const onSend = () => {
    if (message.length <= 0) return;

    publish(message, { persist: true });
    setMessage("");
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      <Box width="400px" height="100vh" display="flex" flexDirection="column">
        <Box flex="1" pt={3} px={2} maxHeight="80vh" overflow="scroll">
          <Messages messages={messages} />
        </Box>
        <Box px={2} py={3}>
          <TextField
            fullWidth
            label="Message"
            placeholder="Type your message"
            autoComplete="off"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            variant="outlined"
            value={message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    disabled={message?.length <= 0}
                    color="primary"
                    variant="contained"
                    onClick={onSend}
                    id={"btnJoin"}
                  >
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default Chat;
