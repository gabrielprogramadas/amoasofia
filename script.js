const pre = document.getElementById("heart");

let A = 0;

const text = "sofia";

function render() {
  const width = 80;
  const height = 40;

  let buffer = [];
  let zbuffer = [];

  for (let i = 0; i < width * height; i++) {
    buffer[i] = " ";
    zbuffer[i] = 0;
  }

  for (let t = 0; t < Math.PI * 2; t += 0.05) {
    for (let p = 0; p < Math.PI * 2; p += 0.05) {

      // Equação de coração 3D
      const x = 16 * Math.pow(Math.sin(t), 3);

      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      const z = Math.sin(p);

      // Rotação
      const sinA = Math.sin(A);
      const cosA = Math.cos(A);

      const xRot = x * cosA - z * sinA;
      const zRot = x * sinA + z * cosA;

      const scale = 0.8;
      const proj = 1 / (zRot + 20);

      const xp = Math.floor(
        width / 2 + xRot * proj * 30 * scale
      );

      const yp = Math.floor(
        height / 2 - y * proj * 15 * scale
      );

      const idx = xp + yp * width;

      if (
        xp >= 0 &&
        xp < width &&
        yp >= 0 &&
        yp < height
      ) {
        if (proj > zbuffer[idx]) {
          zbuffer[idx] = proj;

          // Escolhe caractere da palavra
          const char = text[(xp + yp) % text.length];

          buffer[idx] = char;
        }
      }
    }
  }

  // Render com expansão horizontal
  let output = "";

  for (let i = 0; i < width * height; i++) {
    if (i % width === 0) {
      output += "\n";
    }

    output += buffer[i] === " " ? " " : buffer[i];
  }

  pre.textContent = output;

  A += 0.03;
}

setInterval(render, 50);
