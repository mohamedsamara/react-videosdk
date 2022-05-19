import Box from "@mui/material/Box";

import Me from "./Me";
import Toolbar from "./Toolbar";

interface MeetingProps {}

const Meeting = (props: MeetingProps) => {
  return (
    <Box bgcolor="#202124" minHeight="100%">
      <Me />

      <Toolbar />
    </Box>
  );
};

export default Meeting;
