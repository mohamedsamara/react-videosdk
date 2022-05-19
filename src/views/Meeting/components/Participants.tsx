import { useMeeting } from "@videosdk.live/react-sdk";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
  VideocamOff,
  MicOff,
  Mic,
  Videocam,
  ArrowBack,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";

import Participant from "./Participant";

const Participants = () => {
  const { participants } = useMeeting();

  console.log("participants are", participants);

  return (
    <Grid container alignItems="center" spacing={4}>
      {[...participants.keys()].map((p: string) => (
        <Grid key={p} item xs={12} md={6}>
          <Participant participantId={p} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Participants;
