import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import CardUser from "../components/User/Card";
import { showNotif } from "../store/notifSlice";
import Footer from "../components/layout/Footer";

const Fakultas = [
  {
    id: 1,
    nama: "Teknik",
    jurusan: [
      "Teknik Sipil",
      "Teknik Lingkungan",
      "Teknik Perkapalan",
      "Teknik Sistem Perkapalan",
      "Teknik Kelautan",
      "Teknik Mesin",
      "Teknik Industri",
      "Teknik Elektro",
      "Teknik Informatika",
      "Teknik Geologi",
      "Teknik Pertambangan",
      "Arsitektur",
      "Perencanaan Wilayah dan Kota",
    ],
  },
  {
    id: 2,
    nama: "Ilmu Sosial dan Ilmu Politik",
    jurusan: [
      "Sosiologi",
      "Antropologi",
      "Hubungan Internasional",
      "Ilmu Komunikasi",
      "Ilmu Pemerintahan",
      "Ilmu Politik",
      "Ilmu Administrasi",
    ],
  },
  {
    id: 3,
    nama: "Hukum",
    jurusan: ["Ilmu Hukum", "Ilmu Hukum Administrasi Negara"],
  },
  {
    id: 4,
    nama: "Ekonomi dan Bisnis",
    jurusan: ["Manajemen", "Akuntansi", "Ilmu Ekonomi"],
  },
  {
    id: 5,
    nama: "Ilmu Budaya",
    jurusan: [
      "Sastra Indonesia",
      "Sastra Inggris",
      "Sastra Asia Barat",
      "Sastra Barat Roman",
      "Ilmu Sejarah",
      "Sastra Daerah",
      "Arkeologi",
      "Sastra Jepang",
      "Bahasa dan Kebudayaan Tiongkok",
    ],
  },
  {
    id: 6,
    nama: "Kedokteran",
    jurusan: ["Pendidikan Dokter", "Pendidikan Dokter Hewan", "Psikologi"],
  },
  {
    id: 7,
    nama: "Kedokteran Gigi",
    jurusan: ["Pendidikan Kedokteran Gigi"],
  },
  {
    id: 8,
    nama: "Kehutanan",
    jurusan: ["Kehutanan", "Rekayasa Kehutanan"],
  },
  {
    id: 9,
    nama: "Peternakan",
    jurusan: ["Peternakan"],
  },
  {
    id: 10,
    nama: "Pertanian",
    jurusan: [
      "Keteknikan Pertanian",
      "Agribisnis",
      "Agrokologi",
      "Ilmu dan Teknologi Pangan",
    ],
  },
  {
    id: 11,
    nama: "Kesehatan Masyarakat",
    jurusan: ["Kesehatan Masyarakat", "Ilmu Gizi"],
  },
  {
    id: 12,
    nama: "Farmasi",
    jurusan: ["Farmasi"],
  },
  {
    id: 13,
    nama: "Ilmu Kelautan dan Perikanan",
    jurusan: [
      "Agribisnis Perikanan",
      "Ilmu Kelautan",
      "Budidaya Perairan",
      "Manajemen Sumber Daya Perairan",
      "Pemanfaatan Sumber Daya Perikanan",
    ],
  },
  {
    id: 14,
    nama: "Matemaatika dan Ilmu Pengetahuan Alam",
    jurusan: [
      "Ilmu Komputer",
      "Biologi",
      "Fisika",
      "Kimia",
      "Geofisika",
      "Matematika",
      "Statistika",
      "Ilmu Aktuaria",
    ],
  },
  {
    id: 15,
    nama: "Keperawatan",
    jurusan: ["Ilmu Keperawatan", "Fisioterapi"],
  },
  //   {
  //     id: 16,
  //     nama: "Sekolah Pascasarjana",
  //     jurusan: [
  //       "Agroteknologi",
  //       "Ilmu dan Teknologi Pangan",
  //       "Ilmu Administrasi",
  //       "Antropologi",
  //       "Ilmu Komunikasi",
  //       "Ilmu Politik",
  //       "Teknik Pertanian",
  //       "Sosiologi",
  //       "Ilmu Pemerintahan",
  //       "Sastra Indonesia",
  //       "Sastra & Bahasa Asing",
  //       "Arkeologi",
  //       "Sejarah",
  //       "Akuntansi",
  //       "Manajemen",
  //       "Ilmu Ekonomi",
  //       "Ekonomi Pembangunan",
  //       "Ilmu Hukum",
  //       "Farmasi",
  //       "Pendidikan Dokter Gigi",
  //       "Kimia",
  //       "Matematika",
  //       "Geofisika",
  //       "Biologi",
  //       "Fisika",
  //       "Kehutanan",
  //       "Peternakan",
  //       "Perikanan",
  //       "Arsitektur",
  //       "Teknik Elektro",
  //       "Teknik Geologi",
  //       "Teknik Mesin",
  //       "Teknik Lingkungan",
  //       "Teknik Sipil",
  //       "Perencanaan Wilayah dan Kota",
  //       "Teknik Industri",
  //       "Teknik Pertambangan",
  //       "Teknik Informatika",
  //       "Kesehatan Masyarakat",
  //       "Ilmu Keperawatan",
  //       "Agribisnis",
  //       "Pendidikan Dokter",
  //       "Kebidanan",
  //       "Statistika",
  //       "Teknik Perkapalan",
  //     ],
  //   },
];

