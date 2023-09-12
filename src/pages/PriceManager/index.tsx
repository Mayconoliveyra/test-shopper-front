import { useEffect } from 'react';

import { Environment } from '../../shared/environment';

import { LayoutBasePainel } from '../../shared/layouts/LayoutBasePainel';

import { Box, Theme, Typography, useMediaQuery } from '@mui/material';

export const PriceManager = () => {
  const tablet = useMediaQuery((theme: Theme) => theme.breakpoints.only('tablet'));
  const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.only('desktop'));

  useEffect(() => {
    document.title = 'Complementos - Painel Gerencial';
  }, []);
  return (
    <LayoutBasePainel
      title="Cadastrar grupo"
      subtitle="Após realizar o cadastro, você terá a oportunidade de incluir itens no seu novo grupo complementar."
      showBtnSave
    >
      a
      {/*  <FTextField
          label="Nome"
          name="nome"
          variant="outlined"
          margin="normal"
          disabled={isLoading}
          formik={formik}
             inputRef={inputRef}
          onKeyDown={(event) => handleKeyPress(event, formik)}
          helperText={`${formik.values.nome.length}/70 caracteres`}
          maxLength={70}
        /> */}
    </LayoutBasePainel>
  );
};
