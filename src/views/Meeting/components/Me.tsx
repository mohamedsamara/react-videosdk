import { useMeeting } from "@videosdk.live/react-sdk";
import Box from "@mui/material/Box";

import ParticipantAudioPlayer from "./ParticipantAudioPlayer";
import ParticipantVideoPlayer from "./ParticipantVideoPlayer";

const Me = () => {
  const { localParticipant } = useMeeting();

  if (!localParticipant) return null;

  return (
    <>
      <ParticipantAudioPlayer participantId={localParticipant.id} />
      <Box height="60vh" pt="10vh">
        <ParticipantVideoPlayer participantId={localParticipant.id} />
      </Box>
    </>
  );
};

export default Me;
