const navToggle = document.querySelector("[data-nav-toggle]");
const mobilePanel = document.querySelector("[data-mobile-panel]");

if (navToggle && mobilePanel) {
  navToggle.addEventListener("click", () => {
    const isOpen = mobilePanel.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobilePanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobilePanel.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const reviewTrack = document.querySelector("[data-reviews]");
const reviewPrev = document.querySelector("[data-review-prev]");
const reviewNext = document.querySelector("[data-review-next]");

if (reviewTrack && reviewPrev && reviewNext) {
  const slides = Array.from(reviewTrack.children);
  let index = 0;

  const render = () => {
    reviewTrack.style.transform = `translateX(-${index * 100}%)`;
  };

  reviewPrev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });

  reviewNext.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    render();
  });

  window.setInterval(() => {
    index = (index + 1) % slides.length;
    render();
  }, 6500);
}

document.querySelectorAll("form[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", () => {
    if (typeof gtag === "function") {
      gtag("event", "generate_lead", {
        form_name: form.getAttribute("name") || "inquiry"
      });
    }
  });
});

document.querySelectorAll("a[href^='tel:'], a[href^='mailto:']").forEach((link) => {
  link.addEventListener("click", () => {
    if (typeof gtag === "function") {
      const href = link.getAttribute("href") || "";
      gtag("event", "contact_click", {
        contact_method: href.startsWith("tel:") ? "phone" : "email"
      });
    }
  });
});
