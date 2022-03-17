import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { showNotif } from "../../store/notifSlice";
import PendingButton from "../../components/button/Pending.jsx";
import SubmitFull from "../../components/button/Submit.jsx";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const email = useRef();
  const [pending, setPending] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setPending(true);
    try {
      const respon = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.current.value,
          }),
        }
      );
      const data = await respon.json();
      if (!respon.ok) {
        throw new Error(data.error.message || "Tidak bisa mengirim lupa password");
      }
      setPending(false);
      dispatch(
        showNotif({
          status: "Success",
          message:
            "Link untuk mereset password berhasil dikirim ke email kamu. Link hanya akan aktif selama 10 menit",
          action: null,
        })
      );
      email.current.value = "";
    } catch (error) {
      setPending(false);
      dispatch(
        showNotif({
          status: "Success",
          message: error.message,
          action: null,
        })
      );
    }
  };

  return (
    <div className="mt-24" style={{ minHeight: "70vh", padding: "0 10px" }}>
      <div className="form-card dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
          Lupa Password
        </h1>
        <form className="mt-6" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="Email"
              className="block text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              ref={email}
              type="email"
              required
              className="input-field mt-2 mb-3+"
            />
          </div>
          <div className="mt-4">
            {pending ? <PendingButton /> : <SubmitFull text="Kirim" />}
          </div>
        </form>
      </div>
    </div>
  );
}
