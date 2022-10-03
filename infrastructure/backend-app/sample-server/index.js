import fastify from "fastify";
import osu from "node-os-utils";

const app = fastify();

const cpu = osu.cpu;

app.get("/", async () => {
  const usage = await cpu.usage();

  return "안녕하세요? 제 비밀번호를 알려드리죠. 제 비밀번호는: ".concat(
    process.env.PASSWORD
  );
});

app.get("/overwork", async () => {
  let counter = 0;
  const now = Date.now();
  while (true) {
    counter += 1;
    const _now = Date.now();
    if (_now - now > 100) {
      break;
    }
  }

  const usage = await cpu.usage();

  return {
    counter,
    cpu: usage,
  };
});

app.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`server listening on ${address}`);
});

// how to kill docker container
