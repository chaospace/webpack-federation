import { StateCreator } from "zustand";

const POKEMON_ACTION = {
    SET_POKEMONS: "pokemons/SET_POKEMONS",
    SET_SELECTED: "pokemons/SET_SELECTED"
} as const;

interface IPokemon {
    id: number;
    name: string;
    sprite: string;
}

type SelectedPokemon = IPokemon | undefined;

interface PokemonState {
    selected: SelectedPokemon;
    pokemons: IPokemon[];
    setSelected: (select: SelectedPokemon) => void;
    setPokemons: (pokemons: IPokemon[]) => void;
}





const createPokemonSlice: StateCreator<PokemonState, [["zustand/devtools", never]], [], PokemonState> = (set) => ({
    pokemons: [],
    selected: undefined,
    setSelected: (selected: SelectedPokemon) => {
        set({ selected }, undefined, POKEMON_ACTION.SET_SELECTED);
    },
    setPokemons: (pokemons: IPokemon[]) => {
        set({ pokemons }, undefined, POKEMON_ACTION.SET_POKEMONS);
    }
});


//selector
const pokemonsSelector = (s: PokemonState) => s.pokemons;
const selectedSelector = (s: PokemonState) => s.selected;

const setPokemonsSelector = (s: PokemonState) => s.setPokemons;
const setSelectedSelector = (s: PokemonState) => s.setSelected;



export type { IPokemon, SelectedPokemon, PokemonState };
export {
    pokemonsSelector,
    selectedSelector,
    setSelectedSelector,
    setPokemonsSelector
}
export {
    createPokemonSlice,
}