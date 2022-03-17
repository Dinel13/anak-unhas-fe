import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { showNotif } from "../store/notifSlice";

const Search = () => {
   const navigate = useNavigate();
   const searchRef = useRef();
   const dispatch = useDispatch();

   const searchSubmit = async (e) => {
      // console.log("dsadsa");
      e.preventDefault();
      const search = searchRef.current.value;
      console.log(search);
      try {
         const result = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/service/search?q=${search}`,
            // `http://localhost:8080//service/search?q=${search}`,
            {
               method: "GET",
            }
         );
         const data = await result.json();
         if (!result.ok) {
            throw new Error(data.message || "gagal mendapat layanan");
         }
         console.log(data);
         searchRef.current.value = "";
         navigate("/pencarian", {
            state: { data: data.services, search },
         });
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

   return (
      <form onSubmit={searchSubmit} className="flex py-1.5 px-2 max-w-xs dark-sidebar rounded-full">
            <input
               type="search"
               className="py-1 w-56 px-2.5 outline-none rounded-md dark-sidebar"
               placeholder="Cari siapa?"
               required
               ref={searchRef}
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
   )
}

export default Search