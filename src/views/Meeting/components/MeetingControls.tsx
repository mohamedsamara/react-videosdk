import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Chat as ChatIcon, People } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import Chat from "./Chat";
import Participants from "./Participants";

const useStyles: any = makeStyles(() => ({
  button: {
    borderRadius: "50%!important",
    minWidth: "auto!important",
    width: "50px",
    height: "50px",
  },
}));

const MeetingControls = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const [chatDrawer, setChatDrawer] = useState(false);
  const [participantsDrawer, setParticipantsDrawer] = useState(false);

  const _toggleChat = () => {
    setChatDrawer(!chatDrawer);
  };
  const _toggleParticipants = () => {
    setParticipantsDrawer(!participantsDrawer);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Box mx={1}>
          <Tooltip title="View chat" arrow placement="top">
            <Button
              onClick={_toggleChat}
              variant="contained"
              className={styles.button}
            >
              <ChatIcon />
            </Button>
          </Tooltip>
        </Box>
        <Box mx={1}>
          <Tooltip title="View particpants" arrow placement="top">
            <Button
              onClick={_toggleParticipants}
              variant="contained"
              className={styles.button}
            >
              <People />
            </Button>
          </Tooltip>
        </Box>
      </Stack>

      <Chat open={chatDrawer} toggleDrawer={_toggleChat} />
      <Participants
        open={participantsDrawer}
        toggleDrawer={_toggleParticipants}
      />
    </>
  );
};

export default MeetingControls;
