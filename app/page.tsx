"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Pokemon from "./components/Pokemon";

async function getPokeMon({ pageParam }: { pageParam: number }) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/ability?limit=20&offset=${pageParam}`
  );
  // handle error if fetch data api not complete
  if (!res.ok) {
    throw new Error(`Failed to fetch data`);
  }

  // create new obj for retreive data jsons
  const data = await res.json();
  console.log(data);
  let fillerd = await data.results.map((pokemon: {}, index: number) => {
    let paddedIndex =
      pageParam === 0
        ? ("00" + (index + 1)).slice(-3)
        : ("00" + (index + 1 + pageParam)).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
    console.log(pokemon);
    return {
      ...pokemon,
      imageUrl: image,
    };
  });
  return fillerd;
}

export default function Home001() {
  const { ref, inView } = useInView();
  const {
    data: pokemons,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: getPokeMon,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length === 20 ? allPages.length * 20 : undefined;
      return nextPage;
    },
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-2xl border-b-4 border-red-400">Next infinte scroll</h1>
      <div className="w-full">
        {pokemons?.pages?.map((page) =>
          page.map(
            (
              pokemon: {
                imageUrl: string;
                name: string;
              },
              index: number
            ) => {
              if (page.length === index + 1) {
                return (
                  <div key={index} className="flex flex-col gap-4">
                    <Pokemon
                      image={pokemon.imageUrl}
                      name={pokemon.name}
                      key={index}
                      innerRef={ref}
                    />
                  </div>
                );
              } else {
                return (
                  <Pokemon
                    image={pokemon.imageUrl}
                    name={pokemon.name}
                    key={index}
                  />
                );
              }
            }
          )
        )}
      </div>
    </main>
  );
}
