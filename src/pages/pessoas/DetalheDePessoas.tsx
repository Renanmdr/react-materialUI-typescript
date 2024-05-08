import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';
import { FerramentasDeDetalhe } from '../../shared/components';
import { useEffect, useRef, useState } from 'react';
import { PessoasService } from '../../shared/servers/api/pessoas/PessoasService';

import { Form } from '@unform/web';
import { VTextField } from '../../shared/form';
import { FormHandles } from '@unform/core';

interface IFormData {
  email: string
  cidadeId: number
  nomeCompleto: string
}
export const DetalheDePessoas = () => {
  const [nome, setNome] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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
          formRef.current?.setData(response);
        }
      });
    }
  },[id]);

  const handleSave = (dados: IFormData ) => {
    setIsLoading(true);
    if(id === 'nova'){
      PessoasService.create(dados).then((response) => {
        setIsLoading(false);
        if(response instanceof Error){
          alert(response.message);
        }else{
          navigate(`/pessoas/detalhe/${response}`);
        }
      });
    }else{
      PessoasService.updateById(+id, dados).then((response) => {
        setIsLoading(false);
        if (response instanceof Error) {
          alert(response.message);
        }
      });
    }
  };
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
          
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(+id)}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />}> 
       
      <Form  ref={formRef} onSubmit={handleSave}>

        <VTextField placeholder='Nome completo' name='nomeCompleto'
        />
        <VTextField placeholder='Email' name='email'
        />
        <VTextField placeholder='Cidade Id' name='cidadeId'
        />

      </Form>
    </LayoutBaseDePagina>
  );
};

