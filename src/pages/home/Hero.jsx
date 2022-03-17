import { Link } from "react-router-dom";

import Search from "../../components/Search";
import hero from "../../assets/hero.svg";

export default function Hero() {
  return (
    <section className="wrapper">
      <div className="mt-14 mb-24 lg:mt-20 lg:mb-32 xl:mt-32 xl:mb-44 2xl:mt-44 2xl:mb-60  flex md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={hero}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left  items-center text-center">
          <h1 className="text-subtitle mb-4">
            Temukan pengajar terbaik
            <br className="hidden lg:inline-block" /> atau jadi guru terbaik
          </h1>
          <p className="mb-8 leading-relaxed">
            Karena semua dapat <span className="font-black">belajar</span>{" "}
            dimanapun, kapanpun dan dari siapapun. Begitupun semua dapat{" "}
            <span className="font-black">mengajar</span> dimanapun, kapanpun dan
            kepada siapapun.
          </p>
          <div className="flex flex-wrap justify-start gap-y-3 gap-x-5 items-center">
            <Search />
            <Link to="/kursus/baru" className="btn-pri py-3 px-4 text-lg">
              Berikan kursus
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
