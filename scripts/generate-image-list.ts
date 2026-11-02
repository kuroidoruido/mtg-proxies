import fs from "node:fs";

fs.writeFileSync(
    "./public/imgs/list.json",
    JSON.stringify(
        fs.readdirSync("./public/imgs").map((f) => `/imgs/${f}`),
        undefined,
        2,
    ),
);
