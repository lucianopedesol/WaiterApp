import axios from 'axios';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: 'http://192.168.0.20:5000/'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('@MarcasSession:authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// interceptor para respostas 401 (não autorizado)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Aqui você pode adicionar a lógica para lidar com o erro 401,
      // como redirecionar para a página de login ou limpar o token.
      toast.info('Token inválido ou expirado. Redirecionando para login...');
      console.log('Token inválido ou expirado. Redirecionando para login...');
      localStorage.removeItem('@MarcasSession:authToken');
      window.location.href = '/'; // Redireciona para a página de login
    }
    // validação de erros de rede
    if (error.message === 'Network Error') {
      toast.error('Erro de rede. Verifique sua conexão com a internet.');
      console.error('Erro de rede. Verifique sua conexão com a internet.');
    }
    // validação de erros 404 (Not Found)
    if (error.response && error.response.status === 404) {
      toast.error('Recurso não encontrado (404)');
    }
    // validação de erros 500 (Internal Server Error)
    if (error.response && error.response.status === 500) {
      toast.error('Erro interno do servidor (500). Tente novamente mais tarde.');
      console.error('Erro interno do servidor (500). Tente novamente mais tarde.');}
    // validação de erros 400 (Bad Request)
    if (error.response && error.response.status === 400) {
      // Adicione um toast ou log para informar o usuário use o react-toastify
      // Exemplo de toast: adicione a mesnsagem eviada pelo backend
      if (error.response.data && error.response.data.error) {
        toast.error(`Erro: ${error.response.data.error}`);
      } else {
        toast.error('Requisição inválida (400). Verifique os dados enviados.');
      }
    }

    return Promise.reject(error);
  }
);
