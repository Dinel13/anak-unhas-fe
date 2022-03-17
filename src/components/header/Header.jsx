import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { showNotif } from "../../store/notifSlice";
import { selectName } from "../../store/authSlice";
import MyAccountButton from "./MyAccountButton";
import AuthButton from "./AuthButton";

export default function Header() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const searchRef = useRef();
   const userName = useSelector(selectName);



   const searchSubmit = async (e) => {
      e.preventDefault();
      const search = searchRef.current.value;
      try {
         const result = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/service/search?q=${search}`,
            // `http://localhost:8080//service/search?q=${search}`,
            {
               method: "GET",
            }
         );
         const data = await result.json();
         if (!result.ok) {
            throw new Error(data.message || "gagal mendapat layanan");
         }
         console.log(data);
         searchRef.current.value = "";
         navigate("/pencarian", {
            state: { data, search },
         });
      } catch (error) {
         dispatch(
            showNotif({
               status: "Error",
               message: error.message,
               action: null,
            })
         );
      }
   };

   const clickMenu = () => {
      const navItem = document.getElementById("nav-item");
      if (navItem.classList.contains("flex")) {
         navItem.classList.remove("flex");
         navItem.classList.add("hidden");
      } else {
         navItem.classList.add("flex");
         navItem.classList.remove("hidden");
      }
   };

   return (
      <header className="text-gray-50 shadow-lg sticky top-0 w-full z-10 bg-gradient-to-r from-red-900 to-pink-900">
         <div className="flex items-center justify-between flex-wrap py-2.5 px-3 md:px-6 lg:px-10 ">
            <Link
               to="/"
               className="sm:text-xl font-semibold tracking-wider"
            >
               ANAK-UNHAS
            </Link>
            <div className="md:hidden m-0" onClick={clickMenu}>
               <button className="py-1 px-2 text-gray-600 hover:text-gray-800 hover:bg-yellow-200 rounded-md focus:outline-none">
                  <svg
                     className="h-6 w-6"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <title>Menu</title>
                     <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
               </button>
            </div>
            <nav
               className="w-full flex-grow flex-col md:flex-row md:items-center md:w-auto hidden md:flex ml-2 mt-3 md:mt-0"
               id="nav-item"
            >
               <div className="flex-grow md:flex md:justify-center">
                  <form
                     onSubmit={searchSubmit}
                     className="flex w-52 items-center justify-center p-0 relative "
                  >
                     <input
                        className="w-full dark-nav h-9 px-3 pr-8 rounded-full text-sm focus:outline-none"
                        type="search"
                        name="search"
                        ref={searchRef}
                        required
                        placeholder="Cari Teman"
                     />
                     <button
                        type="submit"
                        className="absolute right-0 top-0 py-2.5 px-2"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-4 w-4"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                           />
                        </svg>
                     </button>
                  </form>

               </div>
               <div className="flex items-center justify-end mt-2.5 md:mt-0">
                  {userName ? (
                     <MyAccountButton />
                  ) : (
                     <AuthButton />
                  )}
               </div>
            </nav>
         </div>
      </header>
   );
}
