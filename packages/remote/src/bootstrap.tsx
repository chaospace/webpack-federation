import React from "react";
import ReactDom from "react-dom/client";
import PokemonList from "./components/PokemonList";
import Counter from "./components/Counter";

const render = () => {
    ReactDom.createRoot(document.getElementById("app")!).render(
        <React.StrictMode>
            <PokemonList />
            <Counter />
        </React.StrictMode>
    );
}


render();


