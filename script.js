const WHATSAPP_NUMBER = "254723106225";

function openWhatsApp(message) {
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener,noreferrer");
}

document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-card").forEach(function (button) {
    button.addEventListener("click", function () {
      const image = button.dataset.image;
      const title = button.dataset.title || "WallArts image";
      if (!image || !lightbox || !lightboxImage || !lightboxCaption) return;

      lightboxImage.src = image;
      lightboxCaption.textContent = title;
      lightbox.classList.add("visible");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", function () {
      if (!lightbox) return;
      lightbox.classList.remove("visible");
      lightbox.setAttribute("aria-hidden", "true");
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        lightbox.classList.remove("visible");
        lightbox.setAttribute("aria-hidden", "true");
      }
    });
  }

  const sizePreview = document.getElementById("size-preview");
  const sizeLabel = document.getElementById("size-label");
  const sizeDetails = {
    a5: { label: "A5", className: "frame-shell--a5", text: "Best for small feature walls or bedside moments" },
    a4: { label: "A4", className: "frame-shell--a4", text: "Great for office desks and compact gallery moments" },
    a3: { label: "A3", className: "frame-shell--a3", text: "Comfortable for dining corners, entryways and shelves" },
    a2: { label: "A2", className: "frame-shell--a2", text: "Bold but balanced for lounge walls and bedrooms" },
    a1: { label: "A1", className: "frame-shell--a1", text: "Statement scale for family rooms and reception spaces" },
    a0: { label: "A0", className: "frame-shell--a0", text: "Large statement piece for big walls and feature spaces" }
  };

  document.querySelectorAll(".size-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      const key = button.dataset.size;
      if (!sizePreview || !sizeLabel || !sizeDetails[key]) return;

      document.querySelectorAll(".size-btn").forEach(function (btn) {
        btn.classList.toggle("active", btn === button);
      });

      sizePreview.className = "frame-shell " + sizeDetails[key].className;
      sizeLabel.textContent = sizeDetails[key].label;
      const metaText = sizePreview.parentElement.querySelector(".frame-meta span");
      if (metaText) metaText.textContent = sizeDetails[key].text;
    });
  });

  const form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const name = form.elements.name.value.trim();
      const product = form.elements.product.value;
      const details = form.elements.details.value.trim();

      let message = "Hello WallArts, my name is " + name + ". I am interested in: " + product + ".";
      if (details) message += " My details: " + details + ".";
      message += " Please share available sizes, pricing, the deposit structure and delivery or pickup options.";
      openWhatsApp(message);
    });
  }
});
