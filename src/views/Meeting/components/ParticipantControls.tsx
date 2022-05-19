import { useState } from "react";
import { useSnapshot } from "valtio";
import { useMeeting } from "@videosdk.live/react-sdk";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import {
  VideocamOff,
  MicOff,
  Mic,
  Videocam,
  CallEnd,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";

import { store } from "../../../lib/store";

const useStyles: any = makeStyles(() => ({
  toggleButton: {
    borderRadius: "50%!important",
    minWidth: "auto!important",
    width: "50px",
    height: "50px",
  },
}));

const ParticipantControls = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [toggleWebcamTimeout, setToggleWebcamTimeout] = useState(false);
  const { meeting } = useSnapshot(store);
  const { camOn, micOn, setCam, setMic, setStarted } = meeting;

  const onMeetingLeft = () => {
    setCam(false);
    setMic(false);
    setStarted(false);
  };

  const { leave, toggleMic, toggleWebcam } = useMeeting({
    onMeetingLeft,
  });

  const _toggleMic = () => {
    setMic(!micOn);
    toggleMic();
  };

  const _toggleCam = () => {
    setCam(!camOn);
    toggleWebcam();
    setToggleWebcamTimeout(true);
    setTimeout(() => {
      setToggleWebcamTimeout(false);
    }, 500);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Box mx={1}>
          <Tooltip
            title={micOn ? "Turn off mic" : "Turn on mic"}
            arrow
            placement="top"
          >
            <Button
              onClick={_toggleMic}
              variant="contained"
              style={
                micOn
                  ? {
                      backgroundColor: "#3f51b5",
                    }
                  : {
                      backgroundColor: red[500],
                      color: "white",
                    }
              }
              className={styles.toggleButton}
            >
              {micOn ? <Mic /> : <MicOff />}
            </Button>
          </Tooltip>
        </Box>
        <Box mx={1}>
          <Tooltip
            title={camOn ? "Turn off camera" : "Turn on camera"}
            arrow
            placement="top"
          >
            <Button
              onClick={_toggleCam}
              disabled={toggleWebcamTimeout}
              variant="contained"
              style={
                camOn
                  ? {
                      backgroundColor: "#3f51b5",
                    }
                  : {
                      backgroundColor: red[500],
                      color: "white",
                    }
              }
              className={styles.toggleButton}
            >
              {camOn ? <Videocam /> : <VideocamOff />}
            </Button>
          </Tooltip>
        </Box>
        <Box mx={1}>
          <Tooltip title="Leave call" arrow placement="top">
            <Button
              onClick={leave}
              variant="contained"
              style={{
                backgroundColor: red[500],
                color: "white",
              }}
              className={styles.toggleButton}
            >
              <CallEnd />
            </Button>
          </Tooltip>
        </Box>
      </Stack>
    </>
  );
};

export default ParticipantControls;
