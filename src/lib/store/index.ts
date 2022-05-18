import { proxy } from "valtio";

interface Store {
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

export const store = proxy<Store>({
  meetingId: "",
  token: "",
  participantName: "",
  micOn: false,
  camOn: false,
  started: false,
  setMic: (micOn: boolean) => {
    store.micOn = micOn;
  },
  setCam: (camOn: boolean) => {
    store.camOn = camOn;
  },
  setStarted: (started: boolean) => {
    store.started = started;
  },
  setParticipantName: (participantName: string) => {
    store.participantName = participantName;
  },
  setMeetingId: (meetingId: string) => {
    store.meetingId = meetingId;
  },
  setToken: (token: string) => {
    store.token = token;
  },
});
