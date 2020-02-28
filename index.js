const container = document.getElementById("container");
const info = document.getElementById("info");
const body = document.querySelector("body");
const left = 1000;
const difSize = 70;
const outSpeed = 40;
let interIds = [];

const randColor = () => {
  return Math.floor(Math.random() * 255);
};
const randSize = (n = 100) => {
  return Math.floor(Math.random() * n) + 1;
};

const createDiv = color => {
  const div = document.createElement("div");

  switch (color) {
    case "red":
      div.style.background = `rgb(${randColor()}, 0, 0)`;
      break;
    case "green":
      div.style.background = `rgb(0, ${randColor()}, 0)`;
      break;
    case "blue":
      div.style.background = `rgb(0, 0, ${randColor()})`;
      break;
  }
  if (!color) {
    div.style.background = `rgb(${randColor()}, ${randColor()}, ${randColor()})`;
  }

  div.style.width = `${randSize() - difSize}%`;
  div.style.height = `${randSize() - difSize}%`;
  div.classList.add("color");

  return div;
};

const generate = color => {
  while (container.firstChild) container.removeChild(container.firstChild);
  info.style.display = "none";
  //
  // for (let i = 1; i <= left; i++) {
  //   setTimeout(() => {
  //     const div = createDiv();
  //     container.appendChild(div);
  //
  //     if (container.childNodes.length >= 25) {
  //       // while (container.firstChild)
  //       container.removeChild(container.firstChild);
  //     }
  //
  //     setTimeout(() => {
  //       div.style.top = `${randSize()}%`;
  //       div.style.left = `${randSize()}%`;
  //     }, 10);
  //     // div.style.top = "0";
  //     // div.style.left = "0";
  //     // div.classList.add("trans");
  //   }, 200 * i);
  // }

  // let id = setInterval(() => console.log("INTERVAL"), 100);
  // interIds.push(id);

  let id = setInterval(() => {
    const div = createDiv(color);
    container.appendChild(div);
    setTimeout(() => {
      div.style.top = `${randSize()}%`;
      div.style.left = `${randSize()}%`;
    }, 10);
    if (container.childNodes.length >= left) {
      clearInterval();
      container.removeChild(container.firstChild);
    }
  }, outSpeed);
  interIds.push(id);
};

const changeBody = color => {
  body.style.transition = null;
  body.style.background = color;
  setTimeout(() => {
    body.style.transition = `all 1s ease`;
    body.style.background = null;
  }, 400);
};

const clearAllInterval = () => {
  for (id of interIds) clearInterval(id);
  interIds = [];
};

document.addEventListener("keypress", event => {
  const code = event.code;

  if (code === "KeyR") return generate("red");
  if (code === "KeyG") return generate("green");
  if (code === "KeyB") return generate("blue");
  else {
    if (code !== "Enter") return generate(null);
    else clearAllInterval();
  }
});

document.addEventListener("click", event => {
  const color = event.target.style.background;
  changeBody(color);
});
