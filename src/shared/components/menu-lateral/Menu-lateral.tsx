import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';



interface IListItemLinkProps {
  icon: string
  label: string
  to: string
  onClick?: () => void
}

const ListItemLink: React.FC<IListItemLinkProps> = ({icon, label, onClick, to}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  const resolvePath = useResolvedPath(to);
  const match = useMatch({path: resolvePath.pathname, end: false});
  
  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label}/>
    </ListItemButton>
  );
};

interface IMenuLateralProps {
  children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();
  return (
    <>
      <Drawer open={isDrawerOpen} variant={isSmDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} display={'flex'} flexDirection={'column'} height={'100%'}>

          <Box width={'100%'} height={theme.spacing(20) } display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12)}} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/badd596b-ac1c-472f-8cf1-6609b7e4d635/d1u3lrl-b0163b9a-4b66-4669-9196-24025fadae2e.jpg/v1/fill/w_893,h_894,q_70,strp/funny_dog_2_by_cathita_d1u3lrl-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNSIsInBhdGgiOiJcL2ZcL2JhZGQ1OTZiLWFjMWMtNDcyZi04Y2YxLTY2MDliN2U0ZDYzNVwvZDF1M2xybC1iMDE2M2I5YS00YjY2LTQ2NjktOTE5Ni0yNDAyNWZhZGFlMmUuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.6vdmpXVixFtqI7Nl7lgEESNcvJ6mropksOuROYNF8xM" />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component={'nav'}>
              {drawerOptions.map(drawerOption => (
                <ListItemLink 
                  key={drawerOption.path}
                  to={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={isSmDown ? toggleDrawerOpen : undefined} />
              ))}
             
            </List>
          </Box>

        </Box>
      </Drawer>

      <Box height={'100vh' } marginLeft={isSmDown ? 0 : theme.spacing(28)}>
        {children}

      </Box>
    </>
  );
};