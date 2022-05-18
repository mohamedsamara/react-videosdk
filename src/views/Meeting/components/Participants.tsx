import { useMeeting } from "@videosdk.live/react-sdk";

import Participant from "./Participant";
import { chunk } from "../../../utils";
import commonStyles from "../../../utils/commonStyles";

const Participants = () => {
  const { participants } = useMeeting();

  console.log("participants are", participants);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        padding: commonStyles.borderRadius,
      }}
    >
      {[...participants.keys()].map((p: string) => (
        <Participant key={p} participantId={p} />
      ))}
    </div>
  );
};

export default Participants;
