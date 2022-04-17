import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { showAlert } from "../../store/alertSlice";
import { getToken, selectId } from "../../store/authSlice";
import LoadingButton from "../common/LoadingButton";

interface IProps {
    cancel: () => void;
    setNewImage: (newImage: string) => void;
}

const UpdatePhoto :FC<IProps> = ({
  cancel, setNewImage
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const token = useSelector(getToken);
  const userId = useSelector(selectId);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    } else {
      dispatch(
        showAlert({
          status: "Error",
          message: "Tidak ada gambar yang diupload",
        })
      );
      return;
    }
    formData.append("userId", userId);
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/image`,
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
      dispatch(
        showAlert({
          status: "Success",
          message: "Data berhasil diupdate",
          action: null,
        })
      );
      setNewImage(data.data);
      cancel();
    } catch (error: any) {
      dispatch(
        showAlert({
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
                    type="file"
                    accept="image/*"
                    alt="your image"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (!e.target.files) {
                        return;
                      }
                      setImage(e.target.files[0]);
                    }}
                  />
                </label>
                <small className="block text-gray-400">
                  Ukuran maksimal: 2mb
                </small>
                <div className="flex mt-6 text-center pb-3">
                  {pending ? (
                    <LoadingButton />
                  ) : (
                    <>
                      <button
                        onClick={cancel}
                        className="w-full btn-sec mr-3 py-2"
                      >
                        batal
                      </button>
                      <button className="w-full btn-ter py-2" type="submit">
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


export default UpdatePhoto;