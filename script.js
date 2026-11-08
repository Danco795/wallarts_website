const WHATSAPP_NUMBER = "254723106225";

function openWhatsApp(message) {
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener,noreferrer");
}

document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("enquiry-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = form.elements.name.value.trim();
    const product = form.elements.product.value;
    const details = form.elements.details.value.trim();
    let message = "Hello WallArts, my name is " + name + ". I'm interested in: " + product + ".";
    if (details) message += " My preferences and details: " + details + ".";
    message += " Please share the price, 50% deposit amount, estimated completion date, and pickup or delivery options.";
    openWhatsApp(message);
  });
});
