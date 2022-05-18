import { proxy } from "valtio";

export interface Meeting {
  meetingId: string;
  token: string;
  participantName: string;
  micOn: boolean;
  camOn: boolean;
  started: boolean;
  setMic: (micOn: boolean) => void;
  setCam: (camOn: boolean) => void;
  setStarted: (started: boolean) => void;
  setParticipantName: (participantName: string) => void;
  setMeetingId: (meetingId: string) => void;
  setToken: (token: string) => void;
}

export const meeting = proxy<Meeting>({
  meetingId: "",
  token: "",
  participantName: "",
  micOn: false,
  camOn: false,
  started: false,
  setMic: (micOn: boolean) => {
    meeting.micOn = micOn;
  },
  setCam: (camOn: boolean) => {
    meeting.camOn = camOn;
  },
  setStarted: (started: boolean) => {
    meeting.started = started;
  },
  setParticipantName: (participantName: string) => {
    meeting.participantName = participantName;
  },
  setMeetingId: (meetingId: string) => {
    meeting.meetingId = meetingId;
  },
  setToken: (token: string) => {
    meeting.token = token;
  },
});
