import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getSearchProducts = (query) => {
  return axios.get(`https://dummyjson.com/products/search?q=${query}`);
};

export const useSearchProducts = (query) => {
  return useQuery(['searchProducts', query], () => getSearchProducts(query));
};
