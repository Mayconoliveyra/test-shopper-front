import { ChangeEvent, useCallback, useRef, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  styled,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Close, CloudUpload, DangerousOutlined } from "@mui/icons-material";

import { LayoutBasel } from "../../shared/layouts/LayoutBase";
import { MyDialog as MyDialogError } from "../../shared/components/MyModal";

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

  const [data, setData] = useState([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [alertFileIsOpen, setAlertIsOpen] = useState(true);
  const [dialogError, setDialogError] = useState({
    open: false,
    title: "",
    textError: "",
  });

  const handleSetDialogError = (open = false, title = "", textError = "") => {
    setDialogError({ open, title, textError });
  };

  const handleCloseAlertFileIsOpen = () => {
    setAlertIsOpen(false);
  };

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      recreateInputFile();

      // Se o arquivo não foi selecionado ou se não tiver a extensão .CSV, retorna error.
      if (!file || file.name.split(".")?.pop()?.toLowerCase() !== "csv") {
        return handleSetDialogError(
          true,
          "Arquivo inválido",
          "Este arquivo CSV não é válido."
        );
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (!e.target || typeof e.target.result !== "string") {
          return handleSetDialogError(
            true,
            "Arquivo inválido",
            "Este arquivo CSV não é válido."
          );
        }

        processData(e.target.result);
      };

      reader.readAsText(file);
    },
    []
  );

  // Isso vai ajudar a solucionar um problema comum em navegadores, no qual o campo...
  // de entrada de arquivo (input file) não reconhece o mesmo arquivo se você tentar selecioná-lo novamente.
  const recreateInputFile = useCallback(() => {
    const newInput = document.createElement("input");
    newInput.type = "file";
    newInput.accept = ".csv";
    newInput.addEventListener("change", handleFileUpload as any);
    newInput.style.visibility = "hidden";
    newInput.style.display = "none";
    inputRef.current?.parentNode?.replaceChild(newInput, inputRef.current);
    inputRef.current = newInput;
  }, [handleFileUpload]);

  const processData = (content: string) => {
    const lines = content.split("\n");
    const headers = lines[0].split(",");
    const rows: any = [];

    // Aqui vou percorrer todas linhas do arquivo.
    for (let l = 1; l < lines.length; l++) {
      const currentLine = lines[l].split(",");

      const row: { [key: string]: string | number } = {};

      for (let h = 0; h < headers.length; h++) {
        /*    if (typeof currentLine[h] !== "number") return; */
        row[headers[h]] = currentLine[h];
        console.log(row[headers[h]]);
      }
      rows.push(row);
    }

    setData(rows);
  };

  return (
    <>
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
              {alertFileIsOpen && (
                <Alert
                  sx={{ marginBottom: 2 }}
                  icon={false}
                  severity="warning"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={handleCloseAlertFileIsOpen}
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
                  <VisuallyHiddenInput
                    ref={inputRef}
                    onChange={handleFileUpload}
                    type="file"
                    accept=".csv"
                  />
                </Button>
              </Box>
            </Box>
            <Box flex={1} paddingX={md ? 2 : 0} marginTop={md ? 0 : 3}>
              <Typography variant={lg ? "h5" : "h6"}>
                Gestor de preços
              </Typography>
              <Typography variant="caption">
                O arquivo CSV deve ter a seguinte estrutura com duas colunas:
                <br />
                1. Na primeira coluna, insira o código do produto que você
                deseja alterar
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

      <MyDialogError
        isOpen={dialogError.open}
        title={dialogError.title}
        handleCloseDialog={() => handleSetDialogError()}
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
              {dialogError.textError}
            </Typography>
          </Box>

          <Box marginTop={8}>
            <Divider variant="fullWidth" />
          </Box>
          <Box padding={2} display="flex" justifyContent="flex-end">
            <Button
              onClick={() => handleSetDialogError()}
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
      </MyDialogError>
    </>
  );
};
