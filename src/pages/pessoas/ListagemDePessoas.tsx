import { useNavigate, useSearchParams } from 'react-router-dom';
import {  FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useEffect, useMemo, useState } from 'react';
import { IListagemPessoa, PessoasService } from '../../shared/servers/api/pessoas/PessoasService';
import { useDebounce } from '../../shared/hooks';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { Environment } from '../../shared/environment';

export const ListagemDePessoas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { debounce } = useDebounce();
  const navigate = useNavigate();

  
  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return searchParams.get('pagina') || '1';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {

      PessoasService.getAll(+pagina, busca)
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
  },[busca, pagina]);

  const handleDelete = (id: number) => {
    if(confirm('Realmente deseja apagar?')){
      PessoasService.deleteById(id).then((response) => {
        if(response instanceof Error){
          alert(response.message);
        }else{
          setRows((oldRows) => [...oldRows.filter((row) => row.id !== id)]);
          alert('Registro apagado com sucesso');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo='Listagem de Pessoas'
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo='Nova' 
          mostrarInputBusca 
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          textoDaBusca={busca} aoMudarTextoDeBusca={texto => setSearchParams({busca: texto, pagina: '1'}, {replace: true})}  />}>
      
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
                <TableCell sx={{  p: 1 }} >
                  <IconButton onClick={() => handleDelete(row.id)} size='small' sx={{ p: 1 }}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton onClick={() => navigate(`/pessoas/detalhe/${row.id}`) } size='small' sx={{ p: 1 }}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
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
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow >
                <TableCell sx={{ p: 1.5 }} colSpan={3}>
                  <Pagination 
                    page={+pagina} 
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                  />
                  
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
      
    </LayoutBaseDePagina>
  );
};