import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="py-24 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-4xl md:text-5xl lg:text-6xl font-dark font-bold">404</div>
          <p className="text-2xl md:text-3xl py-2 font-light leading-normal">
            Halaman ini tidak ditemukan.
          </p>
          <p className="mb-6">
            Tapi jangan khawatir, kamu dapat menemukan banyak hal lainya dari
            halaman beranda kami{" "}
          </p>
          <Link to="/" className="px-4 py-2 font-medium btn-pri">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
