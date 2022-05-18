import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Keyboard } from "@mui/icons-material";

import { store } from "../../../lib/store";
import { createMeeting, getToken, validateMeeting } from "../../../lib/api";

const MEETING_BANNER = `${process.env.PUBLIC_URL}/meeting.svg`;

const NewMeeting = () => {
  const [meetingIdError, setMeetingIdError] = useState(false);
  const navigate = useNavigate();
  const { meeting, ui } = useSnapshot(store);
  const { meetingId, setMeetingId, setToken } = meeting;

  const onNewMeeting = async () => {
    const token = await getToken();
    const meetingId = await createMeeting({ token });
    setToken(token);
    setMeetingId(meetingId);
    navigate({ pathname: `/meeting/${meetingId}` });
  };

  const joinMeeting = async (meetingId: string) => {
    const token = await getToken();
    const valid = await validateMeeting({ meetingId, token });
    if (!valid) return ui.setInvalidMeetingDialog(true);

    setToken(token);
    setMeetingId(meetingId);
    navigate({ pathname: `/meeting/${meetingId}` });
  };

  const onJoin = (e: any) => {
    if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) joinMeeting(meetingId);
    else setMeetingIdError(true);
  };

  return (
    <Grid
      container
      minHeight="100vh"
      alignItems="center"
      className="new-meeting-page"
    >
      <Grid item xs={12} lg={8}>
        <Box pl={{ md: 4 }} mt={{ xs: 10, lg: 0 }} mb={{ xs: 16, lg: 4 }}>
          <Box mb={5} textAlign={{ xs: "center", lg: "left" }}>
            <Typography variant="h3" component="h3" mb={2}>
              Video meetings
            </Typography>
            <Typography variant="h5" component="h5" color="gray">
              Free for everyone
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={{ xs: 1, lg: 4 }}
            alignItems="center"
          >
            <Box mb={{ xs: 4, lg: 0 }}>
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={onNewMeeting}
              >
                Create Meeting
              </Button>
            </Box>
            <TextField
              required
              id="outlined"
              label="Meeting ID"
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
                      onClick={onJoin}
                      id={"btnJoin"}
                    >
                      Join
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box pr={{ xs: 6 }}>
          <img src={MEETING_BANNER} alt="MEETING BANNER" className="banner" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default NewMeeting;
