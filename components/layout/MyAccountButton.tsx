import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

interface IProps {
  name: string;
  notif: number;
  profile: boolean;
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyAccountButton: React.FC<IProps> = ({
  profile,
  setProfile,
  notif,
  name,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="ml-6 relative">
      <div
        className="flex items-center relative"
        onClick={() => setProfile(!profile)}
      >
        {profile && (
          <div className="w-48 dark-sidebar absolute rounded-lg right-0 shadow-lg top-0 mt-10">
            <Link href="/akunku">
              <a className="flex items-center cursor-pointer p-2 rounded-t-lg hover:text-rose-300 hover:dark-nav">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx={12} cy={7} r={4} />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
                Akun ku
              </a>
            </Link>
            <Link href="/chat">
              <a className="flex items-center cursor-pointer p-2 hover:text-rose-300 hover:dark-nav">
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
                <span className="ml-2">Chat</span>
              </a>
            </Link>
            <div className="flex px-2 py-1 justify-between items-center bg-d4 rounded-b-lg mt-2">
              <button className="p-2" onClick={() => setProfile(!profile)}>
                Cancel
              </button>
              <button
                onClick={() => dispatch(logout())}
                className="flex items-center p-2"
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
                Logout
              </button>
            </div>
          </div>
        )}
        <div className="py-0.5 px-1 btn-pri flex items-center rounded-full transform hover:shadow-xl hover:scale-105 transition duration-150 ease-in-out">
          {notif && <p>{notif}</p>}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mx-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MyAccountButton;
