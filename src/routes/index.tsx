import { Navigate, Route, Routes} from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard } from '../pages';


export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        label: 'Pagina Inicial',
        path: '/pagina-incial'
      },
      
    ]);
  },[]);

  return (
  
    <Routes>
      <Route path='/pagina-incial' element={<Dashboard />} />
      <Route path='*' element={<Navigate to={'/pagina-incial'}/>} />
    </Routes>
    
  );
};