import { IPokemon } from "@/store/pokemonState";
import { pokemons } from "@/mocks/response/data";
import axios from "axios";
describe("msw api test", () => {
    it("get pokemons list", async () => {
        const response = await axios.get<IPokemon[]>("http://api.example.com/pokemons");
        expect(response.data).toEqual(pokemons);
    });
});