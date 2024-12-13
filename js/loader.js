window.addEventListener("load", function () {
  setTimeout(function () {
    const loader = document.querySelector(".loader-overlay");
    const content = document.querySelector(".content");

    if (loader) {
      loader.classList.add("hide");

      loader.addEventListener("transitionend", function () {
        loader.style.display = "none";
        content.classList.add("visible");
      });
    }
  }, 1000);
});
