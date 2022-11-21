import { Box, IconButton, Snackbar, SnackbarContent, Theme } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { selectNotification } from "../../store/Notification/selectors";
import { hideNotification } from "../../store/Notification/notificationSlice";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

export const Notification = () => {
  const notification = useSelector(selectNotification);

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (event) {
      event.preventDefault();
    }
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideNotification());
  };

  const Icon = variantIcon[notification.notificationType];
  return (
    <div>
      <Snackbar
        open={notification.visible}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        // autoHideDuration={3000}
      >
        <SnackbarContent
          sx={{ ...classes.snackBar, ...classes.error }}
          aria-describedby="client-snackbar"
          message={
            <Box
              component={"span"}
              id="client-snackbar"
              sx={classes.messageError}
            >
              <Icon sx={classes.icon} />
              {notification.message}
            </Box>
          }
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              sx={classes.closeIconError}
              onClick={handleClose}
            >
              <CloseIcon sx={classes.icon} />
            </IconButton>
          }
        />
      </Snackbar>
    </div>
  );
};

const classes = {
  snackBar: {
    padding: "0px 10px",
    // backgroundColor: "#1C1C1C",
    borderStyle: "solid",
    borderWidth: "1px",
    width: "478.8px",
  },
  success: {
    borderColor: (theme) => theme.palette.success.main || "#03c4c8",
  },
  error: {
    borderColor: (theme) => theme.palette.error.main || "#ff3362",
  },
  warning: {
    borderColor: (theme) => theme.palette.warning.main || "#ffc12a",
  },
  info: {
    borderColor: "#304075",
  },
  icon: {
    fontSize: 20,
    margin: (theme) => theme.spacing(1),
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: (theme) => theme.spacing(1),
  },
  updateMessage: {
    display: "flex",
    alignItems: "center",
  },
  messageError: {
    display: "flex",
    alignItems: "center",
    color: (theme) => theme.palette.error.main || "#ff3362",
  },
  "message-warning": {
    display: "flex",
    alignItems: "center",
    color: (theme) => theme.palette.warning.main || "#ffc12a",
  },
  "message-info": {
    display: "flex",
    alignItems: "center",
    color: "#304075",
  },
  "message-success": {
    display: "flex",
    alignItems: "center",
    color: (theme) => theme.palette.success.main || "#03c4c8",
  },
  margin: {
    margin: (theme) => theme.spacing(1),
  },
  closeIconError: {
    color: (theme) => theme.palette.error.main || "#ff3362",
  },
  "closeIcon-warning": {
    color: (theme) => theme.palette.warning.main || "#ffc12a",
  },
  "closeIcon-info": {
    color: "#304075",
  },
  "closeIcon-success": {
    color: (theme) => theme.palette.success.main || "#03c4c8",
  },
};

export default Notification;
