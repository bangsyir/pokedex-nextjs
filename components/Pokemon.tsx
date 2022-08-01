import Image from "next/image";
import Link from "next/link";

const Pokemon = ({
  item,
  index
}: {
  item: { id: number; name: string; url: string };
  index: number
}) => {
  const paddedIndex = ("000" + (index + 1)).slice(-3);
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
  return (
    <Link href={`/pokemon/${item.name}`}>
      <div className="border border-neutral-200 p-2 col-span-6 md:col-span-3 lg:col-span-2 cursor-pointer hover:shadow rounded-md">
        <Image src={image} height={500} width={500} alt="" />
        <span className="px-2">{item.name}</span>
        <span className="font-semibold">#{paddedIndex}</span>
      </div>
    </Link>
  );
};

export default Pokemon;
