import { useEffect, useRef } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";

interface ParticipantAudioPlayerProps {
  participantId: string;
}

const ParticipantAudioPlayer = (props: ParticipantAudioPlayerProps) => {
  const { participantId } = props;

  const { micOn, micStream, isLocal } = useParticipant(participantId);
  const audioPlayer = useRef<any>();

  useEffect(() => {
    if (!isLocal && audioPlayer.current && micOn) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(micStream.track);

      audioPlayer.current.srcObject = mediaStream;
      audioPlayer.current.play().catch((error: any) => {});
    } else {
      audioPlayer.current.srcObject = null;
    }
  }, [micStream, micOn, isLocal, participantId]);

  return <audio autoPlay playsInline controls={false} ref={audioPlayer} />;
};

export default ParticipantAudioPlayer;
