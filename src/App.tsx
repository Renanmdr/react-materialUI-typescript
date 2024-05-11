
import { BrowserRouter } from 'react-router-dom';
import './shared/form/TraducoesYup';
import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';
import { AppDrawerProvider, AppThemeProvider } from './shared/contexts';



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

