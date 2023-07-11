'use client';

import Link from 'next/link';
import React from 'react';
import { Input } from 'antd';

const Navbar = () => {
  const { Search } = Input;

  const onSearch = (value) => {
    console.log(value.toLowerCase());
  };

  return (
    <nav className="relative flex w-full flex-wrap items-center justify-between border-b-[1px]	 py-2 text-neutral-500  hover:text-neutral-700 focus:text-neutral-700  lg:py-4 lg:pt-8">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <Link className="ml-2 text-xl text-neutral-800 font-semibold" href="/">
          Store
        </Link>
        <div className="ml-5 flex w-[50%] items-center justify-between gap-4">
          <Search
            placeholder="Search about any product"
            onSearch={onSearch}
            size="large"
          />
          <p>wishlist</p>
          <p>cart</p>
          <p>avatar</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
