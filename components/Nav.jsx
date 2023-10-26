"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../public/assets/images/logo.svg";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  // NEXT-AUTH:

  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  // TOGGLE MOBILE MENU:

  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 ">
      {/********** LEFT SIDE NAVBAR ********/}

      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={logo}
          alt="promptgenius logo"
          width={50}
          height={50}
          className="object-contain"
          priority={true}
          quality={75} // {number 1-100}
        />
        <p className="logo_text">Promptgenius</p>
      </Link>

      {/******* RIGHT SIDE NAVBAR ***********/}

      {/* DESKTOP MENU */}

      <div className="md:flex hidden">
        {/* When user is logged in */}

        {/* Checking first what we have in session?.user and in the provider */}

        {console.log(session?.user)}
        {console.log(providers)}

        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button
              className="outline_btn"
              type="button"
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.push("/"); // Redirect to the dashboard page after signing out
                });
              }}
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={43}
                height={43}
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

      <div className="md:hidden flex relative">
        {/* When user is logged in */}
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={43}
              height={43}
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
                  href="/"
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({ redirect: false }).then(() => {
                      router.push("/"); // Redirect to the dashboard page after signing out
                    });
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
