import { ChangeEvent, useCallback, useRef, useState } from "react";

import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  styled,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import {
  CheckCircleOutline,
  Close,
  CloseRounded,
  CloudUpload,
} from "@mui/icons-material";

import { LayoutBasel } from "../../shared/layouts/LayoutBase";
import { MyDialogError } from "../../shared/components/MyModalError";

import {
  IProductValidation,
  PriceManagerService,
} from "../../shared/services/api/priceManager";
import { AxiosError } from "axios";
import { ResponseError } from "../../shared/services/api/axiosConfig";

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

const moneyMask = (
  vlr: number | string | undefined,
  showRS = true
): number | string | undefined => {
  if (typeof vlr === "string" || vlr === undefined) return vlr;
  const valor = vlr
    .toFixed(2)
    .replace(".", ",")
    // eslint-disable-next-line no-useless-escape
    .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
  if (showRS) return `R$ ${valor}`;
  return `${valor}`;
};

export const PriceManager = () => {
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm")); // width < 600px = return true
  const lg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg")); // width > 1200px = return true

  const [fileData, setFileData] = useState<IProductValidation[]>([]);
  const [fileDataHeaders, setFileDataHeaders] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileIsValid, setFileIsValid] = useState<boolean>(false);
  const [myFileCSV, setMyFileCSV] = useState<FormData | null>(null);
  const [myFileHasHeader, setMyFileHasHeader] = useState(true);
  const [myColumnCode, setMyColumnCode] = useState("Selecione");
  const [myColumnPrice, setMyColumnPrice] = useState("Selecione");

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [alertFileIsOpen, setAlertIsOpen] = useState(true);
  const [dialogError, setDialogError] = useState({
    open: false,
    title: "",
    textError: "",
  });

  const newSetDialogError = (open = false, title = "", textError = "") => {
    setDialogError({ open, title, textError });
  };

  const handleCloseAlertFileIsOpen = () => {
    setAlertIsOpen(false);
  };

  const handleOnSelectFileCSV = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      recreateInputFile();

      // Se o arquivo não foi selecionado ou se não tiver a extensão .CSV, retorna error.
      if (!file || file.name.split(".")?.pop()?.toLowerCase() !== "csv") {
        return newSetDialogError(
          true,
          "Arquivo inválido",
          "Este arquivo CSV não é válido."
        );
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (!e.target || typeof e.target.result !== "string") {
          return newSetDialogError(
            true,
            "Arquivo inválido",
            "Este arquivo CSV não é válido."
          );
        }

        // Vou converter o arquivo em um array para poder pegar a primeira linha e utilizar as colunas.
        const content = e.target.result;
        const lines = content
          .trim() // Remove espaços em branco extras no início e no final do arquivo.
          .split("\n") // Divide o arquivo em linhas
          .map((line) => line.trim()) // Remove os espaços em branco extras no início e no final de cada linha.
          .filter((line) => line !== ""); // Filtra linhas vazias

        // Verifico se o arquivo está vazio
        if (lines.length > 0) {
          // Seleciono a primeira linha para o usuário definir as colunas 'Código do produto' e 'Novo preco de venda'.
          const headers = lines[0].split(",").map((line) => line.trim()); // Remove os espaços em branco extras no início e no final de cada linha.

          setFileDataHeaders(headers);
          setMyColumnCode(headers[0] || "Selecione");
          setMyColumnPrice(headers[1] || "Selecione");

          const formData = new FormData();
          formData.append("csv-file-products", file);

          // Seta o arquivo para ser enviado ao backend ao clicar em validar.
          setMyFileCSV(formData);
        } else {
          return newSetDialogError(
            true,
            "Arquivo inválido",
            "O arquivo CSV está vazio."
          );
        }
      };

      reader.readAsText(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Isso vai ajudar a solucionar um problema comum em navegadores, no qual o campo...
  // de entrada de arquivo (input file) não reconhece o mesmo arquivo se você tentar selecioná-lo novamente.
  const recreateInputFile = useCallback(() => {
    const newInput = document.createElement("input");
    newInput.type = "file";
    newInput.accept = ".csv";
    newInput.addEventListener("change", handleOnSelectFileCSV as any);
    newInput.style.visibility = "hidden";
    newInput.style.display = "none";
    inputFileRef.current?.parentNode?.replaceChild(
      newInput,
      inputFileRef.current
    );
    inputFileRef.current = newInput;
  }, [handleOnSelectFileCSV]);

  const handleCancel = () => {
    newSetDialogError();
    setMyFileCSV(null);
    setFileIsValid(false);
    setFileData([]);
    setFileDataHeaders([]);
    setMyFileHasHeader(true);
    setMyColumnCode("Selecione");
    setMyColumnPrice("Selecione");
  };

  const handleValidation = async () => {
    if (myColumnCode === "Selecione") {
      return newSetDialogError(
        true,
        "Erro ao validar",
        `Por favor, defina a coluna 'Código do produto'.`
      );
    }
    if (myColumnPrice === "Selecione") {
      return newSetDialogError(
        true,
        "Erro ao validar",
        `Por favor, defina a coluna 'Novo preço de venda'.`
      );
    }
    if (!myFileCSV) {
      return newSetDialogError(
        true,
        "Erro ao validar",
        `Este arquivo CSV não é válido.`
      );
    }

    setIsLoading(true);
    const dataResult = await PriceManagerService.uploadFileCSV(
      myFileCSV,
      myFileHasHeader ? "true" : "false",
      myColumnCode,
      myColumnPrice
    )
      .then((res) => res.data)
      .catch((error: AxiosError<ResponseError>) => {
        const errorDefault = error.response?.data.errors?.default;

        // Se o error foi tratado ele retornara dentro de errorDefault.
        if (errorDefault) {
          newSetDialogError(true, "Arquivo inválido", errorDefault);
        } else {
          alert(
            "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
          );
        }

        console.log(error);
      });

    if (dataResult) {
      setFileData(dataResult);
      const isError = dataResult.find((produto) => "msgError" in produto);
      if (!isError) setFileIsValid(true);
    }
    setIsLoading(false);
  };

  const handleUpdatePrices = async () => {
    setIsLoading(true);
    await PriceManagerService.updatePrices(fileData)
      .then(() => {
        handleCancel();
      })
      .catch((error: AxiosError<ResponseError>) => {
        const errorDefault = error.response?.data.errors?.default;

        // Se o error foi tratado ele retornara dentro de errorDefault.
        if (errorDefault) {
          newSetDialogError(true, "Arquivo inválido", errorDefault);
        } else {
          alert(
            "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
          );
        }

        console.log(error);
      });
    setIsLoading(false);
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
            padding={fileData.length > 0 ? 1 : lg ? 3 : 2}
            paddingY={fileData.length > 0 ? 1 : 3}
          >
            {myFileCSV ? (
              <>
                {fileData.length > 0 ? (
                  <Box display="flex" width="100%">
                    <Box
                      flex={1}
                      component="table"
                      display="flex"
                      flexDirection="column"
                    >
                      <Grid container item component="thead">
                        <Grid
                          container
                          item
                          xs={12}
                          component="tr"
                          border="1px solid #dcdcdc"
                        >
                          <Grid
                            item
                            xs={2}
                            component="th"
                            borderRight="1px solid #dcdcdc"
                          >
                            <Typography variant="subtitle2">Código</Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            component="th"
                            borderRight="1px solid #dcdcdc"
                          >
                            <Typography variant="subtitle2">Nome</Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            component="th"
                            borderRight="1px solid #dcdcdc"
                          >
                            <Typography variant="subtitle2">
                              Preço Atual
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            component="th"
                            borderRight="1px solid #dcdcdc"
                          >
                            <Typography variant="subtitle2">
                              Novo Preço
                            </Typography>
                          </Grid>
                          <Grid item xs={4} component="th">
                            <Typography variant="subtitle2">
                              Regra Quebrada
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container item component="tbody">
                        {fileData.map((prod) => {
                          return (
                            <Grid
                              key={prod.code}
                              container
                              item
                              xs={12}
                              component="tr"
                              border="1px solid #dcdcdc"
                              borderTop={0}
                            >
                              <Grid
                                item
                                xs={2}
                                component="td"
                                borderRight="1px solid #dcdcdc"
                              >
                                <Typography
                                  variant="body2"
                                  fontSize="0.75rem"
                                  lineHeight={1.2}
                                  padding={0.3}
                                >
                                  {prod.code}
                                </Typography>
                              </Grid>

                              {"msgError" in prod ? (
                                <Grid item xs={10} component="td">
                                  <Typography
                                    variant="body2"
                                    fontSize="0.75rem"
                                    lineHeight={1.2}
                                    padding={0.3}
                                  >
                                    {prod.msgError}
                                  </Typography>
                                </Grid>
                              ) : (
                                <>
                                  <Grid
                                    item
                                    xs={2}
                                    component="td"
                                    borderRight="1px solid #dcdcdc"
                                  >
                                    <Typography
                                      variant="body2"
                                      fontSize="0.75rem"
                                      lineHeight={1.2}
                                      padding={0.3}
                                    >
                                      {prod.name}
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={2}
                                    component="td"
                                    borderRight="1px solid #dcdcdc"
                                    display="flex"
                                    alignItems="center"
                                  >
                                    <Typography
                                      variant="body2"
                                      fontSize="0.75rem"
                                      lineHeight={1.2}
                                      padding={0.3}
                                    >
                                      {moneyMask(prod.sales_price, false)}
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={2}
                                    component="td"
                                    borderRight="1px solid #dcdcdc"
                                    display="flex"
                                    alignItems="center"
                                  >
                                    <Typography
                                      variant="body2"
                                      fontSize="0.75rem"
                                      lineHeight={1.2}
                                      padding={0.3}
                                    >
                                      {moneyMask(prod.new_sales_price, false)}
                                    </Typography>
                                  </Grid>
                                </>
                              )}
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Box>
                ) : (
                  <Box flex={1} display="flex" flexDirection="column">
                    <>
                      <Typography variant={lg || md ? "h5" : "h6"}>
                        Defina o que é cada coluna
                      </Typography>

                      <Grid container marginTop={1}>
                        <Grid xs={12} item container>
                          <Grid xs={12} md={6} lg={4} item container>
                            <Grid
                              item
                              xs={6}
                              padding={1}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              border="1px solid #dcdcdc"
                            >
                              <Typography variant="subtitle2" component="span">
                                Código do produto
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              padding={1}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              border="1px solid #dcdcdc"
                              borderLeft={0}
                            >
                              <Typography variant="subtitle2" component="span">
                                Novo preço de venda
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid xs={12} item container>
                          <Grid xs={12} md={6} lg={4} item container>
                            <Grid
                              item
                              xs={6}
                              padding={1}
                              border="1px solid #dcdcdc"
                            >
                              <FormControl fullWidth size="small">
                                <Select
                                  error={myColumnCode === "Selecione"}
                                  id="select-column-1"
                                  displayEmpty
                                  value={myColumnCode}
                                  onChange={(event) =>
                                    setMyColumnCode(event.target.value)
                                  }
                                >
                                  <MenuItem value="Selecione">
                                    Selecione
                                  </MenuItem>
                                  ;
                                  {fileDataHeaders.map((item, key) => {
                                    return (
                                      <MenuItem
                                        disabled={
                                          item === myColumnPrice &&
                                          item !== "Selecione"
                                        }
                                        key={key}
                                        value={item}
                                      >
                                        {item}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              padding={1}
                              border="1px solid #dcdcdc"
                              borderLeft={0}
                            >
                              <FormControl fullWidth size="small">
                                <Select
                                  error={myColumnPrice === "Selecione"}
                                  id="select-column-2"
                                  displayEmpty
                                  value={myColumnPrice}
                                  onChange={(event) =>
                                    setMyColumnPrice(event.target.value)
                                  }
                                >
                                  <MenuItem value="Selecione">
                                    Selecione
                                  </MenuItem>
                                  ;
                                  {fileDataHeaders.map((item, key) => {
                                    return (
                                      <MenuItem
                                        disabled={
                                          item === myColumnCode &&
                                          item !== "Selecione"
                                        }
                                        key={key}
                                        value={item}
                                      >
                                        {item}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Box marginTop={1}>
                        <FormControlLabel
                          id="my-file-header"
                          value={myFileHasHeader}
                          checked={myFileHasHeader}
                          onClick={() => setMyFileHasHeader((is) => !is)}
                          control={<Checkbox />}
                          label="Meu arquivo possui cabeçalhos"
                        />
                      </Box>
                    </>
                  </Box>
                )}
              </>
            ) : (
              <>
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
                        ref={inputFileRef}
                        onChange={handleOnSelectFileCSV}
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
                    O arquivo CSV deve ter a seguinte estrutura com duas
                    colunas:
                    <br />
                    1. Na primeira coluna, insira o código do produto que você
                    deseja alterar
                    <br />
                    2. Na segunda coluna, coloque o novo preço de venda que você
                    deseja aplicar ao produto.
                    <br />
                    Isso permitirá que o sistema identifique cada produto pelo
                    seu código e atualize o preço de venda correspondente de
                    forma eficiente.
                  </Typography>
                </Box>
              </>
            )}
          </Box>

          {myFileCSV && (
            <Box marginTop={2}>
              {fileData.length > 0 ? (
                <Button
                  disabled={!fileIsValid}
                  onClick={handleUpdatePrices}
                  variant="contained"
                  color="success"
                  sx={{
                    marginRight: 1,
                    textTransform: "none",
                    padding: 1,
                    paddingX: 3,
                  }}
                  startIcon={<CheckCircleOutline />}
                >
                  Atualizar
                </Button>
              ) : (
                <Button
                  onClick={handleValidation}
                  variant="contained"
                  color="success"
                  sx={{
                    marginRight: 1,
                    textTransform: "none",
                    padding: 1,
                    paddingX: 3,
                  }}
                  startIcon={<CheckCircleOutline />}
                >
                  Validar
                </Button>
              )}

              <Button
                onClick={handleCancel}
                variant="contained"
                color="error"
                sx={{ textTransform: "none", padding: 1, paddingX: 3 }}
                startIcon={<CloseRounded />}
              >
                Cancelar
              </Button>
            </Box>
          )}
        </Box>
      </LayoutBasel>

      <MyDialogError
        dialogError={dialogError}
        handleClose={() => newSetDialogError()}
      />

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
