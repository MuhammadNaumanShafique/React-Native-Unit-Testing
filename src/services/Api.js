import axios from 'axios';
import * as util from '../utilities';

const create = (baseURL = util.constants.BASEURL) => {
  const api = axios.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      // Authorization: `Bearer ${util.Interceptor.getToken()}`,
    },
  });

  const userSignupApi = params => api.get('/posts');
  const isUserDeletedApi = params => api.get(`/customers/check/is-delete`);
  const deleteUserApi = params => api.delete('customers/delete');

  return {
    userSignupApi,
    isUserDeletedApi,
    deleteUserApi,
  };
};

export default {
  create,
};
