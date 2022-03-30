import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Search from "../components/common/Search";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Anak Unhas</title>
        <meta name="description" content="website anak unhas sejati" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="wrapper flex md:flex-row flex-col items-center" style={{ minHeight: "92vh" }}>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 relative h-80">
        <Image
          src="/hero.svg"
          alt="hero"
          layout="fill"
          className="object-cover object-center rounded"
        />
      </div>
      <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left  items-center text-center">
        <h1 className="text-subtitle max-w-xs text-red-900">ANAK-UNHAS</h1>
        <h2 className="text-body mb-4 max-w-xl">
          Anak-unhas membantu anda menemukan teman untuk berbagi dan berkembang
          bersama
        </h2>
        <div className="flex flex-wrap justify-start gap-y-3 gap-x-5 items-center">
          <Search />
        </div>
      </div>
    </section>
    </div>
  );
};

export default Home;
 