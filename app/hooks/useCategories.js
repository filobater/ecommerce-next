import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getCategories = () => {
  return axios.get('https://dummyjson.com/products/category-list');
};

export const useCategories = () => {
  return useQuery(['categories'], getCategories);
};
