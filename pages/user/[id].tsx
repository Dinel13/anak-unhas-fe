import { GetServerSideProps } from "next";
import React, { FC } from "react";
import Image from "next/image"
import { useRouter } from "next/router";

interface IProps {
  user: {
    name: string;
    id: number;
    email: string;
    gender?: string;
    wa?: string;
    image?: string;
    jurusan?: string;
    fakultas?: string;
    address?: string;
    bio?: string;
    angkatan?: string;
    ig?: string;
    tertarik?: string;
  };
}

const Akunku: FC<IProps> = ({ user }) => {
  const router = useRouter();
  return (
    <section className="wrapper md:w-5/6 lg:md-4/6">
      <div className=" flex items-start">
        <a
          href={
            user.image
              ? process.env.NEXT_PUBLIC_SERVER_URL_IMAGE + "/user/" + user.image
              : ""
          }
          rel="noreferrer"
          target="_blank"
          className="rounded-full w-32 h-32 bg-cover bg-center relative"
        >
          <Image
            alt="foto profil"
            className="object-cover object-center flex-shrink-0 rounded-full mr-4"
            src={
              user.image
                ? process.env.NEXT_PUBLIC_SERVER_URL_IMAGE + "/user/" + user.image
                : "/u.jpg"
            }
            layout="fill"
          />
        </a>

        <div className="mt-2">
          <h3 className="text-xl leading-none mb-1.5 mt-1 font-semibold">
            {user.name}
          </h3>
          <button
              onClick={() =>
                router.push({
                  pathname: "/chat",
                  query: { user: JSON.stringify(user) },
                })
              }
              className="btn-pri py-1 px-5 text-sm"
            >
              Chat
            </button>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-8 max-w-6xl">
        <dl>
          <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm text-gray-300">Fakultas</dt>
            <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
              {user.fakultas}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm text-gray-300">Jurusan</dt>
            <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
              {user.jurusan}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm text-gray-300">Angkatan</dt>
            <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
              {user.angkatan}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm text-gray-300">Alamat email</dt>
            <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
              {user.email}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm text-gray-300">Phone</dt>
            <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
              {user.wa}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm text-gray-300">Bio</dt>
            <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
              {user.bio}
            </dd>
          </div>

          <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm text-gray-300">Alamat</dt>
            <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
              {user.address}
            </dd>
          </div>
          {/* <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
              <dt className="text-sm text-gray-300">
                Instagram
              </dt>
              <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
                {user.ig}
              </dd>
            </div> */}
          <div className="px-4 py-5 sm:grid xs:grid-cols-3 md:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm text-gray-300">Minat dan Bakat</dt>
            <dd className="mt-1 text-sm font-semibold sm:mt-0 xs:col-span-2 md:col-span-3">
              {user.tertarik}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;

  let user;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/detail/${id}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error("Tidak bisa mendapatkan data user");
    }
    console.log(result.data);

    user = result.data;
  } catch (error) {
    console.log(error);
  }

  return { props: { user } };
};

export default Akunku;
