import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Pokemon from "../components/Pokemon";
import Link from "next/link";

type Props = {
  initialState: {
    next: string;
    previous: string;
    results: [];
  };
};

const Home: NextPage<Props> = ({ initialState } ) => {
  const [pokemon, setPokemon] = useState(initialState);
  const [search, setSearch] = useState("");
  return (
    <div>
      <Navbar />
      <div className="appContainer">
        <div className="border rounded-md p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center justify-center">
            <div className="w-1/3 relative">
              <div className="flex border border-neutral-300 px-3 py-2 rounded-md dark:bg-neutral-700">
                <input
                  type="text"
                  className="focus:outline-none dark:bg-neutral-700 w-full"
                  placeholder="Search a pokemon"
                />
                <button>
                  <SearchIcon className="w-6 h-6 text-neutral-500 dark:text-neutral-300" />
                </button>
              </div>
              {search && (
                <div className="border border-neutral-300 p-4 mt-2 rounded-md dark:bg-neutral-700 fixed bg-white">
                  searching for &quot;{search}&quot;
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="grid grid-cols-12 gap-4">
            {pokemon.results.map((item, i) => (
              <Pokemon item={item} key={i} index={i} />
            ))}
          </div>
          <div className="text-center pt-4">
            <Link href="/pokemon">
              <span className="bg-blue-500 text-white px-2 py-2 rounded-md cursor-pointer hover:bg-blue-600">
                See More
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12").then(
    (res) => res.json()
  );
  return {
    props: {
      initialState: res
    }, // will be passed to the page component as props
  };
}
export default Home;
