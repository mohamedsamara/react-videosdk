import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme, Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";

import JoinPreview from "../components/JoinPreview";
import JoinDetails from "../components/JoinDetails";

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

interface JoinProps {
  participantName: string;
  setParticipantName: (name: string) => void;
  meetingId?: string;
  setMeetingId: (id: string) => void;
  setToken: (token: string) => void;
  setWebcamOn: (webcamOn: boolean) => void;
  setMicOn: (micOn: boolean) => void;
  micOn?: boolean;
  webcamOn?: boolean;
  onMeetingStart: () => void;
  startMeeting?: boolean;
  onNewMeeting: () => void;
  onJoin: (id: string) => void;
  readyToJoin?: boolean;
}

const Join = (props: JoinProps) => {
  const {
    participantName,
    setParticipantName,
    meetingId,
    setWebcamOn,
    setMicOn,
    micOn,
    webcamOn,
    onMeetingStart,
    onNewMeeting,
    onJoin,
    readyToJoin,
  } = props;
  const theme = useTheme();

  return (
    <Box
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {readyToJoin ? (
          <JoinPreview
            setWebcamOn={setWebcamOn}
            setMicOn={setMicOn}
            micOn={micOn}
            webcamOn={webcamOn}
            participantName={participantName}
            setParticipantName={setParticipantName}
            onMeetingStart={onMeetingStart}
          />
        ) : (
          <JoinDetails onJoin={onJoin} onNewMeeting={onNewMeeting} />
        )}
      </Grid>
    </Box>
  );
};

export default Join;
