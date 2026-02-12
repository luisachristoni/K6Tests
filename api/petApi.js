import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = "https://petstore.swagger.io/v2";


export function criarPet() {
    const url = BASE_URL + "/pet";

    //body da requisição
    const payload = JSON.stringify({
        id: 0,
        category: { id: 0, name: "cachorro" },
        name: "Pelucinho",
        photoUrls: ["string"],
        tags: [{ id: 0, name: "string" }],
        status: "MEU",
    });
    // Headers
    const params = {
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
        },
    };
    // para post
    const res = http.post(url, payload, params);
    check(res, {
        "status 200": (r) => r.status === 200,
    });

    // Imprimindo o que aconteceu
    console.log("Status:", res.status);
    const bodyStr = res.body;
    const idStr = bodyStr.match(/"id":\s*(\d+)/)[1];
    console.log("ID do pet:", idStr);
    console.log("Nome:", res.json("name"));
    console.log("json", res.body)
    console.log("Nome Categoria:", res.json("category.name"));

    sleep(1);
    return idStr;
}

export function buscarPet(id) {
    const url2 = BASE_URL+ `/pet/${id}`;
    console.log('URl2:', url2)
    const params2 = {
        headers: {
            "accept": "application/json",
        },
    };
   const res = http.get(url2, params2);
   console.log("Status 2: ", res.status)
    check(res, {
        "status 200": (r) => r.status === 200,
    });
    sleep(1); 
    return res;
}