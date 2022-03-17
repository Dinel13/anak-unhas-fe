import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout, selectUserId } from "../../store/authSlice";
import { showNotif } from "../../store/notifSlice";
import UpdatePhoto from "./UpdatePhoto.jsx";

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
          `${process.env.REACT_APP_SERVER_URL}/user/${id}`,
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
    getUser();
  }, [dispatch, id]);

  const editPhoto = () => setIsEditPhoto((prev) => !prev);

  return (
    <>
      {isEditPhoto && <UpdatePhoto cancel={editPhoto} />}
      <section className="wrapper md:w-5/6 lg:md-4/6">
        <h2 className="text-title text-center">My Account</h2>
        {user && (
          <>
            <div className="px-4 py-5 flex items-end sm:px-6">
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
                  style={{ height: "120px", width: "120px" }}
                  src={
                    user.image
                      ? process.env.REACT_APP_SERVER_URL_IMAGE +
                        "/user/" +
                        user.image
                      : "https://tuk-cdn.s3.amazonaws.com/assets/components/horizontal_navigation/hn_2.png"
                  }
                />
              </a>

              <div className="sm:mb-1.5">
                <h3 className="text-xl leading-none mb-1.5 mt-1 font-medium text-gray-900">
                  {user.full_name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{user.user_name}</p>
                <button className="text-indigo-500 text-sm" onClick={editPhoto}>
                  Edit Profile Image
                </button>
              </div>
              <div className="ml-auto flex flex-col sm:flex-row items-center ">
                <button
                  onClick={() =>
                    navigate("/akunku/update", {
                      state: {
                        userData: user,
                      },
                    })
                  }
                  className="btn-sec py-2 px-4 m-2 tracking-wide leading-6" >
                  Update
                </button>
                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                  className="btn-las py-2 px-4 m-2 tracking-wide leading-6"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Alamat email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.email}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.phone}
                  </dd>
                </div>
                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Bio</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.bio}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Modsos lain
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.medsos}
                  </dd>
                </div>
                <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.address}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Tulisan</dt>
                  {/* <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.blog.length !== 0 ? (
                    <ul className="border ml-0  border-gray-200 rounded-md divide-y divide-gray-200">
                      {user.blog.map((item) => (
                        <li
                          key={item._id}
                          className="px-2 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-1 flex-1 w-0 truncate">
                              {item.title}
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <Link
                              to={`/bacaan/${item.slug}`}
                              className="font-medium mr-2.5 text-indigo-600 hover:text-indigo-500"
                            >
                              Lihat
                            </Link>
                            <Link
                              to={`/update-tulisan/${item.slug}`}
                              className="font-medium mr-2.5 text-indigo-500 hover:text-indigo-500"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() =>
                                dispatch(
                                  showNotif({
                                    status: "confirm",
                                    title: "Konfirmasi",
                                    message:
                                      "Kamu yakin ingin menghapus tulisan ini?",
                                    action: async () =>
                                      await removeTulisan(item.slug, item._id),
                                  })
                                )
                              }
                              className="font-medium text-red-600 hover:text-indigo-500"
                            >
                              Hapus
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "Belum ada tulisan"
                  )}
                </dd> */}
                </div>
              </dl>
            </div>
          </>
        )}
      </section>
    </>
  );
}
