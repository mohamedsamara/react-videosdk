import { useMeeting } from "@videosdk.live/react-sdk";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import ParticipantAudioPlayer from "./ParticipantAudioPlayer";
import ParticipantVideoPlayer from "./ParticipantVideoPlayer";

const Me = () => {
  const { localParticipant } = useMeeting();
  if (!localParticipant) return null;

  return (
    <Box position="relative">
      <Box position="absolute" top="10px" left="16px">
        <Typography color="white" variant="body1" component="p" mt={1}>
          You
        </Typography>
      </Box>
      <ParticipantAudioPlayer participantId={localParticipant.id} />
      <Box height="60vh" pt="10vh">
        <ParticipantVideoPlayer participantId={localParticipant.id} />
      </Box>
    </Box>
  );
};

export default Me;
