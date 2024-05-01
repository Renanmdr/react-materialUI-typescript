import { useSearchParams } from 'react-router-dom';
import {  FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useEffect, useMemo, useState } from 'react';
import { IListagemPessoa, PessoasService } from '../../shared/servers/api/pessoas/PessoasService';
import { useDebounce } from '../../shared/hooks';
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { Environment } from '../../shared/environment';

export const ListagemDePessoas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { debounce } = useDebounce();

  
  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {

      PessoasService.getAll(1, busca)
        .then((response) => {

          setIsLoading(false);

          if (response instanceof Error) {
            return alert(response.message);
          } else {
            console.log(response);
            setTotalCount(response.totalCount);
            setRows(response.data);
          }
        });
    });
  },[busca]);

  return (
    <LayoutBaseDePagina
      titulo='Listagem de Pessoas'
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo='Nova' 
          mostrarInputBusca 
          textoDaBusca={busca} aoMudarTextoDeBusca={texto => setSearchParams({busca: texto}, {replace: true})}  />}>
      
      <TableContainer component={Paper} sx={{ m: 1, width: 'auto' }} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {(rows.length === 0 && !isLoading) && <caption>{Environment.LISTAGEM_VAZIA}</caption>}
          <TableFooter >
            {isLoading && (
              <TableRow >
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
      
    </LayoutBaseDePagina>
  );
};