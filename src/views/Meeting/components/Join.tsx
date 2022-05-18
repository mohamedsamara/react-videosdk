import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
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

import { store } from "../../../lib/store";

const useStyles: any = makeStyles(() => ({
  video: {
    borderRadius: "10px",
    backgroundColor: "#1c1c1c",
    height: "100%",
    width: "100%",
    objectFit: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButton: {
    borderRadius: "50%!important",
    minWidth: "auto!important",
    width: "50px",
    height: "50px",
  },
  previewBox: {
    width: "100%",
    height: "45vh",
    position: "relative",
  },
}));

interface JoinProps {
  onBack: () => void;
}

const Join = (props: JoinProps) => {
  const { onBack } = props;
  const theme = useTheme();
  const styles = useStyles(theme);
  const videoPlayerRef = useRef<any>();
  const [videoTrack, setVideoTrack] = useState<any>(null);
  const { meeting } = useSnapshot(store);
  const {
    participantName,
    setParticipantName,
    setStarted,
    micOn,
    setMic,
    camOn,
    setCam,
  } = meeting;

  useEffect(() => {
    setCam(true);
    setMic(true);
  }, []);

  useEffect(() => {
    if (camOn && !videoTrack) {
      getVideo();
    }
  }, [camOn]);

  const _toggleMic = () => {
    setMic(!micOn);
  };

  const _toggleCam = () => {
    if (!camOn) {
      getVideo();
    } else {
      if (videoTrack) {
        videoTrack.stop();
        setVideoTrack(null);
      }
    }
    setCam(!camOn);
  };

  const getVideo = async () => {
    if (videoPlayerRef.current) {
      const videoConstraints = {
        video: {
          width: 1280,
          height: 720,
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(
        videoConstraints
      );

      const videoTracks = stream.getVideoTracks();
      const videoTrack = videoTracks.length ? videoTracks[0] : (null as any);
      videoPlayerRef.current.srcObject = new MediaStream([videoTrack]);
      videoPlayerRef.current.play();
      setVideoTrack(videoTrack);
    }
  };

  const onJoin = () => {
    if (videoTrack) {
      videoTrack.stop();
      setVideoTrack(null);
    }

    setStarted(true);
  };

  return (
    <>
      <Box
        position="absolute"
        style={{
          top: theme.spacing(2),
          right: 0,
          left: theme.spacing(2),
        }}
      >
        <IconButton onClick={onBack}>
          <ArrowBack />
        </IconButton>
      </Box>

      <Grid
        container
        minHeight="100vh"
        alignItems="center"
        className="new-meeting-page"
      >
        <Grid item xs={12} lg={8} order={{ xs: 2, lg: 1 }}>
          <Box px={{ xs: 6 }} mt={{ xs: 10, lg: 0 }} mb={{ xs: 16, lg: 4 }}>
            <Box className={styles.previewBox}>
              <video
                autoPlay
                playsInline
                muted
                ref={videoPlayerRef}
                controls={false}
                className={styles.video + " flip"}
              />

              {!camOn ? (
                <Box
                  position="absolute"
                  style={{
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    right: 0,
                    left: 0,
                  }}
                >
                  <Typography style={{ color: "#fff" }}>
                    Camera is Turned Off
                  </Typography>
                </Box>
              ) : null}

              <Box
                position="absolute"
                bottom={theme.spacing(2)}
                left="0"
                right="0"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
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
                            ? {}
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
                        variant="contained"
                        style={
                          camOn
                            ? {}
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
                </Stack>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4} order={{ xs: 1, lg: 2 }}>
          <Box textAlign="center" mt={{ xs: 10, lg: 0 }}>
            <Typography variant="h4" component="h4" mb={5}>
              Ready to Join?
            </Typography>
            <Box maxWidth={{ xs: "70%" }} m="auto">
              <TextField
                fullWidth
                id="outlined"
                label="Name"
                placeholder="Enter your name"
                autoComplete="off"
                onChange={(e) => {
                  setParticipantName(e.target.value);
                }}
                variant="outlined"
                defaultValue={participantName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        disabled={participantName?.length < 3}
                        color="primary"
                        variant="contained"
                        onClick={onJoin}
                        id={"btnJoin"}
                      >
                        Join
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Join;
