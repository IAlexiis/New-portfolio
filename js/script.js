document.addEventListener("DOMContentLoaded", () => {
  const marquee = document.querySelector(".info-container");
  const clone = marquee.innerHTML;
  marquee.innerHTML += clone;
});

document.addEventListener("DOMContentLoaded", () => {
  VANTA.BIRDS({
    el: "#background-vanta",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    backgroundColor: 0x0,
    color1: 0xffffff,
    color2: 0xffffff,
    quantity: 4.0,
  });
});

ScrollReveal().reveal(".reveal", {
  duration: 1000,
  origin: "top",
  distance: "200px",
  easing: "ease-in-out",
});

ScrollReveal().reveal(".reveal-left", {
  duration: 1000,
  origin: "left",
  distance: "400px",
  easing: "ease-in-out",
});

ScrollReveal().reveal(".reveal-right", {
  duration: 1000,
  origin: "right",
  distance: "400px",
  easing: "ease-in-out",
});

ScrollReveal().reveal(".reveal-bottom", {
  duration: 1000,
  origin: "bottom",
  distance: "100px",
  easing: "ease-in-out",
});

ScrollReveal().reveal(".reveal-late-un", {
  duration: 1300,
  origin: "left",
  distance: "200px",
  easing: "ease-in-out",
});

ScrollReveal().reveal(".reveal-late-deux", {
  duration: 1600,
  origin: "left",
  distance: "200px",
  easing: "ease-in-out",
});

const questionContainers = document.querySelectorAll(".question-container");

const reponses = [
  "Je suis un étudiant en développement WEB ! J'ai créé ce site portfolio afin que vous puissiez en apprendre plus sur moi !",
  "J'ai utilisé des technologies comme HTML, CSS, JavaScript et des frameworks modernes pour construire ce site.",
  "Oui, je suis disponible pour des projets de développement web. N'hésitez pas à me contacter !",
];

questionContainers.forEach(function (questionContainer, index) {
  questionContainer.addEventListener("click", function () {
    const existingParagraph = questionContainer.querySelector(".reponse");

    if (existingParagraph) {
      existingParagraph.classList.add("suppression");
      questionContainer.classList.remove("open");

      setTimeout(() => {
        questionContainer.removeChild(existingParagraph);
      }, 500);
    } else {
      const nouveauParagraphe = document.createElement("p");
      nouveauParagraphe.classList.add("reponse");
      questionContainer.classList.add("open");

      nouveauParagraphe.textContent = reponses[index];
      questionContainer.appendChild(nouveauParagraphe);
    }
  });
});

const burger = document.querySelector(".burger");
const menu = document.querySelector(".lien");

burger.addEventListener("click", () => {
  menu.classList.toggle("active");
});
