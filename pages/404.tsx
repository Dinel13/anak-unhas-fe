import Link from "next/link";

export default function Custom404() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-5 text-gray-700">
        <div className="text-5xl lg:text-6xl font-bold">
          404
        </div>
        <p className="text-3xl py-2 font-light leading-normal">
          Halaman tidak ditemukan.
        </p>
          <Link href="/">
            <a className="px-4 py-2 btn-pri">Kembali ke beranda</a>
          </Link>
      </div>
    </div>
  );
};

