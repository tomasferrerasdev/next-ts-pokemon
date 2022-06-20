import axios from "axios";

const pokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

pokeAPI.get("/pokemon?limit=151");

export default pokeAPI;
