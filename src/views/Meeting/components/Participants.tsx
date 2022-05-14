import { useMeeting } from "@videosdk.live/react-sdk";

import Participant from "./Participant";
import { chunk } from "../../../utils";
import commonStyles from "../../../utils/commonStyles";

const Participants = () => {
  const { participants } = useMeeting();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        padding: commonStyles.borderRadius,
      }}
    >
      {chunk([...participants.keys()]).map((k) => {
        console.log("K---", k);

        return (
          <div style={{ display: "flex" }}>
            {k.map((l: string) => (
              <Participant key={l} participantId={l} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Participants;
