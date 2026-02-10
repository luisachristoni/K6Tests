import http from "k6/http";
import { sleep } from "k6";
import {criarPet, buscarPet} from "./api/petApi.js";

export const options = {
    vus:2,
    duration: "10s"
};

export default function() {
   const id = criarPet();
   buscarPet(id);
}