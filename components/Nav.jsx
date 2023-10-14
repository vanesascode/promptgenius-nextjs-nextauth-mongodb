"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../public/assets/images/logo.svg";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  // NEXT-AUTH:

  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  // TOGGLE MOBILE MENU:

  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/********** LEFT SIDE NAVBAR ********/}

      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={logo}
          alt="promptgenius logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptgenius</p>
      </Link>

      {/******* RIGHT SIDE NAVBAR ***********/}

      {/* DESKTOP MENU */}

      <div className="sm:flex hidden">
        {/* When user is logged in */}

        {/* Checking first what we have in session?.user and in the provider */}

        {console.log(session?.user)}
        {console.log(providers)}

        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button className="outline_btn" type="button" onClick={signOut}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile pic"
              />
            </Link>
          </div>
        ) : (
          <>
            {/* When user is logged out */}

            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* MOBILE MENU */}

      <div className="sm:hidden flex relative">
        {/* When user is logged in */}
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile pic"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  className="dropdown_link"
                  href="/profile"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  className="dropdown_link"
                  href="/create-prompt"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* When user is logged out */}

            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

// session?.user ? => we're checking if a user exists
