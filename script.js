// IMPORTANT: replace this placeholder with your WhatsApp number in international format.
// Kenya example: 2547XXXXXXXX (no +, spaces, or leading 0).
const WHATSAPP_NUMBER = "2547XXXXXXXX";

function openWhatsApp(message) {
  if (WHATSAPP_NUMBER.includes("X")) {
    alert("Website setup needed: open script.js and replace 2547XXXXXXXX with your WhatsApp number.");
    return;
  }
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    openWhatsApp(`Hello, I'm interested in ${product}. Please share available options, sizes, prices, and delivery details.`);
  });
});

document.getElementById("enquiry-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const product = document.getElementById("product").value;
  const details = document.getElementById("details").value.trim();
  const message = `Hello, my name is ${name}. I'm enquiring about: ${product}.${details ? " Details: " + details : ""} Please let me know the options and pricing.`;
  openWhatsApp(message);
});

document.getElementById("year").textContent = new Date().getFullYear();
