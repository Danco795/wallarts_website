const WHATSAPP_NUMBER = "254723106225";

function openWhatsApp(message) {
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  // Product buttons
  document.querySelectorAll("[data-product]").forEach(function (button) {
    button.addEventListener("click", function () {
      openWhatsApp("Hello, I'm interested in " + button.dataset.product + ". Please share available options, sizes, prices, and delivery details.");
    });
  });

  // Enquiry form
  const form = document.querySelector("form");

  function sendEnquiry(e) {
    if (e) e.preventDefault();
    const scope = form || document;
    const nameInput = scope.querySelector("input[type='text'], input:not([type])");
    const select = scope.querySelector("select");
    const textarea = scope.querySelector("textarea");

    const name = nameInput ? nameInput.value.trim() : "";
    const interest = select ? select.value : "";
    const details = textarea ? textarea.value.trim() : "";

    let msg = "Hello WallArts, my name is " + name + ". I am interested in: " + interest + ".";
    if (details) msg += " Details: " + details + ".";
    msg += " Please let me know the options and pricing.";
    openWhatsApp(msg);
  }

  if (form) form.addEventListener("submit", sendEnquiry);

  // Buttons found by their text
  document.querySelectorAll("button, a").forEach(function (el) {
    const text = el.textContent.trim().toLowerCase();
    if (text.includes("send enquiry")) {
      el.addEventListener("click", sendEnquiry);
    } else if (text.includes("chat on whatsapp") && !el.getAttribute("href")) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        openWhatsApp("Hello, I am interested in your wall art");
      });
    }
  });

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
