import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getProductDetails = (id) => {
  return axios.get(`https://dummyjson.com/products/${id}`);
};

export const useProductDetails = (id) => {
  return useQuery(['ProductDetails', id], () => getProductDetails(id));
};
