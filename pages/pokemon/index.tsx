import axios from "axios";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Pokemon from "../../components/Pokemon";

type Props = {
  initialState: {
    next: string;
    previous: string;
    results: [];
  };
  currentPage: number;
};

const IndexPokemon: NextPage<Props> = ({ initialState, currentPage }) => {
  const router = useRouter();
  const pageIndex = Number(router.query.page)
  const [pokemon, setPokemon] = useState(initialState);
  const [page, setPage] = useState(Number(router.query.page) || 1);
  const [offset, setOffset] = useState((pageIndex-1) * 20 || 0);

  const fetchPokemon = async (url: string, next: boolean) => {
    const res = await fetch(url).then((res) => res.json());
    setPage(next ? page + 1 : page - 1);
    setOffset(next ? page * 20 : (page - 2) * 20);
    setPokemon(res);
  };
  return (
    <>
      <Navbar />
      <div className="appContainer">
        <div className="pt-4">
          <div className="grid grid-cols-12 gap-4">
            {pokemon.results.map((item: any, i: any) => (
              <Pokemon item={item} key={i} index={i + offset} />
            ))}
          </div>
          <div className="flex items-center justify-center pt-4 gap-4 pb-8">
            <Link href={`/pokemon?page=${page - 1}`}>
              <button
                onClick={() => {
                  fetchPokemon(pokemon.previous, false);
                }}
                className="bg-blue-500 text-white px-2 py-2 rounded-md cursor-pointer hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
                disabled={pokemon.previous === null}
              >
                Previous
              </button>
            </Link>
            <Link href={`/pokemon?page=${page + 1}`}>
              <button
                onClick={() => {
                  fetchPokemon(pokemon.next, true);
                }}
                className="bg-blue-500 text-white px-2 py-2 rounded-md cursor-pointer hover:bg-blue-600"
              >
                See More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const page = context.query.page || 1;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      page === 0 ? 0 : (page - 1) * 20
    }?limit=20`
  ).then((res) => res.json());
  return {
    props: {
      currentPage: page,
      initialState: res,
    }, // will be passed to the page component as props
  };
};
export default IndexPokemon;
