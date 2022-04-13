import Link from "next/link";
import { ErrorInfo, FC, useRef, useState } from "react";
import { selectName } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import MyAccountButton from "./MyAccountButton";
import { useRouter } from "next/router";
import { showAlert } from "../../store/alertSlice";
import SideNav from "./SideNav";

interface Iprops {
  notif: number;
  closeSckt: () => void;
}

const Header: FC<Iprops> = ({ notif, closeSckt }) => {
  const [profile, setProfile] = useState(false);
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("");
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const router = useRouter();

  const searchSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/search?search=${key}&page=1`,
        {
          method: "GET",
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.message || "gagal mendapat layanan");
      }
      setKey("");
      router.push({
        pathname: "/pencarian",
        query: { data: JSON.stringify(data) },
      });
    } catch (error: any) {
      dispatch(
        showAlert({
          status: "Error",
          message: error.message,
        })
      );
    }
  };

  return (
    <>
      {/* BIG SCREEN NAV */}
      <header className="xs:block hidden text-gray-50 shadow-lg sticky top-0 w-full z-20 bg-gradient-to-r from-red-900 to-pink-900">
        <div className="flex items-center justify-between flex-wrap py-2.5 px-3 xs:px-6 lg:px-10 ">
          <Link href="/">
            <a>
              <div className="text-2xl font-bold">Anak Unhas</div>
            </a>
          </Link>
          <nav className="flex flex-grow tems-center w-auto ml-1">
            <div className="flex-grow xs:flex xs:justify-center">
              <form
                onSubmit={searchSubmit}
                className="flex w-40 sm:w-48 md:w-56 items-center justify-center relative"
              >
                <input
                  className="w-full dark-nav h-9 px-3 pr-8 rounded-full text-sm focus:outline-none"
                  type="search"
                  name="search"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  required
                  placeholder="Cari..."
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
              {name ? (
                <MyAccountButton
                  profile={profile}
                  setProfile={setProfile}
                  notif={notif}
                  name={name}
                  closeSckt={closeSckt}
                />
              ) : (
                <div className="flex items-center text-sm">
                  <Link href="/login">
                    <a className="mr-1.5 p-1.5 link-scale">login</a>
                  </Link>
                  <Link href="/signup">
                    <a className="mr-1.5 p-1.5 link-scale">signup</a>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* SMALL SCREEN NAV */}
      <header className="block xs:hidden text-gray-50 shadow-lg sticky top-0 w-full z-20 bg-gradient-to-r from-red-900 to-pink-900">
        <div className="flex items-center justify-between py-1 px-4">
          <div className="flex items-center">
            <div
              className="p-2 cursor-pointer -ml-2"
              onClick={() => setShow(!show)}
            >
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
            <Link href="/">
              <a className="font-semibold tracking-wider">ANAK-UNHAS</a>
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
              value={key}
              onChange={(e) => setKey(e.target.value)}
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
        <SideNav setShow={setShow} show={show} name={name} />
      </header>
    </>
  );
};

export default Header;
