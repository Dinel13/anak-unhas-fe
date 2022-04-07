import { FC, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

import { login } from "../store/authSlice";
import { showAlert } from "../store/alertSlice";
import LoadingButton from "../components/common/LoadingButton";

const Signup: FC = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const password = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(false);
  const [isShowPass, setIShowPass] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const signupHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setPending(true);
    try {
      const response = await await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/`,
        {
          method: "POST",
          body: JSON.stringify(input),
          headers: {},
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.data || "Tidak bisa masuk");
      }
      dispatch(login(result.data));
      router.push("/");
    } catch (error: any) {
      dispatch(
        showAlert({
          status: "Error",
          message: error.message,
        })
      );
    } finally {
      setPending(false);
    }
  };

  const handleLogin = async (googleData: any) => {
    try {
      setPending(true);
      const res = await await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/outh/login`,
        {
          method: "POST",
          body: JSON.stringify({
            tokenId: googleData.tokenId,
            email: googleData.profileObj.email,
            googleId: googleData.profileObj.googleId,
          }),
          headers: {},
        }
      );

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.data || "Tidak bisa daftar");
      }
      dispatch(login(result.data));
      router.push("/");
    } catch (error: any) {
      dispatch(
        showAlert({
          status: "Error",
          message: error.message,
        })
      );
    } finally {
      setPending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const showPassword = () => {
    const x = password.current;
    if (x?.type === "password") {
      x.type = "text";
      setIShowPass(true);
    } else if (x?.type === "text") {
      x.type = "password";
      setIShowPass(false);
    }
  };

  return (
    <div className="relative">
      <section className="opacity-40 w-full h-screen">
        <Image
          src="/u.jpg"
          alt="unhas"
          layout="fill"
          className="object-cover w-full h-full"
        />
      </section>
      <div className="py-8 z-10 absolute inset-0">
        <div className="dark-nav w-full max-w-sm px-6 py-4 m-auto rounded-2xl shadow-2xl backdrop-blur bg-black/30">
          <h1 className="text-3xl font-semibold text-center text-white">
            Daftar
          </h1>
          <form className="mt-4" onSubmit={signupHandler}>
            <div>
              <label htmlFor="Name" className="block text-sm text-left">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
                required
                className="input-field mt-1"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm text-left">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                required
                className="input-field mt-1"
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
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  required
                  className="input-field mt-1"
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
              {pending ? (
                <LoadingButton />
              ) : (
                <button type="submit" className="btn-pri w-full py-2">
                  Daftar
                </button>
              )}
            </div>
          </form>
          <p className="text-center my-2 text-gray-200">atau</p>
          <div className="w-full flex justify-center mb-4">
            {pending ? (
              <LoadingButton />
            ) : (
              <GoogleLogin
                // clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID: string}
                clientId="176426802647-gd0a6ehl6hi8gvtanblesfnvp939tgog.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button
                    className="btn-ter inline-flex items-center p-2 text-sm"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <span className="w-6 h-6 relative mr-1">
                      <Image
                        src="/g.png"
                        layout="fill"
                        alt="google"
                        className="w-7 pr-1"
                      />
                    </span>
                    Daftar dengan Google
                  </button>
                )}
                onSuccess={handleLogin}
                onFailure={(res) => console.log("Login failed: res:", res)}
                cookiePolicy={"single_host_origin"}
              />
            )}
          </div>
          <p className="text-sm font-light text-center">
            Sudah Punya Akun?{" "}
            <button
              onClick={() => router.push("/login")}
              className="font-medium text-indigo-600 dark:text-gray-200 hover:underline"
            >
              MASUK
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
