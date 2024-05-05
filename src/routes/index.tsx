import { Navigate, Route, Routes } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, DetalheDePessoas, ListagemDePessoas } from '../pages';


export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        label: 'Pagina Inicial',
        path: '/pagina-incial'
      },
      {
        icon: 'people',
        label: 'Pessoas',
        path: '/pessoas'
      },

    ]);
  }, []);

  return (

    <Routes>
      <Route path='/pagina-incial' element={<Dashboard />} />
      <Route path='/pessoas' element={<ListagemDePessoas />} />
      <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas />} />
      <Route path='*' element={<Navigate to={'/pagina-incial'} />} />
    </Routes>

  );
};