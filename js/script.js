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
  origin: "bottom",
  distance: "100px",
});

ScrollReveal().reveal(".reveal-left", {
  duration: 1000,
  origin: "left",
  distance: "100px",
  easing: "ease-in-out",
});

ScrollReveal().reveal(".reveal-right", {
  duration: 1000,
  origin: "right",
  distance: "100px",
  easing: "ease-in-out",
});

const buttons = document.querySelectorAll(".button-anime");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card-projet");
    if (card) {
      const img = card.querySelector(".blur");
      if (img) {
        img.style.filter = "blur(0px)";
      }

      button.style.display = "none";
    }
  });
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
      existingParagraph.classList.remove("reponse-visible");

      setTimeout(() => {
        questionContainer.removeChild(existingParagraph);
      }, 300);
    } else {
      const nouveauParagraphe = document.createElement("p");
      nouveauParagraphe.classList.add("reponse");

      nouveauParagraphe.textContent = reponses[index];

      questionContainer.appendChild(nouveauParagraphe);

      setTimeout(() => {
        nouveauParagraphe.classList.add("reponse-visible");
      }, 10);
    }
  });
});
