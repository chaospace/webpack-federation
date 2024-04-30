import { HttpResponse, http } from "msw";
import { pokemons } from "./response/data";
// api mocking
const handlers = [
    http.get("http://api.example.com/pokemons/:id", async ({ request, params }) => {
        const id = params?.id;
        return HttpResponse.json(pokemons[Number(id) - 1])
    }),
    http.get("http://api.example.com/pokemons", () => {
        return HttpResponse.json(pokemons);
    }),
]




export default handlers;