import style from "./loading.module.css";

function Loading() : JSX.Element {
  return (
    <div className="fixed inset-0 z-50 bg-gray-700 opacity-50 flex flex-col items-center justify-center">
      <div
        className={`${style.loader} ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4`}
      ></div>
      <h2 className="text-center text-white text-2xl">
        Loading...
      </h2>
    </div>
  )
}


export default Loading;