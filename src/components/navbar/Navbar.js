"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./navbar.module.css";
import ice from "../../../../Blog/blog-app/public/ice-cream.jpg";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();

  const handleShowDropdown = () => setShowDropdown((prev) => true);
  const handleHideDropdown = () => setShowDropdown((prev) => false);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.left}>
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/blog"}>Blogs</Link>
          <Link href={"/contact"}>Contact</Link>
        </h2>
        <ul className={classes.right}>
          {session?.user ? (
            <div>
              <Image
                onClick={handleShowDropdown}
                src={ice}
                width="45"
                height="45"
                alt="profile_image"
              />
              {showDropdown && (
                <div className={classes.dropdown}>
                  <AiOutlineClose
                    className={classes.closeIcon}
                    onClick={() => handleHideDropdown()}
                  />
                  <button
                    onClick={() => {
                      signOut(), handleHideDropdown();
                    }}
                    className={classes.logout}
                  >
                    Logout
                  </button>
                  <Link
                    onClick={() => handleHideDropdown()}
                    href={"/create-blog"}
                    className={classes.create}
                  >
                    Create Blog
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  signIn();
                }}
                className={classes.login}
              >
                Log in
              </button>
              <Link href={"/register"}>Sign up</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
