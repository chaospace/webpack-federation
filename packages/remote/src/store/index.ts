import { create, useStore } from "zustand";
import { devtools } from "zustand/middleware";
import { CountState, countSelector, createCountSlice, setCountSelector } from "./countState";
import { PokemonState, createPokemonSlice, pokemonsSelector, selectedSelector, setPokemonsSelector, setSelectedSelector } from "./pokemonState";

interface State extends PokemonState, CountState { }

const store = create<State>()(devtools((...args) => ({
    ...createCountSlice(...args),
    ...createPokemonSlice(...args)
}), { name: "stateStore" }));




function useStateStore(): State
function useStateStore<T>(selector: (state: State) => T): T
function useStateStore<T>(selector?: (state: State) => T) {
    return useStore(store, selector!);
}

//counter
const useCount = () => useStateStore(countSelector);
const useSetCount = () => useStateStore(setCountSelector);

//pokemons
const usePokemons = () => useStateStore(pokemonsSelector);
const useSetPokemons = () => useStateStore(setPokemonsSelector);
const useSelectPokemon = () => useStateStore(selectedSelector);
const useSetSelectPokemon = () => useStateStore(setSelectedSelector);

export {
    useStateStore,
    useCount,
    useSetCount,

    useSelectPokemon,
    usePokemons,
    useSetPokemons,
    useSetSelectPokemon
}
export default store;