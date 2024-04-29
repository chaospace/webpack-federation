import { create, useStore } from "zustand";
import { devtools } from "zustand/middleware";
import { CountState, createCountSlice } from "./countState";
import { PokemonState, createPokemonSlice } from "./pokemonState";

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


export { useStateStore }
export default store;