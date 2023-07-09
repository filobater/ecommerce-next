import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getProducts = () => {
  return axios.get('https://dummyjson.com/products');
};

export const useProducts = () => {
  return useQuery(['products'], getProducts);
};
