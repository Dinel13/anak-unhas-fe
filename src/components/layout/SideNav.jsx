import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../store/authSlice";
import Auth from "./AuthButton";

export default function SideNav({ show, setShow, name }) {
  const dispatch = useDispatch();
  return (
    <div
      className={
        show
          ? "w-full h-full fixed z-40 transform translate-x-0 bottom-0 left-0 duration-150"
          : "w-full h-full absolute z-40 transform -translate-x-full bottom-0 left-0 duration-150"
      }
    >
      {/* outside the side nav */}
      <div
        className="bg-gray-800 opacity-50 w-full h-full"
        onClick={() => setShow(!show)}
      />
      {/* the sidenav */}
      <div className="w-64 z-40 fixed overflow-y-auto top-0 h-screen dark-sidebar">
        <div className="py-5 bg-d1 flex w-full items-center justify-between px-3">
          <Link to="/" onClick={() => setShow(!show)}>
            <p className="text-lg font-semibold">ANAK-UNHAS</p>
          </Link>
          <div
            onClick={() => setShow(!show)}
            className="cursor-pointer dark-link rounded p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </div>
        </div>
        <Link
          to="/akunku"
          onClick={() => setShow(!show)}
          className="cursor-pointer p-3 flex items-center hover:text-rose-300 hover:dark-nav"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx={12} cy={7} r={4} />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
          <p className="ml-2">Akun ku</p>
        </Link>
        <Link
          to="/chat"
          onClick={() => setShow(!show)}
          className="cursor-pointer p-3 flex items-center hover:text-rose-300 hover:dark-nav"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            />
          </svg>
          <p className="ml-2">Chat</p>
        </Link>
        <button
          onClick={() => {
            setShow(!show);
            dispatch(logout());
          }}
          className="cursor-pointer p-3 flex items-center hover:text-rose-300 hover:dark-nav w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <p className="ml-2">Logout</p>
        </button>
        <div className="p-3 fixed bottom-0 left-0 w-64 z-40 border-t-2 border-d4">
          {name ? (
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="chat-truncate text-gray-800 text-base leading-4 ml-2">
                  {name}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-end" onClick={() => setShow(!show)}>
              <Auth />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
