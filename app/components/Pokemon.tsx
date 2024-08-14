import React from "react";
import Image from "next/image";
interface PokemonProps {
  name: string;
  image: string;
  innerRef?: (node?: Element | null | undefined) => void;
}
const Pokemon: React.FC<PokemonProps> = ({ name, image, innerRef }) => {
  return (
    <>
      <div className="flex m-4 justify-center items-center" ref={innerRef}>
        <div className="flex flex-row cursor-pointer shadow-lg bg-red-100 rounded-e-xl rounded-s-xl border-r-8 border-red-500 gap-4 items-center p-2 w-[400px]">
          <div className="rounded-full w-full h-[4.5rem] flex justify-betweens items-center gap-10 m-3">
            <Image
              src={image}
              alt={name}
              width={100}
              height={100}
              className="rounded-full object-cover flex gap-6 w-[100px] h-[100px]"
            />
            <h1 className="flex w-auto bg-indigo-300 px-6 py-1 rounded-ee-full rounded-ss-full font-bold text-white">{name}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
