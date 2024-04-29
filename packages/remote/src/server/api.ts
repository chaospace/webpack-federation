import { HttpResponse, http } from "msw";
import { pokemons } from "./response/data";

// http.options

// api mocking
const handlers = [
    http.get("/pokemons/:id", async ({ request, params }) => {
        const id = params?.id;
        return HttpResponse.json(pokemons[Number(id) - 1])
    }),
    http.get("/pokemons", () => {
        return HttpResponse.json(pokemons);
    }),
]




export default handlers;