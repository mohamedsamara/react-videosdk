import { useParticipant } from "@videosdk.live/react-sdk";

interface ParticipantProps {
  participantId?: string;
}

const Participant = (props: ParticipantProps) => {
  const { participantId } = props;

  const {} = useParticipant(participantId);

  return <></>;
};

export default Participant;
