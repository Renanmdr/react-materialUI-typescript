import { Search } from '@mui/icons-material';
import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from '@mui/material';
import React from 'react';

interface IFerramentasDaListagemProps {
  textoDaBusca?: string
  mostrarInputBusca?: boolean
  aoMudarTextoDeBusca?: (novoTexto: string) => void
  textoBotaoNovo?: string
  mostrarBotaoNovo?: boolean
  aoClicarEmNovo?: () => void
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClicarEmNovo
}) => {
  const theme = useTheme();
  return (
    <Box 
      gap={1}
      display={'flex'} 
      alignItems={'center'}
      height={theme.spacing(5)}
      component={Paper}
      marginX={1}
      paddingX={2}
      padding={1}
    >
        
      {mostrarInputBusca && (
        <TextField size='small'
          placeholder='Pesquisando...'
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }} />)}

      <Box display={'flex'} flex={1} justifyContent={'end'}>
        {mostrarBotaoNovo && (
          <Button
            color='primary'
            variant='contained'
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}>

            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};