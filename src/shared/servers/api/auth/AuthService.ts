import { Api } from '../axios-config';



interface IAuth {
    accessToken: string
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {

    const { data } = await Api.get('/auth', {data: {email, password}});

    if (data) {
      return data;
    }

    return new Error('Erro ao entrar o reguistro');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao entrar o reguistro');

  }
};

export const AuthServce = {
  auth
};