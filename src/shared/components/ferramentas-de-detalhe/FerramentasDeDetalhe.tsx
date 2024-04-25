import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

interface IFerramentasDeDetalhe {
  textoBotaoNovo?: string

  mostrarBotaoNovo?: boolean
  mostrarBotaoVoltar?: boolean
  mostrarBotaoApagar?: boolean
  mostrarBotaoSalvar?: boolean
  mostrarBotaoSalvarEFechar?: boolean

  mostrarBotaoNovoCarregando?: boolean
  mostrarBotaoVoltarCarregando?: boolean
  mostrarBotaoApagarCarregando?: boolean
  mostrarBotaoSalvarCarregando?: boolean
  mostrarBotaoSalvarEFecharCarregando?: boolean

  aoClicarEmNovo?: () => void
  aoClicarEmVoltar?: () => void
  aoClicarEmApagar?: () => void
  aoClicarEmSalvar?: () => void
  aoClicarEmSalvarEFechar?: () => void

}
export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalhe> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar

}) => {
  const isSmDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
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
      padding={1}>

      {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
        <Button
          color='primary'
          variant='contained'
          disableElevation
          onClick={aoClicarEmSalvar}
          startIcon={<Icon>save</Icon>}>

          <Typography
            overflow={'hidden'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            variant={'button'}>
            Salvar
          </Typography>

        </Button>
      )}

      {mostrarBotaoSalvarCarregando && (
        <Skeleton width={109} height={60} />
      )}

      {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !isMdDown && !isSmDown) && (
        <Button
          color='primary'
          variant='outlined'
          disableElevation
          onClick={aoClicarEmSalvarEFechar}
          startIcon={<Icon>save</Icon>}>

          <Typography
            overflow={'hidden'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            variant={'button'}>

            Salvar e fechar
          </Typography>
        </Button>
      )}

      {(mostrarBotaoSalvarEFecharCarregando && !isMdDown && !isSmDown) && (
        <Skeleton width={180} height={60} />
      )}

      {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
        <Button
          color='primary'
          variant='outlined'
          disableElevation
          onClick={aoClicarEmApagar}
          startIcon={<Icon>delete</Icon>}>
          <Typography
            overflow={'hidden'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            variant={'button'}>

            Apagar
          </Typography>
        </Button>
      )}

      {mostrarBotaoApagarCarregando && (
        <Skeleton width={112} height={60} />
      )}

      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !isSmDown) && (
        <Button
          color='primary'
          variant='outlined'
          disableElevation
          onClick={aoClicarEmNovo}
          startIcon={<Icon>add</Icon>}>
          <Typography
            overflow={'hidden'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            variant={'button'}>

            {textoBotaoNovo}

          </Typography>
        </Button>
      )}

      {(mostrarBotaoNovoCarregando && !isSmDown) && (
        <Skeleton width={96} height={60} />
      )}



      {mostrarBotaoVoltar && (mostrarBotaoNovo || mostrarBotaoVoltar || 
       mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar) && (
        <Divider variant='middle' orientation='vertical' />
      )}

      {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
        <Button
          color='primary'
          variant='outlined'
          disableElevation
          onClick={aoClicarEmVoltar}
          startIcon={<Icon>arrow_back</Icon>}>
          <Typography
            overflow={'hidden'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            variant={'button'}>
            Voltar
          </Typography>
        </Button>
      )}

      {mostrarBotaoVoltarCarregando && (
        <Skeleton width={109} height={60} />
      )}
    </Box>
  );
};