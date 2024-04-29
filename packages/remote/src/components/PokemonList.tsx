import React, { useEffect, useMemo } from "react";
import { IPokemon } from "@/store/pokemonState";
import * as styles from "./style.module.css";
import { usePokemons, useSelectPokemon, useSetPokemons, useSetSelectPokemon } from "@/store";


function PokemonList() {

    const pokemons = usePokemons();
    const setPokemons = useSetPokemons();
    const setSelectedPokemon = useSetSelectPokemon();
    const selected = useSelectPokemon();

    const fetchPokemons = async () => {
        const response = await fetch("/pokemons");
        const jsonData = await response.json();
        setPokemons(jsonData as IPokemon[]);
    }

    useMemo(async () => {
        if (selected) {
            const response = await fetch(`/pokemons/${selected?.id}`);
            const jsonData = await response.json();
            console.log('detail', jsonData);
        }
    }, [selected]);

    useEffect(() => {
        fetchPokemons();
    }, []);

    return (
        <div className={ styles.container }>
            <h1>Pokemon List Micro Frontend</h1>
            <div className={ styles.pokemonCardContainer }>
                {
                    pokemons.map(o => {
                        return (
                            <div className={ styles.pokemonCard } key={ o.id } onClick={ () => setSelectedPokemon(o) }>
                                <img src={ o.sprite } aria-label={ `Image of pokemon ${o.name}` } />
                                <label>{ o.name }</label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default PokemonList;