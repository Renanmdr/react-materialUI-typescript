import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemCidade {
    id: number
    nome: string
   
}

export interface IDetalheCidade {
    id: number
    nome: string
   
}

type TCidadesComTotalCount = {
    data: IListagemCidade[]
    totalCount: number
}

const getAll = async (page = 1, filter = ''):Promise<TCidadesComTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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
    return new Error((error as {message: string}).message ||'Erro ao listar os registros');
        
  }
};
const getById = async (id: number):Promise<IDetalheCidade | Error> => {
  try {
   
    const { data } = await Api.get(`/cidades/${id}`);

    if(data){
      return data;
    }

    return new Error('Erro ao consultar os reguistro');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message ||'Erro ao consultar o reguistro');
        
  }
};
const create = async (dados: Omit<IDetalheCidade, 'id'>):Promise<number | Error> => {
  try {

    const { data } = await Api.post<IDetalheCidade>('/cidades', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao cadastrar o reguistro');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao cadastrar o reguistro');

  }
};
const updateById = async (id: number, dados: Omit<IDetalheCidade,'id'> ):Promise<void | Error> => {
  try {

    await Api.put(`/cidades/${id}`, dados);


  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o reguistro');

  }
};
const deleteById = async (id: number):Promise<void | Error> => {
  try {

    await Api.delete(`/cidades/${id}`);

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao deletar o reguistro');

  }
};

export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};