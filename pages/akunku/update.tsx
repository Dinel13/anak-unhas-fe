import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { showAlert } from "../../store/alertSlice";
import { getToken } from "../../store/authSlice";
import LoadingButton from "../../components/common/LoadingButton";
import { User } from "../user/[id]";

const Update: FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    id: 0,
    email: "",
    gender: "",
    wa: "",
    image: "",
    jurusan: "",
    fakultas: "",
    address: "",
    bio: "",
    angkatan: "",
    ig: "",
    tertarik: "",
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const dataQuery = router.query.user ? router.query.user + "" : undefined;
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  useEffect(() => {
    if (dataQuery) {
      const dataJs = JSON.parse(dataQuery);
      console.log(dataJs);
      setUser(dataJs);
    }
  }, [dataQuery]);

  // submit form update
  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setPending(true);
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
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
      setTimeout(() => router.push("/akunku"), 1000);
    } catch (error: any) {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="container w-full lg:w-11/12 xl:w-8/12 px-5 py-12 mx-auto text-gray-100">
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
                onChange={handleChange}
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
                type="text"
                name="angkatan"
                required
                value={user.angkatan}
                onChange={handleChange}
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
                placeholder="2018"
              />
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2">
              <label className="pb-2 text-sm font-bold">Fakultas</label>
              <input
                type="text"
                name="fakultas"
                value={user.fakultas}
                onChange={handleChange}
                required
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
                placeholder="Teknik"
              />
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2">
              <label className="pb-2 text-sm font-bold">Jurusan</label>
              <input
                type="text"
                name="jurusan"
                value={user.jurusan}
                onChange={handleChange}
                required
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
              />
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2">
              <label className="pb-2 text-sm font-bold">Telepon/Wa</label>
              <input
                type="text"
                name="wa"
                value={user.wa}
                onChange={handleChange}
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
                placeholder="081234567890"
              />
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2">
              <label className="pb-2 text-sm font-bold">Gender</label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                defaultValue={user.gender}
                className="bg-d1 block border border-gray-500 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
              >
                <option className="bg-d1" value="">
                  Pilih
                </option>
                <option className="bg-d1" value="Laki-laki">
                  Laki-laki
                </option>
                <option value="Perempuan" className="bg-d1">
                  Perempuan
                </option>
              </select>
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2 ">
              <label className="pb-2 text-sm font-bold">Minat dan Bakat</label>
              <input
                name="tertarik"
                type="text"
                value={user.tertarik}
                onChange={handleChange}
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
              />
            </div>
            <div className="flex flex-col md:w-1/2 w-full p-2">
              <label className="pb-2 text-sm font-bold">Alamat</label>
              <input
                name="address"
                type="text"
                value={user.address}
                onChange={handleChange}
                className="block border border-gray-500 pl-3 py-2.5 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent"
              />
            </div>
            <div className="flex flex-col w-full p-2">
              <label className="pb-2 text-sm font-bold">Bio</label>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
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
};

export default Update;
