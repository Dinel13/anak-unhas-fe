import Link from "next/link";
import { FC, useState } from "react";
import { selectName } from "../../store/authSlice";
import { useSelector } from "react-redux";
import MyAccountButton from "./MyAccountButton";

const Header = ({notif}: {notif:number}) => {
  const [profile, setProfile] = useState(false);
  const name = useSelector(selectName);

  return (
    <header className="w-full bg-gradient-to-r from-red-900 to-d1  text-gray-200 px-6 py-4 flex justify-between items-center">
      <Link href="/">
        <a>
          <div className="text-2xl font-bold">Anak Unhas</div>
        </a>
      </Link>
      <nav>
        <ul className="flex items-center">
          {name ? (
            <MyAccountButton profile={profile}
            setProfile={setProfile}
            notif={notif} name={name} />
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

export default Header;
