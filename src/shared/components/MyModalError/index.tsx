import { DangerousOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { MyDialog } from "../MyModal";
import React from "react";

interface IMyDialogError {
  dialogError: { open: boolean; title: string; textError: string };
  handleClose: () => void;
}

export const MyDialogError = ({ dialogError, handleClose }: IMyDialogError) => {
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm")); // width < 600px = return true
  const lg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg")); // width > 1200px = return true

  return (
    <MyDialog
      isOpen={dialogError.open}
      title={dialogError.title}
      handleCloseDialog={handleClose}
    >
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          flex={1}
          padding={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <DangerousOutlined
            sx={{ width: 80, height: 80, marginBottom: 2, color: "#dc3545" }}
          />
          <Typography
            variant="h6"
            fontSize={lg || md ? "1.3rem" : "1rem"}
            fontWeight={400}
            component="span"
          >
            {dialogError.textError.split("\n").map((parte, index) => (
              <React.Fragment key={index}>
                {parte}
                <br />
              </React.Fragment>
            ))}
          </Typography>
        </Box>

        <Box marginTop={8}>
          <Divider variant="fullWidth" />
        </Box>
        <Box padding={2} display="flex" justifyContent="flex-end">
          <Button
            onClick={handleClose}
            variant="contained"
            disableElevation
            disableFocusRipple
            disableRipple
            disableTouchRipple
            size="large"
            sx={{
              borderRadius: 1,
              backgroundColor: "#495057",
              "&:hover": { backgroundColor: "#495057" },
            }}
          >
            OK
          </Button>
        </Box>
      </Box>
    </MyDialog>
  );
};
