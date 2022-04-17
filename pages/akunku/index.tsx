import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { logout, selectId } from "../../store/authSlice";
import { showAlert } from "../../store/alertSlice";
import { User } from "../user/[id].jsx";
import UpdatePhoto from "../../components/user/UpdatePhoto";
import { useRouter } from "next/router";

export default function MyAccount() {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = useSelector(selectId);
  const [user, setUser] = useState<User | null>(null);
  const [isEditPhoto, setIsEditPhoto] = useState(false);
  const [mounted, setMounted] = useState(false);

  // get user info
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/myaccount/${id}`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        if (!response.ok) {
          throw new Error("Tidak bisa mendapatkan data user");
        }
        setUser(result.data);
      } catch (error: any) {
        dispatch(
          showAlert({
            status: "Error",
            message: error.message,
            action: null,
          })
        );
      }
    };
    if (id) {
      getUser();
    } else {
      setMounted(true);
    }
  }, [dispatch, id]);

  if (mounted && !id) {
    router.push("/");
  }

  const editPhoto = () => setIsEditPhoto((prev) => !prev);

  return (
    <section className="wrapper md:w-5/6 lg:md-4/6">
      {user && (
        <>
          {isEditPhoto && (
            <UpdatePhoto
              cancel={editPhoto}
               setNewImage={(newImage : string) =>
                user && setUser({ ...user, image: newImage })
              }
            />
          )}
          <div className="flex items-start">
            <div>
              <a
                href={
                  user.image
                    ? process.env.NEXT_PUBLIC_SERVER_URL_IMAGE +
                      "/user/" +
                      user.image
                    : ""
                }
                rel="noreferrer"
                target="_blank"
                className="w-32 h-32 bg-cover bg-center relative block mr-3"
              >
                <Image
                  alt="foto profil"
                  className="object-cover object-center rounded-full"
                  src={
                    user.image
                      ? process.env.NEXT_PUBLIC_SERVER_URL_IMAGE +
                        "/user/" +
                        user.image
                      : "/u.jpg"
                  }
                  layout="fill"
                />
              </a>
              <button
                className="text-indigo-500 text-sm mt-2 ml-4"
                onClick={editPhoto}
              >
                Ubah gambar
              </button>
            </div>

            <div className="mt-2">
              <h3 className="text-xl leading-none mb-1.5 mt-1 font-semibold">
                {user.name}
              </h3>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => dispatch(logout())}
                  className="btn-sec py-1.5 px-5 text-sm mt-2"
                >
                  Logout
                </button>
                <button
                  onClick={() =>
                    router.push({
                      pathname: "/akunku/update",
                      query: { user: JSON.stringify(user) },
                    })
                  }
                  className="btn-pri py-1.5 px-5 text-sm mt-2"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-5 max-w-6xl">
            <dl>
              <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-300">Fakultas</dt>
                <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                  {user.fakultas}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-300">Jurusan</dt>
                <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                  {user.jurusan}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-300">Angkatan</dt>
                <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                  {user.angkatan}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-300">Alamat email</dt>
                <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                  {user.email}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-300">Phone</dt>
                <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                  {user.wa}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-300">Bio</dt>
                <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                  {user.bio}
                </dd>
              </div>

              <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-300">Alamat</dt>
                <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                  {user.address}
                </dd>
              </div>
              {/* <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                  <dt className="text-sm text-gray-300">Instagram</dt>
                  <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                    {user.ig}
                  </dd>
                </div> */}
              <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm text-gray-300">Minat dan Bakat</dt>
                <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                  {user.tertarik}
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </section>
  );
}
