import React from "react";

interface IProps {
  cPage: number; //current page
  tPages: number; //total pages
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<IProps> = ({ setPage, cPage, tPages }) => {
  return (
    <div className="flex item-center justify-center my-12">
      <button
        onClick={() => setPage(cPage - 1)}
        disabled={cPage === 1}
        className={`${
          cPage === 1 ? "" : "hover:bg-blue-400"
        } flex items-center text-lg tracking-tighter focus:outline-none border rounded-full link-scale`}
      >
        <div className="h-10 w-10 mr-1 flex justify-center items-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left w-6 h-6"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </button>
      {cPage - 1 > 1 && (
        <button
          onClick={() => setPage(1)}
          className="flex mx-2 items-center justify-center h-10 w-10 rounded-full"
        >
          <span>{1}</span>
        </button>
      )}
      {cPage - 2 > 1 && (
        <button
          onClick={() => setPage(cPage - 2)}
          className="flex mx-2 items-center justify-center h-10 w-10 rounded-full"
        >
          <span>...</span>
        </button>
      )}
      {cPage > 1 && (
        <button
          onClick={() => setPage(cPage - 1)}
          className="flex mx-2 items-center justify-center h-10 w-10"
        >
          <span>{cPage - 1}</span>
        </button>
      )}
      <div className="flex mx-2 items-center justify-center h-10 w-10 bg-blue-400 rounded-full">
        <span>{cPage}</span>
      </div>
      {cPage < tPages && (
        <button
          onClick={() => setPage(cPage + 1)}
          className="flex mx-2 items-center justify-center h-10 w-10 rounded-full"
        >
          <span>{cPage + 1}</span>
        </button>
      )}
      {cPage + 2 < tPages && (
        <button
          onClick={() => setPage(cPage + 2)}
          className="flex mx-2 items-center justify-center h-10 w-10 rounded-full"
        >
          <span>...</span>
        </button>
      )}
      {cPage + 1 < tPages && (
        <button
          onClick={() => setPage(tPages)}
          className="flex mx-2 items-center justify-center h-10 w-10 rounded-full"
        >
          <span>{tPages}</span>
        </button>
      )}
      <button
        onClick={() => setPage(cPage + 1)}
        disabled={cPage === tPages}
        className={`${
          cPage === tPages ? "" : "hover:bg-blue-400"
        } flex items-center text-lg tracking-tighter focus:outline-none border rounded-full link-scale`}
      >
        <div className="h-10 w-10 ml-1 flex justify-center items-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right w-6 h-6"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default Pagination;
