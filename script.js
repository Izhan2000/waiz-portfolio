const body = document.body;
const header = document.getElementById("header");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const progress = document.getElementById("scrollProgress");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

// Mobile menu
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navItems.forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Dark mode
const savedTheme = localStorage.getItem("waiz-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeIcon.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeIcon.textContent = isDark ? "☀" : "☾";
  localStorage.setItem("waiz-theme", isDark ? "dark" : "light");
});

// Header + scroll progress + active navigation
function handleScroll() {
  header.classList.toggle("scrolled", window.scrollY > 20);

  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0%";

  let current = "home";
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) current = section.id;
  });

  navItems.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Typing animation
const typingEl = document.getElementById("typingText");
const words = [
  "digital experiences.",
  "responsive websites.",
  "creative interfaces.",
  "IT solutions."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const word = words[wordIndex];

  if (!deleting) {
    charIndex++;
    typingEl.textContent = word.slice(0, charIndex);

    if (charIndex === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typingEl.textContent = word.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 75);
}

typeLoop();

// Contact demo
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

form.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();

  formNote.textContent = `Thanks, ${name || "there"}! This demo form is ready to connect to a backend/email service.`;
  form.reset();
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Small tilt effect for project cards on desktop
if (window.matchMedia("(min-width: 900px)").matches) {
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
      card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-7px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
