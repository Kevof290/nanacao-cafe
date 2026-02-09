const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    //GET /cafes
    it("GET /cafes debe devolver 200 y un arreglo con al menos 1 objeto", async () => {

        const response = await request(server).get("/cafes");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

    });


    //DELETE id inexistente
    it("DELETE /cafes/:id inexistente debe devolver 404", async () => {

        const idInexistente = 9999;

        const response = await request(server)
            .delete(`/cafes/${idInexistente}`)
            .set("Authorization", "token-falso");

        expect(response.statusCode).toBe(404);

    });


    //POST /cafes
    it("POST /cafes debe agregar un nuevo café y devolver 201", async () => {

        const nuevoCafe = {
            id: 10,
            nombre: "Latte"
        };

        const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe);

        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(nuevoCafe);

    });


    //PUT con id distinto
    it("PUT /cafes debe devolver 400 si los ids son distintos", async () => {

        const cafeActualizado = {
            id: 5,
            nombre: "Capuccino Especial"
        };

        const response = await request(server)
            .put("/cafes/8") // distinto al body
            .send(cafeActualizado);

        expect(response.statusCode).toBe(400);

    });

});