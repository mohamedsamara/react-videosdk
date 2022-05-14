import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Keyboard } from "@mui/icons-material";

interface JoinDetailsProps {
  onJoin: (id: string) => void;
  onNewMeeting: () => void;
}

const JoinDetails = (props: JoinDetailsProps) => {
  const { onJoin, onNewMeeting } = props;

  const [meetingId, setMeetingId] = useState("");
  const [meetingIdError, setMeetingIdError] = useState(false);

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
      <Button
        style={{
          marginBottom: "1rem",
        }}
        color="primary"
        variant="contained"
        onClick={onNewMeeting}
      >
        Create Meeting
      </Button>

      <Chip label="OR" />

      <TextField
        style={{
          marginTop: "1rem",
          width: "100%",
        }}
        required
        id="outlined"
        label="Meeting ID"
        helperText={
          meetingIdError
            ? "Meeting id is not valid"
            : "Enter your meeting id Here"
        }
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
        error={meetingIdError}
        variant="outlined"
        defaultValue={meetingId}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Keyboard />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button
                disabled={!meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")}
                color="primary"
                variant="contained"
                onClick={(e) => {
                  if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}"))
                    onJoin(meetingId);
                  else setMeetingIdError(true);
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

export default JoinDetails;
