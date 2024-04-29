import React from "react";
import ReactDom from "react-dom/client";
import PokemonList from "./components/PokemonList";
import Counter from "./components/Counter";

const prepareRender = async () => {
    if (process.env.mode === "development") {
        const { worker } = await import("./server/worker");
        return worker.start({
            serviceWorker: {
                url: "/mockServiceWorker.js"
            }
        });
    }
    return Promise.resolve();
}

const render = () => {

    ReactDom.createRoot(document.getElementById("app")!).render(
        <React.StrictMode>
            <PokemonList />
            <Counter />
        </React.StrictMode>
    );
}


prepareRender().then(render);

