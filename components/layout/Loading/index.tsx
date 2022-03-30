import style from "./loading.module.css";

function Loading(): JSX.Element {
  return (
    <div className="w-full z-50 flex flex-col items-center justify-center my-6">
      <div
        className={`${style.loader} ease-linear rounded-full border-8 border-t-8 border-gray-400 h-12 w-12 mb-4`}
      ></div>
      <h2 className="text-center text-gray-700 text-lg">Loading ...</h2>
    </div>
  );
}

export default Loading;
