import { useEffect, useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";

import Join from "./Join";
import Meeting from "./Meeting";
import { useNavigate, useParams } from "react-router-dom";
import { createMeeting, getToken, validateMeeting } from "../../../lib/api";

const MeetingContainer = () => {
  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [readyToJoin, setReadyToJoin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      onJoin(id);
    } else {
      setLoading(false);
      // onNewMeeting();
    }
  }, []);

  const onNewMeeting = async () => {
    const token = await getToken();
    const _meetingId = await createMeeting({ token });
    setToken(token);
    setMeetingId(_meetingId);
    setReadyToJoin(true);
    setWebcamOn(true);
    setMicOn(true);

    navigate({ pathname: `/meeting/${_meetingId}` });
  };

  const onJoin = async (id: string) => {
    const token = await getToken();
    const valid = await validateMeeting({ meetingId: id, token });
    if (valid) {
      setReadyToJoin(true);
      setToken(token);
      setMeetingId(id);
      setWebcamOn(true);
      setMicOn(true);
    } else alert("Invalid Meeting Id");

    setLoading(false);
  };

  const onMeetingLeave = () => {
    setToken("");
    setMeetingId("");
    setWebcamOn(false);
    setMicOn(false);
    setMeetingStarted(false);
  };

  if (loading) return <div>Loading....</div>;

  return isMeetingStarted ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: micOn,
        webcamEnabled: webcamOn,
        name: participantName ? participantName : "TestUser",
      }}
      token={token}
      reinitialiseMeetingOnConfigChange={true}
      joinWithoutUserInteraction={true}
    >
      <Meeting onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <Join
      participantName={participantName}
      setParticipantName={setParticipantName}
      meetingId={meetingId}
      setMeetingId={setMeetingId}
      setToken={setToken}
      setMicOn={setMicOn}
      micOn={micOn}
      webcamOn={webcamOn}
      setWebcamOn={setWebcamOn}
      onMeetingStart={() => {
        setMeetingStarted(true);
      }}
      startMeeting={isMeetingStarted}
      onNewMeeting={onNewMeeting}
      onJoin={onJoin}
      readyToJoin={readyToJoin}
    />
  );
};

export default MeetingContainer;
