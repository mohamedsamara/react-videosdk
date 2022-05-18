import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [validMeeting, setValidMeeting] = useState(false);

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
  } = useSnapshot(store);

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
      if (!valid) throw new Error("Invalid Meeting Id");
      setMeetingId(meetingId);
      setValidMeeting(true);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const onMeetingLeave = () => {
    setToken("");
    setMeetingId("");
    setCam(false);
    setMic(false);
    setStarted(false);
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
  if (!validMeeting) return <div>Invalid Meeting ID</div>;

  return started ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: micOn,
        webcamEnabled: camOn,
        name: participantName ? participantName : "TestUser",
      }}
      token={token}
      reinitialiseMeetingOnConfigChange={true}
      joinWithoutUserInteraction={true}
    >
      <Meeting onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <Join />
  );
};

export default JoinMeeting;
