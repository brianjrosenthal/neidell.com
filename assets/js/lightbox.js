// Click a diagram (any <figure> image) to open it larger in a modal dialog.
(function () {
  var images = document.querySelectorAll("figure img");
  if (!images.length || !window.HTMLDialogElement) return;

  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Enlarged image");
  dialog.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
    '<img alt="">';
  document.body.appendChild(dialog);

  var big = dialog.querySelector("img");
  var closeButton = dialog.querySelector(".lightbox-close");

  function open(img) {
    big.src = img.getAttribute("data-full") || img.currentSrc || img.src;
    big.alt = img.alt;
    dialog.showModal();
  }

  images.forEach(function (img) {
    img.classList.add("zoomable");
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Enlarge image: " + img.alt);
    img.addEventListener("click", function () {
      open(img);
    });
    img.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(img);
      }
    });
  });

  closeButton.addEventListener("click", function () {
    dialog.close();
  });

  // Clicking the dark area outside the image closes the dialog (Esc works natively).
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
})();
