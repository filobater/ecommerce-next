'use client';

import { useProductsCategory } from '@/app/hooks/useProductsCategory';

import ProductsList from '@/app/layout/ProductsList/ProductsList';
import PageTitle from '@/app/components/PageTitle/PageTitle';
import SkeletonCardList from '@/app/layout/SkeletonCardList/SkeletonCardList';

const CategoryPage = ({ params }) => {
  const { data, isLoading } = useProductsCategory(params.category);

  const products = data?.data.products;

  return (
    <div>
      <PageTitle className={'capitalize'}>{params.category}</PageTitle>

      {isLoading ? <SkeletonCardList /> : <ProductsList products={products} />}
    </div>
  );
};

export default CategoryPage;
