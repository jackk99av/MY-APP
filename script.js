document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CONFIG
  ========================== */
  const NAV_OFFSET = 90; // height of fixed nav

  /* =========================
     SMOOTH SCROLL (WITH OFFSET)
  ========================== */
  const smoothScrollTo = (target) => {
    const element = document.getElementById(target);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - NAV_OFFSET;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const navLinks = document.querySelectorAll(
    'nav ul li a, .fixed-nav ul li a'
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        smoothScrollTo(href.substring(1));
      }
    });
  });

  /* =========================
     HERO BUTTONS
  ========================== */
  const viewWorkBtn = document.querySelector(".primary");
  const contactBtn = document.querySelector(".secondary");

  viewWorkBtn?.addEventListener("click", () => smoothScrollTo("portfolio"));
  contactBtn?.addEventListener("click", () => smoothScrollTo("contact"));

  /* =========================
     SKILLS BAR ANIMATION
  ========================== */
  const skillBars = document.querySelectorAll(".skill-bar");

  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.skill;
          observer.unobserve(bar); // animate once
        }
      });
    },
    { threshold: 0.6 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));

  /* =========================
     HAMBURGER MENU
  ========================== */
  const hamburger = document.getElementById("hamburger");
  const navlinks = document.getElementById("nav-links");
  const navLinkItems = document.querySelectorAll(".nav-link");

  const closeMenu = () => {
    hamburger?.classList.remove("active");
    navlinks?.classList.remove("active");
    document.body.classList.remove("no-scroll");
  };

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navlinks.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  navLinkItems.forEach((link) =>
    link.addEventListener("click", closeMenu)
  );

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });

  /* =========================
     ACTIVE NAV LINK ON SCROLL
  ========================== */
  const sections = document.querySelectorAll("section");
  const fixedNavLinks = document.querySelectorAll(".fixed-nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - NAV_OFFSET - 20;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    fixedNavLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  /* =========================
     DARK MODE TOGGLE
  ========================== */
  const darkToggle = document.querySelector(".dark-mode-toggle");

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "dark-mode",
        document.body.classList.contains("dark-mode")
      );
    });

    if (localStorage.getItem("dark-mode") === "true") {
      document.body.classList.add("dark-mode");
    }
  }

  /* =========================
     SECTION FADE-IN ON SCROLL
  ========================== */
  const revealSections = () => {
    const triggerBottom = window.innerHeight * 0.8;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealSections);
  revealSections();

  /* =========================
     CONTACT FORM SUBMIT
  ========================== */
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      }).then((response) => {
        if (response.ok) {
          document.getElementById("success-message").style.display = "block";
          form.reset();
        } else {
          alert("Something went wrong. Please try again.");
        }
      });
    });
  }
});
