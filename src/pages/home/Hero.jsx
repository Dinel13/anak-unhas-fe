import { Link } from "react-router-dom";

import Search from "../../components/Search";
import hero from "../../assets/hero.svg";

export default function Hero() {
  return (
    <section className="wrapper">
      <div className="mt-6 mb-24 lg:mt-10 lg:mb-32 xl:mt-16 xl:mb-44 flex md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={hero}
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left  items-center text-center">
          <h1 className="text-subtitle max-w-xs text-red-900">ANAK-UNHAS</h1>
          <h2 className="text-body mb-4 max-w-xl">
            Anak-unhas membantu anda menemukan teman untuk berbagi dan berkembang bersama
          </h2>
          <div className="flex flex-wrap justify-start gap-y-3 gap-x-5 items-center">
            <Search />
          </div>
        </div>
      </div>
    </section>
  );
}
