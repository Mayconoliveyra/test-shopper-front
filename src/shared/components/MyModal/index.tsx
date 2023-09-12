import { ArrowBack, Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ReactNode } from "react";

interface IMyDialog {
  title: string;
  isOpen: boolean;
  isLoading?: boolean;
  children: ReactNode;
  handleCloseDialog?: () => void;
}

export const MyDialog = ({
  title,
  isOpen,
  isLoading = false,
  children,
  handleCloseDialog,
}: IMyDialog) => {
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm")); // width < 600px = return true
  const lg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg")); // width > 1200px = return true

  return (
    <Dialog
      open={isOpen}
      onClose={isLoading ? undefined : handleCloseDialog}
      fullWidth
      maxWidth="md"
      fullScreen={lg || md ? false : true}
      sx={{ ".MuiDialog-paper": { borderRadius: lg || md ? 1 : 0 } }}
    >
      {lg || md ? (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={3}
        >
          <Typography variant="h5" fontWeight={500} component="h2">
            {title}
          </Typography>
          <IconButton
            size="small"
            disabled={isLoading}
            disableFocusRipple
            disableRipple
            disableTouchRipple
            onClick={handleCloseDialog}
          >
            <Close />
          </IconButton>
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={1}
          >
            <Box display="flex" alignItems="center">
              <IconButton
                size="medium"
                disabled={isLoading}
                disableFocusRipple
                disableRipple
                disableTouchRipple
                onClick={handleCloseDialog}
              >
                <ArrowBack />
              </IconButton>
              <Typography fontSize="1rem" fontWeight={600} component="h2">
                {title}
              </Typography>
            </Box>
            <IconButton
              size="small"
              disabled={isLoading}
              disableFocusRipple
              disableRipple
              disableTouchRipple
              onClick={handleCloseDialog}
            >
              <Close />
            </IconButton>
          </Box>
          <Box>
            <Divider variant="fullWidth" />
          </Box>
        </>
      )}

      <DialogContent sx={{ display: "flex", padding: 0 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
