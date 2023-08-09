'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { SearchContext } from '@/app/context/SearchContext';
import { Input } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GiEntryDoor } from 'react-icons/gi';
import { FaCartShopping, FaHeart } from 'react-icons/fa6';
import { RxAvatar } from 'react-icons/rx';
import { BiLogOut } from 'react-icons/bi';
import { AuthContext } from '@/app/context/AuthContext';

const Navbar = () => {
  const router = useRouter();
  const { setSearchValue } = useContext(SearchContext);
  const { user, logout } = useContext(AuthContext);

  //to hide and show the options in the avatar
  const [hide, setHide] = useState(true);
  const optionsAvatarRef = useRef();

  const { Search } = Input;

  const onSearch = (value) => {
    if (value && value !== '') {
      setSearchValue(value);
      router.push('/search');
    }
  };

  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener('click', handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (
      optionsAvatarRef.current &&
      !optionsAvatarRef.current.contains(event.target)
    ) {
      setHide(true);
    }
  }

  return (
    <nav className="relative flex w-full sm:flex-wrap lg:flex-nowrap items-center justify-between border-b-[1px] p-2  lg:p-4 lg:pt-8 gap-4">
      <Link className="ml-2  " href="/">
        <Image
          src="/assets/logo1.png"
          alt="logo"
          width={70}
          height={70}
          priority
        />
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
          <Link href="/cart" ariralabel="cart">
            <FaCartShopping className="text-2xl text-gray-600 hover:text-black" />
          </Link>
        </li>

        {/* just for now until i make the profile page and...  */}
        {user ? (
          <div ref={optionsAvatarRef} className="relative">
            <RxAvatar
              className="text-2xl cursor-pointer"
              onClick={() => setHide(!hide)}
            />
            <div
              className={` bg-white w-[200px] h-[150px] absolute top-[40px] right-0 rounded-lg shadow-xl   z-10 p-5 border border-gray-200
             ${hide && 'hidden'}
             `}
            >
              <ul className="capitalize flex items-center flex-col mt-4 gap-4 ">
                <li>
                  <Link className="flex items-center gap-3" href="/profile">
                    {' '}
                    <RxAvatar /> Profile
                  </Link>
                </li>
                <li
                  onClick={logout}
                  className="flex items-center gap-3 cursor-pointer font-semibold"
                >
                  <BiLogOut /> Logout
                </li>
              </ul>
            </div>
          </div>
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
