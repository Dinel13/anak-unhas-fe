import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PendingButton from "../../components/button/Pending.jsx";
import { selectToken, selectUserId } from "../../store/authSlice";
import { showNotif } from "../../store/notifSlice";

export default function UpdatePhoto({ cancel, setImage }) {
  const imageRef = useRef(null);
  const [pending, setPending] = useState(false);
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData();
    formData.append("image", imageRef.current.files[0]);
    formData.append("userId", userId);
    console.log(formData);

    try {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/image`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.message || "gagal mengupload photo");
      }
      setImage(data.user);
      dispatch(
        showNotif({
          status: "Success",
          message: "Data berhasil diupdate",
          action: null,
        })
      );
      cancel();
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
    <>
      <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-md mx-auto dar rounded-lg overflow-hidden md:max-w-lg dark-nav">
          <div className="md:flex">
            <div className="w-full">
              <div className="p-4 bg-red-900">
                <span className="px-3 text-lg font-bold text-gray-100">
                  Upload Photo
                </span>
              </div>
              <form onSubmit={handleSubmit} className="p-4 mt-2">
                <label className="inline-flex items-center btn-sec bg-d3 w-full py-2 px-3">
                  <input
                    ref={imageRef}
                    type="file"
                    accept="image/*"
                    alt="your image"
                    required
                    // hidden untuk menghilangkan nama file yang diupload
                  />
                </label>
                <small className="block text-gray-400">
                  Ukuran maksimal: 2mb
                </small>
                <div className="flex mt-6 text-center pb-3">
                  {pending ? (
                    <PendingButton />
                  ) : (
                    <>
                      <button
                        onClick={cancel}
                        className="w-full btn-sec mr-3 py-2"
                      >
                        batal
                      </button>
                      <button
                        className="w-full btn-ter py-2"
                        type="submit"
                      >
                        Upload
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen z-10 overflow-hidden bg-gray-800 opacity-50"></div>
    </>
  );
}
