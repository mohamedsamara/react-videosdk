import { useEffect, useRef } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";

interface ParticipantVideoPlayerProps {
  participantId: string;
}

const ParticipantVideoPlayer = (props: ParticipantVideoPlayerProps) => {
  const { participantId } = props;
  const videoPlayerRef = useRef<any>(null);

  const { webcamStream, webcamOn } = useParticipant(participantId);

  useEffect(() => {
    if (videoPlayerRef.current) {
      if (webcamOn) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);

        videoPlayerRef.current.srcObject = mediaStream;
        videoPlayerRef.current
          .play()
          .catch((error: any) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        videoPlayerRef.current.srcObject = null;
      }
    }
  }, [webcamStream, webcamOn]);

  return (
    <video
      height={"100%"}
      width={"100%"}
      ref={videoPlayerRef}
      //   style={{
      //     backgroundColor: "black",
      //     position: "absolute",
      //     top: 0,
      //     left: 0,
      //     right: 0,
      //     bottom: 0,
      //     objectFit: "contain",
      //   }}
      autoPlay
    />
  );
};

export default ParticipantVideoPlayer;
