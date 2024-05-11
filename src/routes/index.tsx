import { Navigate, Route, Routes } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, DetalheDeCidades, DetalheDePessoas, ListagemDeCidades, ListagemDePessoas } from '../pages';


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
        icon: 'location_city',
        label: 'Cidades',
        path: '/cidades'
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
      <Route path='/cidades' element={<ListagemDeCidades />} />
      <Route path='/cidades/detalhe/:id' element={<DetalheDeCidades />} />
      <Route path='*' element={<Navigate to={'/pagina-incial'} />} />
    </Routes>

  );
};