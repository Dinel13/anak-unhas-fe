import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import PendingButton from "../../components/button/Pending.jsx";
import SubmitFull from "../../components/button/Submit.jsx";
import Warning from "../../components/modal/Warning.jsx";
import { login as loginSlice } from "../../store/authSlice";
import { showNotif } from "../../store/notifSlice";

export default function Login() {
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const [pending, setPending] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;
  const [allert, setAllert] = useState(from);

  const loginHandler = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const response = await await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email : email.current.value,
            password : password.current.value,
          }),
          headers: {
            // "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error.message || "Tidak bisa masuk");
      }
      // redurect to from or home
      if (from) {
        navigate(from);
      } else {
        navigate("/");
      }
      dispatch(loginSlice(result.user));
    } catch (error) {
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    } finally {
      setPending(false);
    }
  };

  // auto hide allert after 4 seconds
  allert && setTimeout(() => setAllert(false), 4000);

  return (
    <>
      {allert && (
        <div className="fixed left-0 bottom-0 z-40">
          <Warning
            title="Peringatan"
            body="Kamu harus login dulu"
          />
        </div>
      )}
      <div className="py-16">
        <div className="form-card dark:bg-gray-800">
          <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
            Masuk ke Jagokan
          </h1>
          <form className="mt-6" onSubmit={loginHandler}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Email
              </label>
              <input
                ref={email}
                type="email"
                autoComplete="email"
                required
                className="input-field mt-2"
              />
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800 dark:text-gray-200"
                >
                  Password
                </label>
                <Link
                  to="/akunku/lupa-sandi"
                  className="text-xs text-indigo-600 dark:text-gray-400 hover:underline"
                >
                  Lupa Password?
                </Link>
              </div>
              <input
                ref={password}
                required
                type="password"
                autoComplete="current-password"
                className="input-field mt-2"
              />
            </div>

            <div className="mt-6">
              {pending ? <PendingButton /> : <SubmitFull text="Masuk" />}
            </div>
          </form>

          <p className="mt-6 text-sm font-light text-center text-gray-700">
            Belum Punya Akun?{" "}
            <button
              onClick={() => navigate("/daftar", {state : { from }}) }
              className="font-medium text-indigo-600 dark:text-gray-200 hover:underline"
            >
              DAFTAR
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
