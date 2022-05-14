import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { VideocamOff, MicOff, Mic, Videocam } from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";
import { useEffect, useMemo, useRef, useState, memo } from "react";

const useStyles = makeStyles((theme: Theme) => ({
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
    borderRadius: "100%",
    minWidth: "auto",
    width: "44px",
    height: "44px",
  },
  previewBox: {
    width: "100%",
    height: "45vh",
    position: "relative",
  },
}));

interface JoinPreviewProps {
  setWebcamOn: (webcamOn: boolean) => void;
  setMicOn: (micOn: boolean) => void;
  micOn?: boolean;
  webcamOn?: boolean;
  participantName: string;
  setParticipantName: (name: string) => void;
  onMeetingStart: () => void;
}

const JoinPreview = (props: JoinPreviewProps) => {
  const {
    micOn,
    setMicOn,
    webcamOn,
    setWebcamOn,
    participantName,
    setParticipantName,
    onMeetingStart,
  } = props;
  const theme = useTheme();
  const styles = useStyles(theme);

  const videoPlayerRef = useRef<any>();
  const [videoTrack, setVideoTrack] = useState<any>(null);
  console.log("JoinPreview");

  useEffect(() => {
    if (webcamOn && !videoTrack) {
      getVideo();
    }
  }, [webcamOn]);

  const _toggleMic = () => {
    setMicOn(!micOn);
  };

  const _toggleWebcam = () => {
    if (!webcamOn) {
      getVideo();
    } else {
      if (videoTrack) {
        videoTrack.stop();
        setVideoTrack(null);
      }
    }
    setWebcamOn(!webcamOn);
  };

  const getVideo = async () => {
    console.log("getVideo");

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

  return (
    <Box
      m={6}
      style={{
        display: "flex",
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box className={styles.previewBox}>
        <video
          autoPlay
          playsInline
          muted
          ref={videoPlayerRef}
          controls={false}
          className={styles.video + " flip"}
        />

        {!webcamOn ? (
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

        <Box position="absolute" bottom={theme.spacing(2)} left="0" right="0">
          <Grid
          //   container
          //   alignItems="center"
          //   justify="center"
          //   spacing={2}
          >
            <Grid item>
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
            </Grid>
            <Grid item>
              <Tooltip
                title={webcamOn ? "Turn off camera" : "Turn on camera"}
                arrow
                placement="top"
              >
                <Button
                  onClick={_toggleWebcam}
                  variant="contained"
                  style={
                    webcamOn
                      ? {}
                      : {
                          backgroundColor: red[500],
                          color: "white",
                        }
                  }
                  className={styles.toggleButton}
                >
                  {webcamOn ? <Videocam /> : <VideocamOff />}
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <TextField
        style={{
          width: "100%",
          marginTop: "1rem",
        }}
        id="outlined"
        label="Name"
        placeholder="Enter your name"
        autoComplete="off"
        helperText={
          participantName?.length < 3
            ? "Your name will help everyone identify you in the meeting"
            : ""
        }
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
                onClick={(e) => {
                  if (videoTrack) {
                    videoTrack.stop();
                    setVideoTrack(null);
                  }
                  onMeetingStart();
                }}
                id={"btnJoin"}
              >
                Join
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

// function joinPropsAreEqual(
//   prevJoin: JoinPreviewProps,
//   nextJoin: JoinPreviewProps
// ) {
//   console.log("prevJoin", prevJoin);
//   console.log("nextJoin", nextJoin);

//   if (prevJoin.webcamOn === nextJoin.webcamOn) {
//     return true;
//   } else return false;
// }

export default JoinPreview;
