VanillaTilt.init(document.querySelector(".card"), {
  max: 25,
  speed: 500,
  // glare: true,
  // "max-glare": 1,
  scale: 1.1,
  perspective: 1000,
  easing: "cubic-bezier(.04,.99,.55,.97)",
  reset: true,
});

const card = document.querySelector(".card-animation2");
// const glare = card.querySelector(".glare");

let isMouseOver = false;
let animationFrameId;

const updateCard = (event) => {
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * 25;
  const rotateY = ((x - centerX) / centerX) * 25;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${-rotateY}deg) scale(1.1)`;

  // Calculate glare angle
  // const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) - 90;
  // const glareX = (x / rect.width) * 100;
  //
  // glare.style.transform = `rotate(${angle}deg) translate(-50%, -50%)`;
  // glare.style.background = `linear-gradient(${angle}deg, rgba(255, 255, 255, ${
  //   1 - Math.abs(glareX - 50) / 50
  // }) 0%, rgba(255, 255, 255, 0) 100%)`;
  // glare.style.opacity = "1";
};

const onMouseMove = (event) => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  animationFrameId = requestAnimationFrame(() => updateCard(event));
};

const onMouseLeave = () => {
  card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  card.style.transition = "transform .5s cubic-bezier(.04,.99,.55,.97)";
  // glare.style.opacity = "0";
  // glare.style.transition = "opacity 0.5s, transform 3s ease-in-out";
  isMouseOver = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
};

card.addEventListener("mousemove", (event) => {
  isMouseOver = true;
  onMouseMove(event);
});

card.addEventListener("mouseleave", onMouseLeave);
