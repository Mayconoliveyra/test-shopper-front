import { AppBar, Avatar, Box, Toolbar, useTheme } from "@mui/material";

export const HeaderBar = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#1E2044",
        height: theme.spacing(10),
      }}
    >
      <Toolbar sx={{ margin: "auto auto", width: "100%", maxWidth: 1200 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Avatar
            variant="square"
            component="a"
            href="/"
            src="./logo-original.webp"
            alt="Logo da Shopper"
            sx={{ width: 142, height: 38 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
