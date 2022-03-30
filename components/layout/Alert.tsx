import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { alertData, hideAlert } from "../../store/alertSlice";

function Alert(): JSX.Element | null {
  const dispatch = useDispatch();
  let { message, status } = useSelector(alertData);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (message) {
      timer = setTimeout(() => dispatch(hideAlert()), 4000);
    }
    return () => clearTimeout(timer);
  }, [message, dispatch]);

  return !message ? null : (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="w-full bg-d3 max-w-sm bg-blue rounded-xl">
          <div className="flex items-start justify-between p-4 bg-red-900 rounded-t-xl">
            <h3 className="text-2xl text-white font-semibold">{status}</h3>
          </div>
          <div className="relative p-5 flex-auto">
            <p className="my-3 text-gray-300 text-lg leading-relaxed">
              {message}
            </p>
          </div>
          <div className="flex items-center justify-end p-4 border-t border-gray-300 rounded-b">
            <button
              className="btn-pri text-sm px-6 py-1.5"
              type="button"
              onClick={() => dispatch(hideAlert())}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default Alert;
