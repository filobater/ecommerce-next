'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { SearchContext } from '@/app/context/SearchContext';
import { Input } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GiEntryDoor } from 'react-icons/gi';
import { FaCartShopping, FaHeart } from 'react-icons/fa6';
import { AuthContext } from '@/app/context/AuthContext';

const Navbar = () => {
  const router = useRouter();
  const { setSearchValue } = useContext(SearchContext);
  const { user, logout } = useContext(AuthContext);

  const { Search } = Input;

  const onSearch = (value) => {
    if (value && value !== '') {
      setSearchValue(value);
      router.push('/search');
    }
  };

  return (
    <nav className="relative flex w-full sm:flex-wrap lg:flex-nowrap items-center justify-between border-b-[1px] p-2  lg:p-4 lg:pt-8 gap-4">
      <Link className="ml-2  " href="/">
        <Image src="/assets/logo1.png" alt="logo" width={70} height={70} />
      </Link>
      <div className="flex items-baseline flex-1">
        <Search
          placeholder="Search about any product with title or description"
          onSearch={onSearch}
          size="large"
        />
      </div>

      <ul className="flex gap-3 items-center">
        <li>
          <FaHeart className="text-2xl text-red-600 hover:text-red-400" />
        </li>
        <li>
          <FaCartShopping className="text-2xl text-gray-600 hover:text-black" />
        </li>

        {/* just for now until i make the profile page and...  */}
        {user ? (
          <button onClick={logout}>logout</button>
        ) : (
          <li>
            <Link href="/login" title="login">
              <GiEntryDoor className="text-2xl text-gray-600 hover:text-black" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
