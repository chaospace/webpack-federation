import React, { Suspense } from "react";
import PokemonList from "remote/PokemonList";
function App() {

    return (
        <React.Fragment>
            <div>Host App</div>
            <Suspense fallback="">
                <PokemonList />
            </Suspense>
        </React.Fragment>
    )
}

export default App;