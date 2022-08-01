import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../../components/Navbar";

type Props = {
  initialState: any;
};

const PokemonDetails: NextPage<Props> = ({ initialState }) => {
  const [pokemon, setPokemon] = useState(initialState);
  const router = useRouter();
  const Index = ("000" + pokemon.id).slice(-3);
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${Index}.png`;
  return (
    <>
      <Navbar />
      <div className="appContainer">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-full sticky top-0 bg-neutral-50 dark:bg-neutral-900 z-50">
            <Link href="/pokemon">
              <div className="flex items-center gap-2 cursor-pointer">
                <ArrowCircleLeftIcon className="h-8 w-8 text-neutral-600 my-2" />{" "}
                <span className="font-semibold">Back</span>
              </div>
            </Link>
          </div>
          <div className="col-span-full md:col-span-6">
            <div className="border border-neutral-300 p-4 rounded-md dark:bg-neutral-800">
              <Image
                src={image}
                layout="responsive"
                width={500}
                height="500"
                alt=""
              />
            </div>
            <div className="text-xl font-bold pt-2 text-center">
              {pokemon.name}
            </div>
            <div className="text-center text-xl">#{Index}</div>
          </div>
          <div className="col-span-full md:col-span-6">
            <div className="p-4 border border-neutral-300 rounded-md my-2">
              <h3 className="text-lg font-bold">Abilities</h3>
              <hr className="border-b-0 my-2 border-neutral-300" />
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((item: any, i: any) => (
                  <div
                    key={i}
                    className="bg-green-500 text-white rounded-md px-2 py-1"
                  >
                    {item.ability?.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border border-neutral-300 rounded-md my-2">
              <h3 className="text-lg font-bold">Species</h3>
              <hr className="border-b-0 my-2 border-neutral-300" />
              <div className="flex flex-wrap gap-2">
                <div className="border border-neutral-300 px-2 py-1 rounded-md">
                  {pokemon.species?.name}
                </div>
              </div>
            </div>
            <div className="p-4 border border-neutral-300 rounded-md my-2">
              <h3 className="text-lg font-bold">Types</h3>
              <hr className="border-b-0 my-2 border-neutral-300" />
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((item: any, i: any) => (
                  <div
                    key={i}
                    className="bg-green-500 text-white rounded-md px-2 py-1"
                  >
                    {item.type?.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border border-neutral-300 rounded-md my-2">
              <h3 className="text-lg font-bold">Moves</h3>
              <hr className="border-b-0 my-2 border-neutral-300" />
              <div className="flex flex-wrap gap-2 items-center">
                {pokemon.moves.map((item: any, i: any) => (
                  <div
                    key={i}
                    className="bg-green-500 text-white rounded-md px-2 py-1"
                  >
                    {item.move?.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context.query;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params}`).then(
    (res) => res.json()
  );
  return {
    props: {
      initialState: res,
    },
  };
};
