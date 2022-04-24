import { FC, useRef, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import { showAlert } from "../../store/alertSlice";

const Search: FC = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const searchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length < 3) {
      dispatch(
        showAlert({
          status: "Error",
          message: "Minimal 3 karakter kata kunci",
        })
      );
      return;
    }
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/search?search=${search}&page=1`,
        {
          method: "GET",
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.message || "gagal mencari data");
      }
      router.push({
        pathname: "/pencarian",
        query: { data: JSON.stringify(data) },
      });
    } catch (error: any) {
      dispatch(
        showAlert({
          status: "Error",
          message: error.message,
        })
      );
    }
  };

  return (
    <form
      onSubmit={searchSubmit}
      className="flex py-1.5 px-2 max-w-xs dark-sidebar rounded-full"
    >
      <input
        type="search"
        className="py-1 w-56 px-2.5 outline-none rounded-md dark-sidebar"
        placeholder="Cari siapa?"
        required
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="btn-pri ml-1 p-2 rounded-full" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default Search;
