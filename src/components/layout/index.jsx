import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../assets/logo1.png";
import MyAccount from "./MyAccountButton";
import SideNav from "./SideNav";
import Auth from "./AuthButton";
import { selectName } from "../../store/authSlice";
import { showNotif } from "../../store/notifSlice";

export default function Navbar({notif}) {
  const userName = useSelector(selectName);
  const [show, setShow] = useState(null);
  const [profile, setProfile] = useState(false);
  const searchRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchSubmit = async (e) => {
    e.preventDefault();
    const search = searchRef.current.value;
    try {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/service/search?q=${search}`,
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

  return (
    <>
        {/* BIG SCREEN NAV */}
        <header className="xs:block hidden text-gray-50 shadow-lg sticky top-0 w-full z-20 bg-gradient-to-r from-red-900 to-pink-900">
          <div className="flex items-center justify-between flex-wrap py-2.5 px-3 xs:px-6 lg:px-10 ">
            <Link to="/" className="sm:text-xl font-semibold tracking-wider">
              ANAK-UNHAS
            </Link>
            <nav
              className="flex flex-grow tems-center w-auto ml-1"
            >
              <div className="flex-grow xs:flex xs:justify-center">
                <form
                  onSubmit={searchSubmit}
                  className="flex w-40 sm:w-48 md:w-56 items-center justify-center relative"
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
              <div className="flex items-center">
                {userName ? (
                  <MyAccount profile={profile} setProfile={setProfile} notif={notif} />
                ) : (
                  <Auth />
                )}
              </div>
            </nav>
          </div>
        </header>

        {/* SMALL SCREEN NAV */}
        <header className="block xs:hidden text-gray-50 shadow-lg sticky top-0 w-full z-20 bg-gradient-to-r from-red-900 to-pink-900">
          <div className="flex items-center justify-between py-2 px-4">
            <div className="flex items-center">
              <div className="p-2 cursor-pointer -ml-2" onClick={() => setShow(!show)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1={4} y1={6} x2={20} y2={6} />
                  <line x1={4} y1={12} x2={20} y2={12} />
                  <line x1={4} y1={18} x2={20} y2={18} />
                </svg>
              </div>
              <Link to="/" className="font-semibold tracking-wider">
                ANAK-UNHAS
              </Link>
            </div>
            <form
              onSubmit={searchSubmit}
              className="w-32 vvs:w-36 vs:w-40 xs:w-44 relative"
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
          {/*Mobile responsive sidebar*/}
          <SideNav setShow={setShow} show={show} name={userName} />
        </header>
    </>
  );
}
