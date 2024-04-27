import React from "react";
import ReactDom from "react-dom/client";
import PokemonList from "./components/PokemonList";

const render = () => {
    ReactDom.createRoot(document.getElementById("app")!).render(
        <React.StrictMode>
            <PokemonList />
        </React.StrictMode>
    );
}


render();


