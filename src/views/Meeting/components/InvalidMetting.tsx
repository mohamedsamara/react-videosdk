import { useSnapshot } from "valtio";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { store } from "../../../lib/store";
import { useNavigate } from "react-router-dom";

const TITLE = "Invalid meeting ID";
const DESCRIPTION = `We couldn't find the meeting you're trying to join.`;

const InvalidMeeting = () => {
  const navigate = useNavigate();
  const { ui } = useSnapshot(store);
  if (!ui.invalidMeetingDialog) return null;

  const handleClose = () => {
    ui.setInvalidMeetingDialog(false);
    navigate({ pathname: `/meeting` });
  };

  return (
    <Dialog
      open={ui.invalidMeetingDialog}
      onClose={handleClose}
      aria-labelledby={TITLE}
      aria-describedby={DESCRIPTION}
    >
      <DialogTitle id="alert-dialog-title">{TITLE}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {DESCRIPTION}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvalidMeeting;
