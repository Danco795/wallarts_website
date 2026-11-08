const WHATSAPP_NUMBER = "254723106225";
const SIZE_PREVIEW_ARTWORK = [
  { src: "bedroom-wall.png", title: "Bedroom wall art" },
  { src: "family-wall-art.jpg", title: "Family wall art" },
  { src: "japan-canvas.png", title: "Japanese landscape canvas" },
  { src: "canvas-set.jpg", title: "Canvas set" },
  { src: "football-1.jpg", title: "Football art" },
  { src: "football-2.jpg", title: "Football collage" },
  { src: "quote-1.jpg", title: "Motivational wall art" },
  { src: "watercolor-family.jpg", title: "Watercolor family portrait" },
  { src: "portrait-2.jpg", title: "Portrait artwork" }
];
const FRAME_SIZES = [
  { label: "A5", width: 112, padding: 6 },
  { label: "A4", width: 142, padding: 7 },
  { label: "A3", width: 178, padding: 9 },
  { label: "A2", width: 224, padding: 11 },
  { label: "A1", width: 280, padding: 14 },
  { label: "A0", width: 340, padding: 17 }
];
const FRAME_FINISHES = [
  { label: "Oak", color: "#c7a477" },
  { label: "Walnut", color: "#805439" },
  { label: "Black", color: "#252525" },
  { label: "White", color: "#f6f2eb" }
];
const WALL_ART_SLIDES = Array.from({ length: 13 }, (_, index) => ({
  src: "/images/design" + (index + 1) + ".jpg",
  alt: "Wall art design " + (index + 1)
}));

function openWhatsApp(message) {
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
}

function addWallArtSlideshow() {
  const anchor = document.getElementById("sizes");
  if (!anchor || document.getElementById("our-wall-art")) return;

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "/wall-art-slideshow.css";
  document.head.appendChild(stylesheet);

  const section = document.createElement("section");
  section.className = "wall-art-section";
  section.id = "our-wall-art";
  section.setAttribute("aria-labelledby", "our-wall-art-heading");
  section.innerHTML = `
    <div class="wall-art-container">
      <div class="wall-art-heading">
        <p class="eyebrow">A CLOSER LOOK AT THE COLLECTION</p>
        <h2 id="our-wall-art-heading">Our Wall Art</h2>
        <p>Explore all 13 designs. Use the arrows, dots or swipe to browse.</p>
      </div>
      <div class="wall-art-carousel" aria-label="Wall art slideshow">
        <div class="wall-art-viewport" id="wall-art-viewport" tabindex="0" aria-label="Slideshow. Hover or tap to pause.">
          <div class="wall-art-track" id="wall-art-track"></div>
          <button class="wall-art-arrow wall-art-prev" type="button" aria-label="Previous slide">‹</button>
          <button class="wall-art-arrow wall-art-next" type="button" aria-label="Next slide">›</button>
          <div class="wall-art-dots" id="wall-art-dots" aria-label="Choose a slide"></div>
        </div>
        <div class="wall-art-controls">
          <span id="wall-art-counter" aria-live="polite">1 / 13</span>
          <button class="wall-art-play" id="wall-art-play" type="button" aria-pressed="false">Ⅱ Pause slideshow</button>
        </div>
      </div>
    </div>`;
  anchor.parentNode.insertBefore(section, anchor);

  const nav = document.querySelector(".site-header nav");
  if (nav && !nav.querySelector('a[href="#our-wall-art"]')) {
    const link = document.createElement("a");
    link.href = "#our-wall-art";
    link.textContent = "Our Wall Art";
    nav.insertBefore(link, nav.firstChild);
  }

  const track = document.getElementById("wall-art-track");
  const dots = document.getElementById("wall-art-dots");
  const viewport = document.getElementById("wall-art-viewport");
  const counter = document.getElementById("wall-art-counter");
  const playButton = document.getElementById("wall-art-play");
  let current = 0;
  let timer = null;
  let touchStartX = 0;

  WALL_ART_SLIDES.forEach((slide, index) => {
    const figure = document.createElement("figure");
    figure.className = "wall-art-slide";
    figure.setAttribute("aria-hidden", String(index !== 0));
    const image = document.createElement("img");
    image.src = slide.src;
    image.alt = slide.alt;
    image.loading = index < 2 ? "eager" : "lazy";
    image.decoding = "async";
    const caption = document.createElement("figcaption");
    caption.textContent = "Design " + (index + 1);
    figure.append(image, caption);
    track.appendChild(figure);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "wall-art-dot";
    dot.setAttribute("aria-label", "Show design " + (index + 1));
    dot.setAttribute("aria-current", index === 0 ? "true" : "false");
    dot.addEventListener("click", () => { showSlide(index); pause(); });
    dots.appendChild(dot);
  });

  function showSlide(index) {
    current = (index + WALL_ART_SLIDES.length) % WALL_ART_SLIDES.length;
    track.style.setProperty("--slide-index", current);
    track.querySelectorAll(".wall-art-slide").forEach((slide, i) => {
      slide.setAttribute("aria-hidden", String(i !== current));
    });
    dots.querySelectorAll(".wall-art-dot").forEach((dot, i) => {
      dot.setAttribute("aria-current", i === current ? "true" : "false");
    });
    counter.textContent = (current + 1) + " / " + WALL_ART_SLIDES.length;
  }

  function pause() {
    if (timer) window.clearInterval(timer);
    timer = null;
    playButton.textContent = "▶ Play slideshow";
    playButton.setAttribute("aria-pressed", "false");
  }

  function play() {
    pause();
    timer = window.setInterval(() => showSlide(current + 1), 4000);
    playButton.textContent = "Ⅱ Pause slideshow";
    playButton.setAttribute("aria-pressed", "true");
  }

  section.querySelector(".wall-art-prev").addEventListener("click", () => { showSlide(current - 1); pause(); });
  section.querySelector(".wall-art-next").addEventListener("click", () => { showSlide(current + 1); pause(); });
  playButton.addEventListener("click", () => timer ? pause() : play());
  viewport.addEventListener("mouseenter", pause);
  viewport.addEventListener("focusin", pause);
  viewport.addEventListener("pointerdown", pause);
  viewport.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    pause();
  }, { passive: true });
  viewport.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 40) showSlide(current + (distance < 0 ? 1 : -1));
  }, { passive: true });
  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { showSlide(current - 1); pause(); }
    if (event.key === "ArrowRight") { showSlide(current + 1); pause(); }
  });
  play();
}

