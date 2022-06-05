import { proxy } from "valtio";

export interface UI {
  invalidMeetingDialog: boolean;
  invalidMeetingDialogMsg?: string;
  setInvalidMeetingDialog: (
    invalidMeetingDialog: boolean,
    invalidMeetingDialogMsg?: string
  ) => void;
}

export const ui = proxy<UI>({
  invalidMeetingDialog: false,
  invalidMeetingDialogMsg: "",
  setInvalidMeetingDialog: (
    invalidMeetingDialog: boolean,
    invalidMeetingDialogMsg?: string
  ) => {
    ui.invalidMeetingDialog = invalidMeetingDialog;
    ui.invalidMeetingDialogMsg = invalidMeetingDialogMsg;
  },
});
