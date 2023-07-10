import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getProductsCategory = (categoryName) => {
  return axios.get(`https://dummyjson.com/products/category/${categoryName}`);
};

export const useProductsCategory = (categoryName) => {
  return useQuery(['ProductsCategory', categoryName], () =>
    getProductsCategory(categoryName)
  );
};
