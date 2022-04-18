import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { showAlert } from "../../store/alertSlice";
import { getToken } from "../../store/authSlice";
import LoadingButton from "../../components/common/LoadingButton";

export default function Update(props) {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const [user, setUser] = useState({});
  const [pending, setPending] = useState();
  const router = useRouter()
  // const { userData } = location.state;

  // get user data from react-router state
  // useEffect(() => {
  //   setUser(userData);
  // }, [userData]);

  // submit form update
  const submitHandler = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user`,
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
        showAlert({
          status: "Succes",
          message: "Data berhasil diupdate",
          action: null,
        })
      );
      setTimeout(() => router.push("/akunku"), 1500);
    } catch (error) {
      setPending(false);
      dispatch(
        showAlert({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    }
  };
  return (
    <div className="container w-full lg:w-11/12 xl:w-8/12 px-5 py-12 mx-auto">
      <h3 className="text-subtitle-2">Update Profile</h3>
      {user && (
        <form id="login" onSubmit={submitHandler}>
          <div className="mx-auto flex flex-wrap">
            <div className="flex flex-col md:w-1/2 w-full p-2">
              <label htmlFor="name" className="pb-2 text-sm font-bold">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                required
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
                placeholder="Nama lengkap"
              />
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2">
              <label htmlFor="nick" className="pb-2 text-sm font-bold ">
                Angkatan
              </label>
              <input
                type="number"
                name="nick"
                required
                value={user.angkatan}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    angkatan: e.target.value,
                  }))
                }
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
                placeholder="Nama pangilan"
              />
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2">
              <label className="pb-2 text-sm font-bold">
                Fakultas
              </label>
              <input
                type="text"
                value={user.fakultas}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    fakultas: e.target.value,
                  }))
                }
                required
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
                placeholder="Teknik"
              />
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2">
              <label className="pb-2 text-sm font-bold">
                Jurusan
              </label>
              <input
                type="text"
                value={user.jurusan}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    jurusan: e.target.value,
                  }))
                }
                required
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
              />
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2">
              <label className="pb-2 text-sm font-bold">
                Telepon/Wa
              </label>
              <input
                type=""
                value={user.wa}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    wa: e.target.value,
                  }))
                }
                required
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
              />
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2">
              <label className="pb-2 text-sm font-bold">
                Gender
              </label>
              <select
                type="text"
                value={user.gender}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
                defaultValue={user.gender}
                required
                className="bg-d1 block border border-gray-500 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
              >
                <option className="bg-d1" value="">Pilih</option>
                <option className="bg-d1" value="Laki-laki">Laki-laki</option>
                <option value="Perempuan" className="bg-d1">Perempuan</option>
              </select>
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2 ">
              <label className="pb-2 text-sm font-bold">
                Minat dan Bakat
              </label>
              <input
                type="text"
                value={user.tertarik}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    tertarik: e.target.value,
                  }))
                }
                required
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
              />
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2">
              <label className="pb-2 text-sm font-bold">
                Alamat
              </label>
              <input
                type="text"
                value={user.address}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
              />
            </div>
            <div className="flex flex-col w-full p-2">
              <label className="pb-2 text-sm font-bold">
                Bio
              </label>
              <textarea
                type="text"
                value={user.bio}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
                required
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end mt-2">
            {pending ? (
              <LoadingButton />
            ) : (
              <>
                <button
                  onClick={() => router.back()}
                  className="btn-pri px-6 py-2 text-sm mr-3"
                  type="reset"
                >
                  Batal
                </button>
                <button className="btn-sec px-6 py-2 text-sm" type="submit">
                  Update
                </button>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
