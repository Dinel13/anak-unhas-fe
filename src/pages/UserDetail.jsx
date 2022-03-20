import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Footer from "../components/layout/Footer";
import { showNotif } from "../store/notifSlice";
import avatar from "../assets/avatar.svg";

export default function UserDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const getUser = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/user/detail/${id}`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        if (!response.ok) {
          throw new Error("Tidak bisa mendapatkan data user");
        }
        setUser(result.user);
      } catch (error) {
        dispatch(
          showNotif({
            status: "Error",
            message: error.message,
            action: null,
          })
        );
      }
    },
    [dispatch]
  );

  // get user info
  useEffect(() => {
    id && getUser(id);
  }, [getUser, id]);

  return (
    <>
      <section className="wrapper md:w-5/6 lg:md-4/6">
        {user && (
          <>
            <div className=" flex items-start">
              <a
                href={
                  user.image
                    ? process.env.REACT_APP_SERVER_URL_IMAGE +
                      "/user/" +
                      user.image
                    : ""
                }
                rel="noreferrer"
                target="_blank"
              >
                <img
                  alt="test"
                  className="object-cover object-center flex-shrink-0 rounded-full mr-4"
                  style={{ height: "100px", width: "100px" }}
                  src={
                    user.image
                      ? process.env.REACT_APP_SERVER_URL_IMAGE +
                        "/user/" +
                        user.image
                      : avatar
                  }
                />
              </a>

              <div className="mt-2">
                <h3 className="text-xl leading-none mb-1.5 mt-1 font-semibold">
                  {user.name}
                </h3>
                <button
                  onClick={() =>
                    navigate("/chat", {
                      state: { userId: user.id },
                    })
                  }
                  className="btn-pri py-1.5 px-8 text-sm mt-2"
                >
                  Chat
                </button>
              </div>
            </div>
            <div className="border-t border-gray-300 mt-8 max-w-6xl">
              <dl>
                <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                  <dt className="text-sm text-gray-300">
                    Fakultas
                  </dt>
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
                  <dt className="text-sm text-gray-300">
                    Angkatan
                  </dt>
                  <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                    {user.angkatan}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                  <dt className="text-sm text-gray-300">
                    Alamat email
                  </dt>
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
                <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                  <dt className="text-sm text-gray-300">
                    Instagram
                  </dt>
                  <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                    {user.ig}
                  </dd>
                </div>
                <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                  <dt className="text-sm text-gray-300">
                    Minat dan Bakat
                  </dt>
                  <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                    {user.tertarik}
                  </dd>
                </div>
              </dl>
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
}
