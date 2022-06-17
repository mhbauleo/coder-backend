function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const randoms = {};
let actual;

process.on("message", (cant) => {
  for (let i = 0; i < cant; i++) {
    actual = generateRandom(1, 1000);
    if (randoms.hasOwnProperty(actual)) {
      randoms[actual]++;
    } else {
      randoms[actual] = 1;
    }
  }
  process.send(randoms);
});
