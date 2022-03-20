import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { showNotif } from "../../store/notifSlice";
import UpdatePhoto from "./UpdatePhoto.jsx";
import Footer from "../../components/layout/Footer";
import avatar from "../../assets/avatar.svg";
import { logout, selectUserId } from "../../store/authSlice";

export default function MyAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector(selectUserId);
  const [user, setUser] = useState(null);
  const [isEditPhoto, setIsEditPhoto] = useState(false);

  // get user info
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/user/myaccount/${id}`,
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
    };
    id && getUser();
  }, [dispatch, id]);

  const editPhoto = () => setIsEditPhoto((prev) => !prev);

  return (
    <>
      {isEditPhoto && (
        <UpdatePhoto
          cancel={editPhoto}
          setImage={(image) => setUser((prev) => ({ ...prev, image: image }))}
        />
      )}
      <section className="wrapper md:w-5/6 lg:md-4/6">
        {user && (
          <>
            <div className="flex items-start">
              <div>
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
                    className="bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
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
                <button
                  className="text-indigo-500 text-sm mt-2 ml-2"
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
                      navigate("/akunku/update", {
                        state: {
                          userData: user,
                        },
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
                <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
                  <dt className="text-sm text-gray-300">Instagram</dt>
                  <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                    {user.ig}
                  </dd>
                </div>
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
      <Footer />
    </>
  );
}
