import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  errorMessage:string;
}

export default function MessageDialog({ open, onClose,errorMessage }: SimpleDialogProps) {
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Error</DialogTitle>
      <List sx={{ p: 2 }}>
        <ListItem disableGutters>
          <ListItemText primary={errorMessage} />
        </ListItem>
      </List>
      <Button autoFocus onClick={handleListItemClick}>
        Close
      </Button>
    </Dialog>
  );
}