document.addEventListener("DOMContentLoaded", function () {
  addWallArtSlideshow();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const dialog = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  document.querySelectorAll(".art-card[data-image]").forEach(function (card) {
    card.addEventListener("click", function () {
      if (!dialog || !lightboxImage || !lightboxCaption) return;
      lightboxImage.src = card.dataset.image;
      lightboxImage.alt = card.dataset.title || "Expanded wall art";
      lightboxCaption.textContent = card.dataset.title || "Wall art";
      dialog.showModal();
    });
  });
  const closeButton = document.querySelector(".lightbox-close");
  if (closeButton && dialog) closeButton.addEventListener("click", function () { dialog.close(); });
  if (dialog) dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  const frame = document.getElementById("size-frame");
  const frameArt = document.getElementById("size-art");
  const artName = document.getElementById("preview-art-name");
  const slideCount = document.getElementById("slide-count");
  const sizeOptions = document.getElementById("size-options");
  const finishOptions = document.getElementById("finish-options");
  if (frame && frameArt && artName && slideCount && sizeOptions && finishOptions) {
    let artIndex = 0;
    let sizeIndex = 0;
    let finishIndex = 0;
    let timer = null;
    const sizeButtons = [];
    const finishButtons = [];

    function updatePreview() {
      const art = SIZE_PREVIEW_ARTWORK[artIndex];
      const size = FRAME_SIZES[sizeIndex];
      const finish = FRAME_FINISHES[finishIndex];
      frame.style.setProperty("--frame-width", size.width + "px");
      frame.style.setProperty("--frame-padding", size.padding + "px");
      frame.style.setProperty("--frame-color", finish.color);
      frameArt.src = art.src;
      frameArt.alt = art.title + " preview in size " + size.label + " with " + finish.label + " frame";
      artName.textContent = art.title;
      slideCount.textContent = (artIndex + 1) + " / " + SIZE_PREVIEW_ARTWORK.length;
      sizeButtons.forEach((button, index) => {
        button.classList.toggle("active", index === sizeIndex);
        button.setAttribute("aria-pressed", String(index === sizeIndex));
      });
      finishButtons.forEach((button, index) => {
        button.classList.toggle("active", index === finishIndex);
        button.setAttribute("aria-pressed", String(index === finishIndex));
      });
    }

    FRAME_SIZES.forEach((size, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = size.label;
      button.setAttribute("aria-label", "Preview " + size.label + " size");
      button.addEventListener("click", () => { sizeIndex = index; updatePreview(); });
      sizeButtons.push(button);
      sizeOptions.appendChild(button);
    });
    FRAME_FINISHES.forEach((finish, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = finish.label;
      button.addEventListener("click", () => { finishIndex = index; updatePreview(); });
      finishButtons.push(button);
      finishOptions.appendChild(button);
    });
    function stepArtwork(direction) {
      artIndex = (artIndex + direction + SIZE_PREVIEW_ARTWORK.length) % SIZE_PREVIEW_ARTWORK.length;
      updatePreview();
    }
    document.getElementById("prev-art").addEventListener("click", () => stepArtwork(-1));
    document.getElementById("next-art").addEventListener("click", () => stepArtwork(1));
    document.getElementById("play-slideshow").addEventListener("click", function () {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
        this.setAttribute("aria-pressed", "false");
        this.textContent = "▶ Play slideshow";
        return;
      }
      timer = window.setInterval(() => stepArtwork(1), 3200);
      this.setAttribute("aria-pressed", "true");
      this.textContent = "Ⅱ Pause slideshow";
    });
    updatePreview();
  }

  const form = document.getElementById("enquiry-form");
  if (form) form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim();
    const product = form.elements.product.value;
    const details = form.elements.details.value.trim();
    let message = "Hello WallArts, my name is " + name + ". I am interested in: " + product + ".";
    if (details) message += " My preferences: " + details + ".";
    message += " Please share available sizes, pricing, 50% deposit amount, estimated completion date, and pickup or delivery options.";
    openWhatsApp(message);
  });
});
