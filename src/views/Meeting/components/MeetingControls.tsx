import { useState } from "react";
import { useSnapshot } from "valtio";
import { useMeeting } from "@videosdk.live/react-sdk";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Chat, People } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";

import { store } from "../../../lib/store";

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
  const { ui } = useSnapshot(store);

  const _toggleChat = () => {};
  const _toggleParticipant = () => {};

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
              <Chat />
            </Button>
          </Tooltip>
        </Box>
        <Box mx={1}>
          <Tooltip title="View particpants" arrow placement="top">
            <Button
              onClick={_toggleParticipant}
              variant="contained"
              className={styles.button}
            >
              <People />
            </Button>
          </Tooltip>
        </Box>
      </Stack>
    </>
  );
};

export default MeetingControls;
