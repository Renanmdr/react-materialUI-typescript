
import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/contexts';


export function App() {


  return (
    <>
      <AppThemeProvider>
        <AppRoutes />
      </AppThemeProvider>

    </>
  );
}

