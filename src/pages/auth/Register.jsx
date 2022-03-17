import { useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import  { GoogleLogin } from "react-google-login";

import PendingButton from "../../components/button/Pending.jsx";
import SubmitFull from "../../components/button/Submit.jsx";
import { login as loginSlice } from "../../store/authSlice";
import { showNotif } from "../../store/notifSlice";
import google from "../../assets/g.png";

export default function Login() {
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const [pending, setPending] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;
  const [isShowPass, setIShowPass] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const response = await await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
          }),
          headers: {
            // "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error.message || "Tidak bisa daftar");
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

  const handleLogin = async (googleData) => {
    try {
      const res = await await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/outh/login`,
        {
          method: "POST",
          body: JSON.stringify({
            tokenId: googleData.tokenId,
            email: googleData.profileObj.email,
            googleId: googleData.profileObj.googleId,
          }),
          headers: {
            // "Content-Type": "application/json"
          },
        }
      );

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error.message || "Tidak bisa daftar");
      }
      dispatch(loginSlice(result.user));
    } catch (error) {
      console.log(error);
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    }
  };

  const showPassword = () => {
    const x = password.current;
    if (x.type === "password") {
      x.type = "text";
      setIShowPass(true);
    } else {
      setIShowPass(false);
      x.type = "password";
    }
  };

  return (
    <div className="py-16">
      <div className="dark-nav w-full max-w-md p-10 m-auto rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-semibold text-center text-white">Daftar</h1>
        <form className="mt-6" onSubmit={loginHandler}>
          <div>
            <label htmlFor="email" className="block text-sm text-left">
              Email
            </label>
            <input
              ref={email}
              type="email"
              required
              className="input-field mt-2"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
            </div>
            <div className="relative mb-6">
              <input
                ref={password}
                required
                type="password"
                className="input-field mt-2 block"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-1.5 top-3 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={showPassword}
              >
                {!isShowPass ? (
                  <>
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </>
                ) : (
                  <>
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </>
                )}
              </svg>
            </div>
          </div>
          <div className="mt-6">
            {pending ? <PendingButton /> : <SubmitFull text="Daftar" />}
          </div>
        </form>
        <p className="text-center my-2 text-gray-200">atau</p>
        <div className="w-full flex justify-center mb-4">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <button
                className="btn-ter inline-flex items-center p-2 text-sm"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img src={google} alt="google" className="w-7 pr-1" /> Daftar
                dengan Google
              </button>
            )}
            onSuccess={handleLogin}
            onFailure={(res) => console.log("Login failed: res:", res)}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <p className="text-sm font-light text-center">
          Sudah Punya Akun?{" "}
          <button
            onClick={() => navigate("/masuk", { state: { from } })}
            className="font-medium text-indigo-600 dark:text-gray-200 hover:underline"
          >
            MASUK
          </button>
        </p>
      </div>
    </div>
  );
}
