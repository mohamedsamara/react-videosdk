import { useState, useRef } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";

import commonStyles from "../../../utils/commonStyles";

interface ExternalVideoProps {}

const ExternalVideo = (props: ExternalVideoProps) => {
  const [{ link, playing }, setVideoInfo] = useState({
    link: null,
    playing: false,
  });

  const onVideoStateChanged = (data: any) => {
    const { currentTime, link, status } = data;

    switch (status) {
      case "stopped":
        console.log("stopped in switch");
        externalPlayer.current.src = null;
        setVideoInfo({ link: null, playing: false });
        break;
      case "resumed":
        if (typeof currentTime === "number") {
          externalPlayer.current.currentTime = currentTime;
        }
        externalPlayer.current.play();
        setVideoInfo((s) => ({ ...s, playing: true }));
        break;
      case "paused":
        externalPlayer.current.pause();
        setVideoInfo((s) => ({ ...s, playing: false }));
        break;
      case "started":
        setVideoInfo({ link, playing: true });
        break;
      default:
        break;
    }
  };

  const onVideoSeeked = (data: any) => {
    const { currentTime } = data;
    if (typeof currentTime === "number") {
      externalPlayer.current.currentTime = currentTime;
    }
  };

  useMeeting({ onVideoStateChanged, onVideoSeeked });
  const externalPlayer = useRef<any>();

  return !link ? null : (
    <div
      style={{
        borderRadius: commonStyles.borderRadius,
        padding: commonStyles.borderRadius,
        // margin: commonStyles.borderRadius,
        backgroundColor: commonStyles.primary,
        display: "flex",
      }}
    >
      {/* <Title title={"Externam Video"} /> */}

      <video
        style={{
          borderRadius: commonStyles.borderRadius,
          height: commonStyles.height,
          width: commonStyles.width,
          backgroundColor: "black",
        }}
        autoPlay
        ref={externalPlayer}
        src={link}
      />
    </div>
  );
};

export default ExternalVideo;
