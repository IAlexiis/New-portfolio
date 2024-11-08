const h1 = document.getElementById("typewritter-1");

const typewriter = new Typewriter(h1, {
  loop: true,
  delay: 75,
});

typewriter.typeString("Développeur Web").pauseFor(2000).deleteAll().start();
