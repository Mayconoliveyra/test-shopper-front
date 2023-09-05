import {
  Alert,
  Box,
  Button,
  IconButton,
  Paper,
  styled,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LayoutBasel } from "../../shared/layouts/LayoutBase";
import { Close, CloudUpload } from "@mui/icons-material";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export const PriceManager = () => {
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm")); // width < 600px = return true
  const lg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg")); // width > 1200px = return true

  const theme = useTheme();

  const [alertSetFileIsOpen, setAlertSetFileIsOpen] = useState(true);

  const handleCloseAlertaSetFile = () => {
    setAlertSetFileIsOpen(false);
  };

  return (
    <LayoutBasel>
      <Box flex={1} padding={lg ? 4 : md ? 3 : 2}>
        <Box
          component={Paper}
          elevation={2}
          display="flex"
          flexDirection={md ? "row" : "column"}
          padding={lg ? 3 : 2}
          paddingY={3}
        >
          <Box flex={1} paddingX={md ? 2 : 0}>
            {alertSetFileIsOpen && (
              <Alert
                sx={{ marginBottom: 2 }}
                icon={false}
                severity="warning"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={handleCloseAlertaSetFile}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                Selecione um arquivo <b>.CSV</b> do seu computador.
              </Alert>
            )}
            <Box>
              <Button
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                size={lg ? "large" : "medium"}
                sx={{
                  backgroundColor: "#495057",
                  "&:hover": { backgroundColor: "#495057" },
                  textTransform: "none",
                }}
                component="label"
                variant="contained"
                startIcon={<CloudUpload sx={{ width: 25, height: 25 }} />}
                href="#file-upload"
              >
                Selecione um arquivo
                <VisuallyHiddenInput type="file" />
              </Button>
            </Box>
          </Box>
          <Box flex={1} paddingX={md ? 2 : 0} marginTop={md ? 0 : 3}>
            <Typography variant={lg ? "h5" : "h6"}>Gestor de preços</Typography>
            <Typography variant="caption">
              O arquivo CSV deve ter a seguinte estrutura com duas colunas:
              <br />
              1. Na primeira coluna, insira o código do produto que você deseja
              alterar
              <br />
              2. Na segunda coluna, coloque o novo preço de venda que você
              deseja aplicar ao produto.
              <br />
              Isso permitirá que o sistema identifique cada produto pelo seu
              código e atualize o preço de venda correspondente de forma
              eficiente.
            </Typography>
          </Box>
        </Box>
      </Box>
    </LayoutBasel>
  );
};
