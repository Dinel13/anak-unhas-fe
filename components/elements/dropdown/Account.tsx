import Link from "next/link";
import { useDispatch } from "react-redux";

import { logout } from "../../../store/authSlice";
import s from "./Account.module.css";

const Account = ({ name }: { name: string }): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <div className={`${s.dropdown} inline-block relative w-auto`}>
      <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
        <span className="mr-1">{name}</span>
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
        </svg>
      </button>
      <ul className={`${s.dropdownMenu} absolute hidden text-gray-700 pt-1 w-32 -ml-8`}>
        <li className="rounded-t bg-gray-200  hover:bg-gray-400 py-2 px-4 block">
          <Link href="/profile">
              My Profile
          </Link>
        </li>
        <li className="rounded-b bg-gray-200  hover:bg-gray-400 py-2 px-4 block">
          <button
            onClick={() => dispatch(logout())}
          >
            logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Account;
