

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


export { IPokemon, PokemonState, SelectedPokemon };