import { useMeeting } from "@videosdk.live/react-sdk";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

import Participant from "./Participant";

interface ParticipantsProps {
  open: boolean;
  toggleDrawer: () => void;
}

const Participants = (props: ParticipantsProps) => {
  const { open, toggleDrawer } = props;
  const { participants } = useMeeting();

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      <Box
        width="400px"
        height="100vh"
        display="flex"
        flexDirection="column"
        bgcolor="#101012"
        p={2}
      >
        {[...participants.keys()].map((p: string) => (
          <Box key={p} mb={2}>
            <Participant participantId={p} />
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};

export default Participants;
