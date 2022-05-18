import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { store } from "../../../lib/store";
import { getToken, validateMeeting } from "../../../lib/api";
import Join from "../components/Join";
import Meeting from "../components/Meeting";

const JoinMeeting = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { meeting, ui } = useSnapshot(store);
  const {
    camOn,
    micOn,
    participantName,
    meetingId,
    token,
    started,
    setCam,
    setMic,
    setMeetingId,
    setToken,
    setStarted,
  } = meeting;

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      checkMeeting(id);
    }
  }, []);

  const checkMeeting = async (meetingId: string) => {
    try {
      const token = await getToken();
      const valid = await validateMeeting({ meetingId, token });
      if (!valid) ui.setInvalidMeetingDialog(true);
      setToken(token);
      setMeetingId(meetingId);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onMeetingLeave = () => {
    setCam(false);
    setMic(false);
    setStarted(false);
  };

  const onBack = () => {
    setToken("");
    setMeetingId("");
    navigate({ pathname: `/meeting` });
  };

  if (loading)
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );

  return started ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: micOn,
        webcamEnabled: camOn,
        name: participantName,
      }}
      token={token}
      reinitialiseMeetingOnConfigChange={true}
      joinWithoutUserInteraction={true}
    >
      <Meeting onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <Join onBack={onBack} />
  );
};

export default JoinMeeting;
