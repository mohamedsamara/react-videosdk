import { useParticipant } from "@videosdk.live/react-sdk";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import ParticipantAudioPlayer from "./ParticipantAudioPlayer";
import ParticipantVideoPlayer from "./ParticipantVideoPlayer";

interface ParticipantProps {
  participantId: string;
}

const Participant = (props: ParticipantProps) => {
  const { participantId } = props;
  const { displayName } = useParticipant(participantId);

  return (
    <Box position="relative">
      <Box position="absolute" top="10px" left="16px">
        <Typography color="white" variant="body1" component="p" mt={1}>
          {displayName}
        </Typography>
      </Box>

      <ParticipantAudioPlayer participantId={participantId} />
      <ParticipantVideoPlayer participantId={participantId} />
    </Box>
  );
};

export default Participant;
