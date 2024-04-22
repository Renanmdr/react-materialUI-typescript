import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
    children: React.ReactNode
    titulo: string
    barraDeFerramentas?: React.ReactNode
}
export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({children, titulo, barraDeFerramentas}) => {
  const isSmDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();
  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'} gap={1}>
     
      <Box padding={1} display={'flex'} alignItems={'center'} height={theme.spacing(isSmDown ? 6 : isMdDown ? 8 : 12)} gap={1}>
        {isSmDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography 
          overflow={'hidden'}
          whiteSpace={'nowrap'}
          textOverflow={'ellipsis'}
          variant={isSmDown ? 'h5' : isMdDown ? 'h4' : 'h3'}
        >
          {titulo}
        </Typography>
      </Box>

      {barraDeFerramentas && (
        <Box>
          {barraDeFerramentas}
        </Box>
      )}

      <Box flex={1} overflow={'auto'}>
        {children}
      </Box>
     
    </Box>
  );
};

