import { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";

import ExternalVideo from "./ExternalVideo";
import Participants from "./Participants";
import Chat from "./Chat";

interface MeetingProps {
  onMeetingLeave: () => void;
}

const Meeting = (props: MeetingProps) => {
  const { onMeetingLeave } = props;

  const onMeetingLeft = () => {
    onMeetingLeave();
  };

  const {
    meetingId,
    leave,
    startRecording,
    stopRecording,
    toggleMic,
    toggleWebcam,
    toggleScreenShare,
    startVideo,
    stopVideo,
    resumeVideo,
    pauseVideo,
    seekVideo,
    startLivestream,
    stopLivestream,
  } = useMeeting({
    onMeetingLeft,
  });

  const handlestartVideo = () => {
    console.log("handlestartVideo");

    startVideo({
      link: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    });
  };
  const handlestopVideo = () => {
    stopVideo();
  };
  const handleresumeVideo = () => {
    resumeVideo();
  };
  const handlepauseVideo = () => {
    pauseVideo({ currentTime: 2 });
  };
  const handlesseekVideo = () => {
    seekVideo({ currentTime: 5 });
  };
  const handleStartLiveStream = () => {
    startLivestream([
      {
        url: "rtmp://a.rtmp.youtube.com/live2",
        streamKey: "key",
      },
    ]);
  };
  const handleStopLiveStream = () => {
    stopLivestream();
  };
  const handleStartRecording = () => {
    startRecording();
  };
  const handleStopRecording = () => {
    stopRecording();
  };

  const [toggleWebcamTimeout, setToggleWebcamTimeout] = useState(false);

  const tollbarHeight = 120;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "#D6E9FE",
      }}
    >
      <div style={{ height: tollbarHeight }}>
        <button className={"button red"} onClick={leave}>
          LEAVE
        </button>
        <button className={"button blue"} onClick={toggleMic}>
          toggleMic
        </button>
        <button
          className={"button blue"}
          onClick={() => {
            toggleWebcam();
            setToggleWebcamTimeout(true);
            setTimeout(() => {
              setToggleWebcamTimeout(false);
            }, 500);
          }}
          disabled={toggleWebcamTimeout}
        >
          toggleWebcam
        </button>
        <button className={"button blue"} onClick={toggleScreenShare}>
          toggleScreenShare
        </button>
        <button className={"button blue"} onClick={handlestartVideo}>
          startVideo
        </button>
        <button className={"button blue"} onClick={handlestopVideo}>
          stopVideo
        </button>
        <button className={"button blue"} onClick={handleresumeVideo}>
          resumeVideo
        </button>
        <button className={"button blue"} onClick={handlepauseVideo}>
          pauseVideo
        </button>
        <button className={"button blue"} onClick={handlesseekVideo}>
          seekVideo
        </button>
        <button className={"button blue"} onClick={handleStartLiveStream}>
          Start Live Stream
        </button>
        <button className={"button blue"} onClick={handleStopLiveStream}>
          Stop Live Stream
        </button>
        <button className={"button blue"} onClick={handleStartRecording}>
          start recording
        </button>
        <button className={"button blue"} onClick={handleStopRecording}>
          stop recording
        </button>
      </div>
      <h1>Meeting id is : {meetingId}</h1>
      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            flex: 1,
            overflowY: "scroll",
            height: `calc(100vh - ${tollbarHeight}px)`,
          }}
        >
          {/* <ExternalVideo /> */}
          <Participants />
        </div>
        {/* <Chat tollbarHeight={tollbarHeight} /> */}
      </div>
    </div>
  );
};

export default Meeting;
