// import { IPokemon, PokemonState, SelectedPokemon } from "@/types/IPokemon";
import { StateCreator, create, useStore } from "zustand";
import { devtools } from "zustand/middleware";

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



//코드는 분리하고 전체 스토어는 한번만 만들고 싶으면 커링을 이용해 selector를 만들어야 한다.
//굳이 index에서 전체를 접근하는 코드가 필요할까?
//store별 파일을 관리하고 index에서 임포트 후 다시 리턴하는 방식이면 순환참조 문제도 없다.

const pokemonStore = create<PokemonState>()(devtools(set => ({
    pokemons: [],
    selected: undefined,
    setSelected: (selected: SelectedPokemon) => {
        set({ selected }, undefined, POKEMON_ACTION.SET_SELECTED);
    },
    setPokemons: (pokemons: IPokemon[]) => {
        set({ pokemons }, undefined, POKEMON_ACTION.SET_POKEMONS);
    }
}), {
    name: "pokemonStore"
}));

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

function usePokemonStore(): PokemonState
function usePokemonStore<T>(selector: (state: PokemonState) => T): T
function usePokemonStore<T>(selector?: (state: PokemonState) => T) {
    return useStore(pokemonStore, selector!);
}

//selector
const selectPokemons = (s: PokemonState) => s.pokemons;
const selectSelected = (s: PokemonState) => s.selected;

const selectSetPokemons = (s: PokemonState) => s.setPokemons;
const selectSetSelect = (s: PokemonState) => s.setSelected;


const usePokemons = () => usePokemonStore(selectPokemons);
const useSelectedPokemon = () => usePokemonStore(selectSelected);
const useSetPokemons = () => usePokemonStore(selectSetPokemons);
const useSetSelectPokemon = () => usePokemonStore(selectSetSelect);


export type { IPokemon, SelectedPokemon, PokemonState };
export {
    selectPokemons,
    selectSelected,
    selectSetSelect,
    selectSetPokemons
}
export {
    createPokemonSlice,
    usePokemonStore,
    usePokemons,
    useSelectedPokemon,
    useSetPokemons,
    useSetSelectPokemon
}