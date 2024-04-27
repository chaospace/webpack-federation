import { IPokemon, PokemonState, SelectedPokemon } from "@/types/IPokemon";
import { create, useStore } from "zustand";
import { devtools } from "zustand/middleware";


const pokemonStore = create<PokemonState>()(devtools(set => ({
    pokemons: [],
    selected: undefined,
    setSelected: (selected: SelectedPokemon) => {
        set({ selected }, undefined, "pokemons/setSelected");
    },
    setPokemons: (pokemons: IPokemon[]) => {
        set({ pokemons }, undefined, "pokemons/setPokemons");
    }
})));


function usePokemonStore(): PokemonState
function usePokemonStore<T>(selector: (state: PokemonState) => T): T
function usePokemonStore<T>(selector?: (state: PokemonState) => T) {
    return useStore(pokemonStore, selector!);
}

const usePokemons = () => usePokemonStore(state => state.pokemons);
const useSelectedPokemon = () => usePokemonStore(state => state.selected);
const useSetPokemons = () => usePokemonStore(state => state.setPokemons);
const useSetSelectPokemon = () => usePokemonStore(state => state.setSelected);

export {
    usePokemonStore,
    usePokemons,
    useSelectedPokemon,
    useSetPokemons,
    useSetSelectPokemon
}