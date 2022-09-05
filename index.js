const aniWrapper = document.querySelector("#animation-wrapper");
const addButton = document.querySelector(".add");
const removeButton = document.querySelector(".remove");
const optimizeButton = document.querySelector(".optimize");
const totalImagesParagraph = document.querySelector("#total-images");

let totalImages = 0;
let optimized = true;

const addImages = () => {
  const div = document.createElement("div");
  for (let i = 0; i < 10; i++) {
    if (!optimized) {
      breakAnimation();
    }
    const img = document.createElement("img");
    let maxLeft = window.innerWidth - img.width;
    let leftPos = Math.floor(Math.random() * (maxLeft + 1));
    let randomStartPosition = Math.floor(Math.random() * 1000);
    img.style.left = leftPos + "px";
    img.src = "./logo.png";
    img.width = 75;
    img.height = 75;
    img.style.top = randomStartPosition + 150 + "px";
    img.style.position = "absolute";
    div.appendChild(img);
    totalImages++;
  }
  aniWrapper.appendChild(div);
  totalImagesParagraph.innerHTML = totalImages;
  animate();
};

const breakAnimation = () => {
  const intervalId = window.setInterval(() => {}, Number.MAX_SAFE_INTEGER);
  const images = document.querySelectorAll("img");
  let sum = 0;
  if (!optimized) {
    images.forEach((_) => {
      setInterval(() => {
        for (let i = 0; i < 1000000; i++) {
          sum += i;
        }
      }, 500);
    });
  } else {
    for (let i = 1; i < intervalId; i++) {
      window.clearInterval(i);
    }
  }
};

const removeImages = () => {
  const div = document.querySelector("#animation-wrapper div:last-child");
  if (div) {
    div.remove();
    totalImages -= 10;
    totalImagesParagraph.innerHTML = totalImages;
  }
};

const animate = () => {
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    image.animate([{ top: "150px" }, { top: "94%" }, { top: "150px" }], {
      duration: 5000,
      iterations: Infinity,
      fill: "forwards",
      easing: "ease-in-out",
      delay: parseInt(image.style.top) * 2,
    });
  });
};

addButton.addEventListener("click", addImages);
removeButton.addEventListener("click", removeImages);
optimizeButton.addEventListener("click", () => {
  optimized = !optimized;
  optimizeButton.innerText = optimized
    ? "Disable Optimization"
    : "Enable Optimization";
  breakAnimation();
});
