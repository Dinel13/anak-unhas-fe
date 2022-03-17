import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { showNotif } from "../../store/notifSlice";
import PendingButton from "../../components/button/Pending";
import {selectToken } from "../../store/authSlice";

export default function Update(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(selectToken);
  const [user, setUser] = useState({});
  const [pending, setPending] = useState();
  const { userData } = location.state;

  // get user data from react-router state
  useEffect(() => {
    setUser(userData);
  }, [userData]);

  // submit form update
  const submitHandler = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.message || "gagal mengupload akun");
      }
      setPending(false);
      dispatch(
        showNotif({
          status: "Succes",
          message: "Data berhasil diupdate",
          action: null,
        })
      );
      setTimeout(() => navigate("/akunku"), 2500);
    } catch (error) {
      setPending(false);
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    }
  };
  return (
    <div className="container w-full lg:w-11/12 xl:w-8/12 px-5 py-12 mx-auto">
      <h3 className="text-xl font-medium leading-6 text-gray-900">
        Update Profile
      </h3>
      <p className="mt-1 text-sm text-gray-600">
        Informasi ini akan tampil secara publik di halaman akun anda, jadi
        berikan yang terbaik.
      </p>
      {user && (
        <form id="login" onSubmit={submitHandler}>
          <div className="bg-white dark:bg-gray-800">
            <div className="container mx-auto mb-10 bg-white dark:bg-gray-800 rounded">
              <div className="mx-auto flex flex-wrap -m-4 ">
                <div className="mt-8 flex flex-col md:w-1/2 w-full p-2">
                  <label
                    htmlFor="name"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={user.full_name}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, full_name: e.target.value }))
                    }
                    required
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-700 dark:text-gray-400"
                    placeholder="Nama lengkap"
                  />
                </div>
                <div className="mt-8 flex flex-col md:w-1/2 w-full p-2">
                  <label
                    htmlFor="nick"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Nama panggilan
                  </label>
                  <input
                    type="text"
                    name="nick"
                    required
                    value={user.nick_name}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, nick_name: e.target.value }))
                    }
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-700 dark:text-gray-400"
                    placeholder="Nama pangilan"
                  />
                </div>
                {/* <div className="mt-8 flex flex-col md:w-1/2 w-full p-2">
                  <label
                    htmlFor="akun"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Nama akun
                  </label>
                  <input
                    type="text"
                    name="akun"
                    value={user.publicId}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, publicId: e.target.value }))
                    }
                    required
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-700 dark:text-gray-400"
                    placeholder="Nama akun"
                  />
                  <p className="w-full text-right text-xs pt-1 text-gray-700 dark:text-gray-400">
                    Nama akun harus tidak mengandung spasi dan bersifat unik.
                  </p>
                </div> */}

                {/* <div className="mt-8 flex flex-col md:w-1/2 w-full p-2">
                  <label
                    htmlFor="about"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Motto
                  </label>
                  <textarea
                    name="motto"
                    className="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-700 dark:text-gray-400"
                    placeholder="Motto hidupku"
                    rows={2}
                    value={user.motto}
                    maxLength="100"
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, motto: e.target.value }))
                    }
                  />
                  <p className="w-full text-right text-xs pt-1 text-gray-700 dark:text-gray-400">
                    Maksimal karakter: 100
                  </p>
                </div> */}
                {/* <div className="mt-8 flex flex-col md:w-1/2 w-full p-2">
                  <label
                    htmlFor="medsos"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Medsos Lain
                  </label>
                  <input
                    type="text"
                    name="medsos"
                    value={user.medsos}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, medsos: e.target.value }))
                    }
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-700 dark:text-gray-400"
                    placeholder="Media sosial kamu"
                  />
                </div> */}
                <div className="mt-8 flex flex-col md:w-1/2 w-full p-2">
                  <label
                    htmlFor="alamat"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Telephone
                  </label>
                  <input
                    type="text"
                    name="alamat"
                    value={user.phone}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-700 dark:text-gray-400"
                    placeholder="Jl. Kenangan"
                  />
                </div>
              
                <div className="mt-8 flex flex-col md:w-1/2 w-full p-2">
                  <label
                    htmlFor="alamat"
                    className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Alamat
                  </label>
                  <input
                    type="text"
                    name="alamat"
                    value={user.address}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, address: e.target.value }))
                    }
                    className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-700 dark:text-gray-400"
                    placeholder="Jl. Kenangan"
                  />
                </div>
                {/* <div className="mt-8 flex flex-col md:w-1/2 w-full p-2">
                  <label
                    htmlFor="foto"
                    className="text-sm font-bold text-gray-800 dark:text-gray-100"
                  >
                    Foto Profil{" "}
                    <div className="mt-2 block items-center bg-white border border-gray-300 text-gray-800  py-2.5 px-3 hover:border-indigo-700 rounded">
                      <input
                        onChange={(e) =>
                          setUser((prev) => ({
                            ...prev,
                            image: e.target.files[0],
                          }))
                        }
                        type="file"
                        name="foto"
                        accept="image/*"
                        alt="Foto kamu"
                      />
                    </div>
                  </label>
                  <p className="w-full text-right text-xs pt-1 text-gray-700 dark:text-gray-400">
                    Ukuran maksimal: 1mb
                  </p>
                </div> */}
              </div>
            </div>

            <div className="container mx-auto w-11/12 xl:w-full">
              <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
                {pending ? (
                  <PendingButton />
                ) : (
                  <>
                    <button
                      className="btn-sec px-6 py-2 text-sm mr-3"
                      type="submit"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      className="btn-pri px-6 py-2 text-sm mr-3"
                      type="reset"
                    >
                      Batal
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
