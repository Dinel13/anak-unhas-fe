import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/authSlice"
import { hideNotif, notifData } from "../../store/notifSlice";

export default function ErrorModal() {
   const [showModal, setShowModal] = useState(null);
   const [modal, setModal] = useState(null);
   const dispatch = useDispatch();
   let { message, action, status } = useSelector(notifData);

   if (action === "logout") {
      action = () => {
         dispatch(logout());
      }
   }

   const hideModal = useCallback(() => {
      setShowModal(null);
      dispatch(hideNotif());
   }, [dispatch]);

   React.useEffect(() => {
      setShowModal(message);
      setModal(document.getElementById("yakin"));

      // to alwys hidden modal if no click the yakin
      window.onclick = function (event) {
         if (event.target === modal) {
         } else {
            hideModal();
         }
      };
   }, [message, modal, hideModal]);

   React.useEffect(() => {
      let timer;
      if (showModal && message && status !== "Confirm") {
        timer = setTimeout(() => hideModal(), 4000);
      }
      return () => clearTimeout(timer);
    }, [message, status, hideModal, showModal]);

   return (
      message &&
      showModal && (
         <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
               <div className="relative w-auto my-6 mx-auto py-5 max-w-3xl">
                  <div
                     style={{ minWidth: "300px", maxWidth: "380px" }}
                     className="rounded-xl shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none"
                  >
                     <div className="flex items-start justify-between p-5 bg-yellow-300 rounded-t-xl">
                        <h3 className="text-2xl text-white font-semibold">{status}</h3>
                     </div>
                     <div className="relative p-5 flex-auto">
                        <p className="my-3 text-gray-800 text-lg leading-relaxed">
                           {message}
                        </p>
                     </div>
                     {/* jika notif adalah confirm atau selainnya */}
                     {status === "Confirm" ? (
                        <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                           <button
                              className="btn-pri font-medium uppercase text-sm px-6 py-2 mr-2"
                              type="button"
                              onClick={hideModal}
                           >
                              Batal
                           </button>
                           <button
                              id="yakin"
                              className="btn-sec font-medium uppercase text-sm px-6 py-2"
                              type="button"
                              onClick={action}
                           >
                              Yakin
                           </button>
                        </div>
                     ) : (
                        <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                           <button
                              className="btn-pri font-medium uppercase text-sm px-6 py-2"
                              type="button"
                              onClick={hideModal}
                           >
                              Tutup
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
            <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
         </>
      )
   );
}
