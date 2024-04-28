import { Environment } from '../../../environment';
import { Api } from '../axios-config';

interface IListagemPessoa {
    id: number
    email: string
    cidadeId: number
    nomeCompleto: string
}

interface IDetalhePessoa {
    id: number
    email: string
    cidadeId: number
    nomeCompleto: string
}

type TPessoasComTotalCount = {
    data: IListagemPessoa[]
    totalCount: number
}

const getAll = async (page = 1, filter = ''):Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if(data){
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS)
      };
    }

    return new Error('Erro ao listar os reguistros');
  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message ||'Erro ao listar os reguistros');
        
  }
};
const getById = async (id: number):Promise<IDetalhePessoa | Error> => {
  try {
   
    const { data } = await Api.get(`/pessoas/${id}`);

    if(data){
      return data;
    }

    return new Error('Erro ao consultar os reguistro');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message ||'Erro ao consultar o reguistro');
        
  }
};
const create = async (dados: Omit<IDetalhePessoa, 'id'>):Promise<number | Error> => {
  try {

    const { data } = await Api.post<IDetalhePessoa>('/pessoas', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao cadastrar o reguistro');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao cadastrar o reguistro');

  }
};
const updateById = async (id: number, dados: IDetalhePessoa ):Promise<void | Error> => {
  try {

    await Api.put(`/pessoas/${id}`, dados);

    return new Error('Erro ao atualizar o reguistro');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o reguistro');

  }
};
const deleteById = async (id: number):Promise<void | Error> => {
  try {

    await Api.delete(`/pessoas/${id}`);


    return new Error('Erro ao deletar os reguistro');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao deletar o reguistro');

  }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};