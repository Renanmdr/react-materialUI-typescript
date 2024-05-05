import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';
import { FerramentasDeDetalhe } from '../../shared/components';
import { useEffect, useState } from 'react';
import { PessoasService } from '../../shared/servers/api/pessoas/PessoasService';
import { LinearProgress } from '@mui/material';


export const DetalheDePessoas = () => {
  const [nome, setNome] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  useEffect(() => {
    if(id !== 'nova'){
      setIsLoading(true);
      PessoasService.getById(+id).then((response) => {
        setIsLoading(false);
        if(response instanceof Error){
          alert(response.message);
          navigate('/pessoas');
        }else{
          setNome(response.nomeCompleto);
          console.log(response);
        }
      });
    }
  },[id]);

  const handleSave = () => {};
  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id).then((response) => {
        if (response instanceof Error) {
          alert(response.message);
        } else {
          alert('Registro apagado com sucesso');
          navigate('/pessoas');
        }
      });
    }
  };
  return (
    <LayoutBaseDePagina
      titulo={id !== 'nova' ? nome : 'Nova pessoa'}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo= {id !== 'nova'} 
          mostrarBotaoApagar = {id !== 'nova'}
          
          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicarEmApagar={() => handleDelete(+id)}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />}> 
      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}
      {!isLoading && <h1>teste</h1>}
    </LayoutBaseDePagina>
  );
};

