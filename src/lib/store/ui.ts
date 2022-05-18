import { proxy } from "valtio";

export interface UI {
  invalidMeetingDialog: boolean;
  setInvalidMeetingDialog: (invalidMeetingDialog: boolean) => void;
}

export const ui = proxy<UI>({
  invalidMeetingDialog: false,
  setInvalidMeetingDialog: (invalidMeetingDialog: boolean) => {
    ui.invalidMeetingDialog = invalidMeetingDialog;
  },
});
