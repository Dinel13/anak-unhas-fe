import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { FC } from "react";

export interface User {
  id: number;
  name: string;
  image?: string;
  jurusan?: string;
  angkatan?: string;
}

export interface IProps {
  data: User;
}

const CardUser: FC<IProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
      <div className="bg-d5 m-3 rounded-lg transition-all duration-300 overflow-hidden shadow-red-900 shadow hover:shadow-xl hover:shadow-red-700">
        <div className="w-full h-32 relative">
          <Image
            src={
              data.image
                ? process.env.NEXT_PUBLIC_SERVER_URL_IMAGE +
                  "/user/" +
                  data.image
                : "/u.jpg"
            }
            alt="user"
            layout="fill"
          />
        </div>
        <div className="p-3">
          <p className="text-lg title-card font-semibold">{data.name}</p>
          <p className="text-gray-200">
            <span className="mr-1 text-sm text-gray-300">
              ({data.angkatan ? data.angkatan : "-"})
            </span>
            {data.jurusan ? data.jurusan : "-"}
          </p>
          <div className="flex justify-end mt-3">
            <Link href={"/user/" + data.id}>
              <a className="btn-sec rounded-full py-1 px-4 mr-2 text-sm">
                Detail
              </a>
            </Link>
            <button
              onClick={() =>
                router.push({
                  pathname: "/chat",
                  query: { user: JSON.stringify(data) },
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
};

export default CardUser;
