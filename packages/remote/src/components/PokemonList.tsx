import React, { useEffect } from "react";
import { IPokemon } from "@/store/pokemonState";
import * as styles from "./style.module.css";
import { usePokemons, useSetPokemons, useSetSelectPokemon } from "@/store";


function PokemonList() {

    const pokemons = usePokemons();
    const setPokemons = useSetPokemons();
    const setSelectedPokemon = useSetSelectPokemon();

    const fetchPokemons = async () => {
        const response = await fetch(
            "https://raw.githubusercontent.com/kevinuehara/microfrontends/main/mocks/pokemonList.json"
        );
        const jsonData = await response.json();
        setPokemons(jsonData as IPokemon[]);
    }

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