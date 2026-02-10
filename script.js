import http from "k6/http";
import { sleep } from "k6";
import {criarPet, buscarPet} from "./api/petApi.js";

export const options = {
    vus: 2,
    duration: "10s",
    thresholds: {
        http_req_failed: ["rate<0.01"],     // menos de 1% de erro
        http_req_duration: ["p(95)<200"],   // 95% < 500ms
        checks: ["rate>0.99"],              // 99% dos checks passando
    },
};

export default function() {
   const id = criarPet();
   buscarPet(id);
}