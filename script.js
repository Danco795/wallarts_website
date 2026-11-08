const WHATSAPP_NUMBER = "254723106225";

function openWhatsApp(message) {
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
}

document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const dialog = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  document.querySelectorAll(".art[data-image]").forEach(function (item) {
    item.addEventListener("click", function () {
      if (!dialog || !image || !caption) return;
      image.src = item.dataset.image;
      image.alt = item.dataset.title || "Wall art preview";
      caption.textContent = item.dataset.title || "Wall art";
      dialog.showModal();
    });
  });
  const close = document.querySelector(".lightbox-close");
  if (close && dialog) close.addEventListener("click", function () { dialog.close(); });
  if (dialog) dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  const form = document.getElementById("enquiry-form");
  if (form) form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim();
    const product = form.elements.product.value;
    const details = form.elements.details.value.trim();
    let message = "Hello WallArts, my name is " + name + ". I am interested in: " + product + ".";
    if (details) message += " My preferences: " + details + ".";
    message += " Please share available sizes, pricing, 50% deposit amount, estimated completion date and pickup or delivery options.";
    openWhatsApp(message);
  });
});
