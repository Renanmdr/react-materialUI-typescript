import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { CidadesService } from '../../../shared/servers/api/cidades/CidadesService';
import { useField } from '@unform/core';

type TAutoCompleteCidade = {
  id: number
  label: string
};

interface IAutoCompleteCidade {
    isExternalLoading: boolean
}
export const AutoCompleteCidade: React.FC<IAutoCompleteCidade> = ({ isExternalLoading }) => {

  const {fieldName, defaultValue, registerField, clearError, error} = useField('cidadeId');
  
  const [options, setOptions] = useState<TAutoCompleteCidade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);
  const [busca, setBusca] = useState('');


  const { debounce } = useDebounce();

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {

      CidadesService.getAll(1, busca)
        .then((response) => {

          setIsLoading(false);

          if (response instanceof Error) {
            //return alert(response.message);
          } else {
            console.log(response);
            setOptions(response.data.map((cidade) => ({ id: cidade.id, label: cidade.nome })));
          }
        });
    });
  }, [busca]);

  const autoCompleteSelectedOption = useMemo(() => {
    if(!selectedId) return null;
    
    const selectedOption = options.find((option) => option.id === selectedId);
    if (!selectedOption) return null;
   

    return selectedOption;
  }, [selectedId, options]);
  return (
    <Autocomplete
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'

      disablePortal

      value={autoCompleteSelectedOption}

      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={(isLoading || isExternalLoading) ? <CircularProgress size={28} /> : undefined}
      
      onInputChange={(_, newValue) => setBusca(newValue)}
      onChange={(_, newValue) => {setSelectedId(newValue?.id); setBusca(''); clearError();}}
      options={options}
      renderInput={(params) => <TextField 
        {...params}
        error={!!error}
        helperText={error}
        label={'Cidade'}
      />}
    />
  );
};

