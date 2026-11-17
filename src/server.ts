import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 4, name: "Ferrari", base: "Maranello, Italy" },
  { id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 6, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 7, name: "Haas", base: "Kannapolis, United States" },
  { id: 8, name: "Racing Bulls", base: "Faenza, Italy" },
  { id: 9, name: "Williams", base: "Grove, United Kingdom" },
  { id: 10, name: "Audi", base: "Hinwil, Switzerland" },
  { id: 11, name: "Cadillac", base: "Fishers, Indiana, United States" },
];

const drivers = [
  { id: 1, name: "Lando Norris", team: "McLaren" },
  { id: 2, name: "Oscar Piastri", team: "McLaren" },
  { id: 3, name: "George Russell", team: "Mercedes" },
  { id: 4, name: "Kimi Antonelli", team: "Mercedes" },
  { id: 5, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 6, name: "Isack Hadjar", team: "Red Bull Racing" },
  { id: 7, name: "Charles Leclerc", team: "Ferrari" },
  { id: 8, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
  { id: 10, name: "Lance Stroll", team: "Aston Martin" },
  { id: 11, name: "Pierre Gasly", team: "Alpine" },
  { id: 12, name: "Franco Colapinto", team: "Alpine" },
  { id: 13, name: "Esteban Ocon", team: "Haas" },
  { id: 14, name: "Oliver Bearman", team: "Haas" },
  { id: 15, name: "Liam Lawson", team: "Racing Bulls" },
  { id: 16, name: "Arvid Lindblad", team: "Racing Bulls" },
  { id: 17, name: "Alexander Albon", team: "Williams" },
  { id: 18, name: "Carlos Sainz", team: "Williams" },
  { id: 19, name: "Nico Hülkenberg", team: "Audi" },
  { id: 20, name: "Gabriel Bortoleto", team: "Audi" },
  { id: 21, name: "Sergio Pérez", team: "Cadillac" },
  { id: 22, name: "Valtteri Bottas", team: "Cadillac" },
];

interface TeamParams {
  teamName: string;
}

interface DriverParams {
  id: string;
}

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

server.get<{ Params: TeamParams }>(
  "/teams/:teamName/drivers",
  async (request, response) => {
    const requestedName = request.params.teamName.trim();
    const team = teams.find(
      (item) =>
        item.name.toLocaleLowerCase("pt-BR") ===
        requestedName.toLocaleLowerCase("pt-BR"),
    );

    if (!team) {
      response.type("application/json").code(404);
      return { message: "Team Not Found" };
    }

    const teamDrivers = drivers.filter((driver) => driver.team === team.name);

    response.type("application/json").code(200);
    return { team: team.name, drivers: teamDrivers };
  },
);

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = Number(request.params.id);
    const driver = drivers.find((item) => item.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    }

    response.type("application/json").code(200);
    return { driver };
  },
);

const port = Number(process.env.PORT) || 3333;

server.listen({ port }, (error, address) => {
  if (error) throw error;
  server.log.info(`Server listening at ${address}`);
});
