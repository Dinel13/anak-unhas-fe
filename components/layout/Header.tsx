import Link from "next/link";
import { FC } from "react";
import { logout, selectName } from "../../store/authSlice";
import { DropdownAccount } from "../elements/dropdown";
import { useDispatch, useSelector } from "react-redux";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectName);

  return (
    <header className="w-full bg-red-900 text-gray-200 px-6 py-4 flex justify-between items-center">
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
            <div className="flex items-center text-sm">
              <Link href="/login">
                <a className="mr-1.5 p-1.5 link-scale">login</a>
              </Link>
              <Link href="/signup">
                <a className="mr-1.5 p-1.5 link-scale">signup</a>
              </Link>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
