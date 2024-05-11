import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { LayoutBaseDePagina } from '../../shared/layouts/LayoutBaseDePagina';
import { FerramentasDeDetalhe } from '../../shared/components';
import { CidadesService } from '../../shared/servers/api/cidades/CidadesService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/form';

interface IFormData {
  nome: string
 
}

const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3)
});
export const DetalheDeCidades = () => {
  const [nome, setNome] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  useEffect(() => {
    if(id !== 'nova'){
      setIsLoading(true);
      CidadesService.getById(+id).then((response) => {
        setIsLoading(false);
        if(response instanceof Error){
          alert(response.message);
          navigate('/cidades');
        }else{
          setNome(response.nome);
          formRef.current?.setData(response);
        }
      });
    }else{
      formRef.current?.setData({
        nome: ''
      });
    }
  },[id]);

  const handleSave = (dados: IFormData ) => {
    formValidationSchema
      .validate(dados, {abortEarly: false})
      .then((dadosValidados) => {
        setIsLoading(true);
        if (id === 'nova') {
          CidadesService.create(dadosValidados).then((response) => {
            setIsLoading(false);
            if (response instanceof Error) {
              alert(response.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/cidades');

              } else {
                navigate(`/cidades/detalhe/${response}`);

              }
            }
          });
        } else {
          CidadesService.updateById(+id, dadosValidados).then((response) => {
            setIsLoading(false);
            if (response instanceof Error) {
              alert(response.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/cidades');

              }
            }
          });
        }
      }).catch((errors: yup.ValidationError) => {
        const ValidationErrors: IVFormErrors = {};

        errors.inner.map((error) => {
          if(!error.path) return;

          ValidationErrors[error.path] = error.message; 
        });
        console.log(ValidationErrors);
        formRef.current?.setErrors(ValidationErrors);
      });

  
  };
  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      CidadesService.deleteById(id).then((response) => {
        if (response instanceof Error) {
          alert(response.message);
        } else {
          alert('Registro apagado com sucesso');
          navigate('/cidades');
        }
      });
    }
  };
  return (
    <LayoutBaseDePagina
      titulo={id !== 'nova' ? nome : 'Nova cidade'}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo= {id !== 'nova'} 
          mostrarBotaoApagar = {id !== 'nova'}
          
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(+id)}
          aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/cidades')}
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
                  label='Nome' 
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

          </Grid>
        </Box>

      </VForm>
    </LayoutBaseDePagina>
  );
};

