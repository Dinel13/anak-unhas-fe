import Link from "next/link";
import { FC } from "react";
import { logout, selectName } from "../../store/authSlice";
import { DropdownAccount } from "../elements/dropdown";
import { useDispatch, useSelector } from "react-redux";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectName);

  return (
    <header className="w-full bg-rose-900 text-gray-200 px-6 py-4 flex justify-between items-center">
      <Link href="/">
        <a>
          <div className="text-2xl font-bold">Anak Unhas</div>
        </a>
      </Link>
      <nav>
        <ul className="flex items-center">
          {name ? (
            <DropdownAccount name={name} />
          ) : (
            <li className="px-2">
              <Link href="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
