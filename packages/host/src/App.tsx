import React, { Suspense } from "react";
import PokemonList from "remote/PokemonList";
import { useSelectPokemon } from "remote/Store";
import "./App.css";

function App() {

    //선택된 포켓몬 참조 가져오기
    const selected = useSelectPokemon();
    return (
        <React.Fragment>
            <h3 style={ { color: "#1e3a8a", fontSize: "20px" } }>Create using Vite + vite-plugin-federation</h3>
            <Suspense fallback="">
                <PokemonList />
            </Suspense>
            { selected && (
                <div className="container">
                    <h1 style={ { color: "#1e3a8a" } }>Selected Pokemon :</h1>
                    <div className="pokemon-card-container">
                        <img src={ selected?.sprite } className="pokemon-image"
                            aria-label="Image of Pokemon Selected" />
                        <label className="pokemon-name">{ selected?.name }</label>
                    </div>
                </div>
            ) }
        </React.Fragment>
    )
}

export default App;