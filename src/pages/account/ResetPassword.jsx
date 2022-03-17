import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate} from "react-router-dom";

import { showNotif } from "../../store/notifSlice";
import PendingButton from "../../components/button/Pending.jsx";
import SubmitFull from "../../components/button/Submit.jsx";
import { login } from "../../store/authSlice";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const [pending, setPending] = useState();
  const password = useRef();
  const passwordConf = useRef();
  const params = useParams();
  const token = params.token;
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setPending(true);
    password.current.value !== passwordConf.current.value &&
      dispatch(
        showNotif({
          status: "Error",
          message: "Password konfirmasi harus sama",
          action: null,
        })
      );
    try {
      const respon = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            password: password.current.value,
            password_confirm: passwordConf.current.value,
          }),
        }
      );
      const data = await respon.json();
      if (!respon.ok) {
        throw new Error(data.error.message || "Tidak bisa mengirim lupa password");
      }
      password.current.value = "";
      passwordConf.current.value = "";
      dispatch(
        login({
          token: data.user.token,
          id: data.user.id,
          name: data.user.name,
        })
      );
      dispatch(
        showNotif({
          status: "Success",
          message: "Password berhasil direset",
          action: null,
        })
      );
      setTimeout(navigate("/"), 2000);
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

  return (
    <div style={{ minHeight: "70vh" }}>
      <div className="form-card dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
          Reset Password
        </h1>
        <form className="mt-6" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Password Baru
            </label>
            <input
              ref={password}
              type="password"
              required
              className="required block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="passwordConf"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Konfirmasi Password
            </label>
            <input
              ref={passwordConf}
              type="password"
              required
              className="required block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div className="mt-4">
            {pending ? <PendingButton /> : <SubmitFull text="Reset" />}
          </div>
        </form>
      </div>
    </div>
  );
}
