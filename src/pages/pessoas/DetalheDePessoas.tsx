import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';

import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';
import { FerramentasDeDetalhe } from '../../shared/components';
import { PessoasService } from '../../shared/servers/api/pessoas/PessoasService';
import { VTextField, VForm, useVForm } from '../../shared/form';

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

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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
    }else{
      formRef.current?.setData({
        email: '',
        cidadeId: '',
        nomeCompleto: ''
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
          if (isSaveAndClose()) {
            navigate('/pessoas');
            
          } else {
            navigate(`/pessoas/detalhe/${response}`);
            
          }
        }
      });
    }else{
      PessoasService.updateById(+id, dados).then((response) => {
        setIsLoading(false);
        if (response instanceof Error) {
          alert(response.message);
        }else {
          if (isSaveAndClose()) {
            navigate('/pessoas');

          }
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
          
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(+id)}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/pessoas')}
        />}> 
       
      <VForm ref={formRef} onSubmit={handleSave}>

        <Box m={1} display={'flex'} flexDirection={'column'} component={Paper} variant='outlined'>
        
          <Grid container  direction={'column'} padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6' >
                Geral
              </Typography>
            </Grid>

            <Grid container item direction={'row'} spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth 
                  disabled={isLoading} 
                  label='Nome completo' 
                  name='nomeCompleto'
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction={'row'} spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField fullWidth disabled={isLoading} label='Email' name='email'
                />
              </Grid>
            </Grid>

            <Grid container item direction={'row'} spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField fullWidth disabled={isLoading} label='Cidade' name='cidadeId'
                />
              </Grid>
            </Grid>

          </Grid>
        </Box>

      </VForm>
    </LayoutBaseDePagina>
  );
};

