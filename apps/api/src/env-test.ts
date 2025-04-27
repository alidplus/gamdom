import env from "./env";

setInterval(() => {
  console.log("ORIGIN", env.ORIGIN);
}, 1000);