const Filter = ({ setData }) => {
  const namaRef = useRef();
  const angkatanRef = useRef();
  const fakultasRef = useRef();
  const [jurusanList, setJurusanList] = useState([]);
  const jurusanRef = useRef();
  const dispatch = useDispatch();

  const searchSubmit = async (e) => {
    e.preventDefault();
    if (
      !namaRef.current.value &&
      !angkatanRef.current.value &&
      !fakultasRef.current.value &&
      !jurusanRef.current.value
    ) {
      return dispatch(
        showNotif({
          status: "Error",
          message: "Minimal harus ada satu kolom yang diisi",
          action: null,
        })
      );
    }
    try {
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/filter`,
        {
          method: "GET",
          headers: {},
          body: JSON.stringify({
            nama: namaRef.current.value,
            angkatan: angkatanRef.current.value,
            pendidikan: jurusanRef.current.value,
            univ: fakultasRef.current.value,
          }),
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.message || "gagal mendapat layanan");
      }
      if (data && data.length > 0) {
        namaRef.current.value = "";
        angkatanRef.current.value = "";
        jurusanRef.current.value = "";
        fakultasRef.current.value = "";
        setData(data.data);
      }
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
    <div className="p-2 sm:p-4 md:px-6 w-full max-w-5xl mx-auto bg-gradient-to-r from-red-900 to-pink-900 rounded-lg">
      <h1 className="text-subtitle-2 text-center mb-1 text-gray-50">
        Cari Teman
      </h1>
      <form className="w-full py-1.5 px-2" onSubmit={searchSubmit}>
        <div className="flex flex-wrap w-full text-gray-200">
          <div className="w-full vs:w-1/2 flex flex-col vs:pr-3 sm:pr-6">
            <label
              htmlFor="nama"
              className="block mb-1 sm:text-lg font-semibold"
            >
              Nama
            </label>
            <input
              name="nama"
              type="text"
              className="p-2.5 flex-1 bg-gray-300 outline-none rounded-md shadow-lg focus:ring focus:ring-d4 text-gray-700"
              placeholder="Andi Burhanuddin"
              ref={namaRef}
            />
          </div>
          <div className="w-full vs:w-1/2 flex flex-col mt-2 vs:mt-0">
            <label
              htmlFor="angkatan"
              className="block mb-1 sm:text-lg font-semibold"
            >
              Angkatan
            </label>
            <input
              name="angkatan"
              type="number"
              className="p-2.5 flex-1 bg-gray-300 outline-none rounded-md shadow-lg focus:ring focus:ring-d4 text-gray-700"
              placeholder="2018"
              ref={angkatanRef}
            />
          </div>
        </div>
        <div className="flex flex-wrap w-full mt-2">
          <div className="w-full vs:w-1/2 flex flex-col vs:pr-3 sm:pr-6">
            <label
              htmlFor="pendidikan"
              className="block mb-1 sm:text-lg font-semibold"
            >
              Fakultas
            </label>
            <input
              list="fakultases"
              ref={fakultasRef}
              required
              className="p-2.5 flex-1 bg-gray-300 outline-none rounded-md shadow-lg focus:ring focus:ring-d4 text-gray-700"
              //   className="block input-field my-0 px-2 py-2.5"
              placeholder="Teknik"
              onChange={(e) => {
                Fakultas.forEach((item) => {
                  if (item.nama === e.target.value) {
                    setJurusanList(item.jurusan);
                  }
                });
              }}
            />
            <datalist id="fakultases">
              {Fakultas.map((item) => (
                <option key={item.id} value={item.nama} />
              ))}
            </datalist>
          </div>
          <div className="w-full vs:w-1/2 flex flex-col mt-2 vs:mt-0">
            <label
              htmlFor="universitas"
              className="block mb-1 sm:text-lg font-semibold"
            >
              Jurusan
            </label>
            <input
              list="jurusans"
              ref={jurusanRef}
              required
              className="p-2.5 flex-1 bg-gray-300 outline-none rounded-md shadow-lg focus:ring focus:ring-d4 text-gray-700"
              //   className="block input-field my-0 px-2 py-2.5"
              placeholder="Teknik Informatika"
            />
            <datalist id="jurusans">
              {jurusanList?.map((item, index) => (
                <option key={index} value={item} />
              ))}
            </datalist>
          </div>
        </div>

        <button
          className="flex items-center btn-ter py-2 px-8 shadow-lg ml-auto mt-5"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <p>Cari</p>
        </button>
      </form>
    </div>
  );
};

function Pencarian() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.data) {
      console.log(state.data);
      setData(state.data.users);
      setTotal(state.data.total);
    }
  }, [state]);

  console.log(total, data);
  return (
    <>
      <section className="container my-0 mx-auto px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8 py-4 md:py-6 lg:py-8 xl:py-10 2xl:py-12">
        <Filter setData={setData} />
        <div className="flex flex-wrap mt-4">
          {data &&
            data.length > 0 &&
            data.map((item) => <CardUser key={item.id} data={item} />)}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Pencarian;
