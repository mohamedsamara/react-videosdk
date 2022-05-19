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
import { ChatBubbleSharp, People } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";

import { store } from "../../../lib/store";
import ParticipantControls from "./ParticipantControls";
import MeetingControls from "./MeetingControls";

const Toolbar = () => {
  const { meetingId } = useMeeting();

  return (
    <Box position="absolute" bottom="0" width="100%" height={{ md: "80px" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Box
          flex="1 1 25%"
          pl={{ md: 6 }}
          py={{ xs: 3, md: 0 }}
          order={{ xs: "3", md: "1" }}
        >
          <Typography color="#fff" variant="h6" component="h6">
            {meetingId}
          </Typography>
        </Box>
        <Box flex="1 1 25%" order={{ xs: "1", md: "2" }}>
          <ParticipantControls />
        </Box>
        <Box flex="1 1 25%" order={{ xs: "2", md: "3" }}>
          <MeetingControls />
        </Box>
      </Stack>
    </Box>
  );
};

export default Toolbar;
