import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import { lastPage } from "../libs/redirectTo";

const Pokemon = ({
  item,
  index,
}: {
  item: { id: number; name: string; url: string };
  index: number;
}) => {
  const paddedIndex = ("000" + (index + 1)).slice(-3);
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
  const router = useRouter();

  const pokemonViewHandler = (e: React.MouseEvent) => {
    e.preventDefault;
    lastPage(router.query.page);
    return router.push(`/pokemon/${item.name}`);
  };
  return (
    <div className="border border-neutral-200 p-2 col-span-6 md:col-span-3 lg:col-span-2 cursor-pointer hover:shadow rounded-md" onClick={pokemonViewHandler}>
      <Image src={image} height={500} width={500} alt="" />
      <span className="px-2">{item.name}</span>
      <span className="font-semibold">#{paddedIndex}</span>
    </div>
  );
};

export default Pokemon;
