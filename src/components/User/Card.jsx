import { Link, useNavigate } from "react-router-dom";
import user from "../../assets/user.svg";

export default function Card({ data }) {
  const navigate = useNavigate();
  return (
    <div className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
      <div className="bg-d5 m-3 rounded-lg transition-all duration-300 overflow-hidden shadow-red-900 shadow hover:shadow-xl hover:shadow-red-700">
        <img
          src={
            data.image
              ? process.env.REACT_APP_SERVER_URL_IMAGE + "/user/" + data.image
              : user
          }
          alt="user"
          className="w-full h-32"
        />
        <div className="p-3">
          <p className="text-lg title-card font-semibold">{data.name}</p>
          <p className="text-gray-200">
            <span className="mr-1 text-sm text-gray-300">
              ({data.angkatan ? data.angkatan : "-"})
            </span>
            {data.jurusan ? data.jurusan : "-"}
          </p>
          <div className="flex justify-end mt-3">
            <Link
              to={"/user/" + data.id}
              className="btn-sec rounded-full py-1 px-4 mr-2 text-sm"
            >
              Detail
            </Link>
            <button
              onClick={() =>
                navigate("/chat", {
                  state: { data: data.id },
                })
              }
              className="btn-pri py-1 px-5 text-sm"
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
