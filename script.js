// :  .254723106225
// Kenya example: 2547XXXXXXXX (no +, spaces, or leading 0).
const WHATSAPP_NUMBER = "254723106225";

function openWhatsApp(hey we are open) {
  if (WHATSAPP_NUMBER.includes("X")) {
    alert("Website setup needed: open script.js and replace 2547XXXXXXXX with your WhatsApp number.");
    return;
  }
  
}

document.getElementById("whatsappBtn").addEventListener("click", function () {
  const phone = "254723106225";
  const message = "Hello, I am interested in your wall art";
  window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(message), "_blank");
}); document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    openWhatsApp(`Hello, I'm interested in ${product}. Please share available options, sizes, prices, and delivery details.`);
  });
});

product}.${details ? " Details: " + details : ""} Please let me know the options and pricing.`;
  openWhatsApp(message);
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("whatsappBtn").addEventListener("click", function () {
  const phone = "254723106225";
  const message = "Hello, I am interested in your wall art";
  window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(message), "_blank");
});
