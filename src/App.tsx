
import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components/menu-lateral/Menu-lateral';
import { AppDrawerProvider, AppThemeProvider } from './shared/contexts';
import { BrowserRouter } from 'react-router-dom';



export function App() {


  return (
    <>
      <AppThemeProvider>
        <AppDrawerProvider>
          <BrowserRouter>
            <MenuLateral>
              <AppRoutes />
            </MenuLateral>
          </BrowserRouter>
         
       
        </AppDrawerProvider>
      </AppThemeProvider>

    </>
  );
}

