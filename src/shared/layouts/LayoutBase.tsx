import { Box, useTheme } from "@mui/material";
import { HeaderBar } from "../components/HeaderBar";

interface ILayoutBase {
  children: React.ReactNode;
}

export const LayoutBasel = ({ children }: ILayoutBase) => {
  const theme = useTheme();

  return (
    <>
      <HeaderBar />
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        component="main"
        paddingTop={theme.spacing(10)}
      >
        {children}
      </Box>
    </>
  );
};
