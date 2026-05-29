document.addEventListener("DOMContentLoaded", () => {

  AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
  });
  /* =========================================
     CONFIG
  ========================================= */

  const NAV_OFFSET = 90;

  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  const smoothScrollTo = (targetId) => {

    const target = document.getElementById(targetId);

    if (!target) return;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      NAV_OFFSET;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  /* =========================================
     NAVIGATION LINKS
  ========================================= */

  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {

    link.addEventListener("click", (e) => {

      const href = link.getAttribute("href");

      if (href.startsWith("#")) {

        e.preventDefault();

        smoothScrollTo(href.substring(1));

        closeMenu();
      }
    });
  });

  /* =========================================
     HERO BUTTONS
  ========================================= */

  const exploreBtn = document.querySelector(".primary-btn");
  const projectBtn = document.querySelector(".secondary-btn");

  exploreBtn?.addEventListener("click", () => {
    smoothScrollTo("portfolio");
  });

  projectBtn?.addEventListener("click", () => {
    smoothScrollTo("contact");
  });

  /* =========================================
     HAMBURGER MENU
  ========================================= */

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-links");

  const closeMenu = () => {

    hamburger?.classList.remove("active");
    navMenu?.classList.remove("active");

    document.body.classList.remove("no-scroll");
  };

  hamburger?.addEventListener("click", () => {

    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    document.body.classList.toggle("no-scroll");
  });

  window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  /* =========================================
     ACTIVE NAVIGATION LINK
  ========================================= */

  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop - NAV_OFFSET - 100;

      if (window.pageYOffset >= sectionTop) {

        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {

      link.classList.remove("active");

      if (
        link.getAttribute("href") ===
        `#${currentSection}`
      ) {
        link.classList.add("active");
      }
    });
  });

  /* =========================================
     SECTION REVEAL ANIMATION
  ========================================= */

  const revealElements = document.querySelectorAll(
    ".portfolio-item, .process-card, .about-card, .testimonial-card, .skill-item"
  );

  const revealObserver = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");
        }
      });
    },

    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((element) => {

    revealObserver.observe(element);
  });

  /* =========================================
     SKILLS ANIMATION
  ========================================= */

  const skillBars = document.querySelectorAll(".skill-bar span");

  const skillObserver = new IntersectionObserver(

    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          const bar = entry.target;

          const width = bar.style.width;

          bar.style.width = "0";

          setTimeout(() => {
            bar.style.width = width;
          }, 200);

          observer.unobserve(bar);
        }
      });
    },

    {
      threshold: 0.5,
    }
  );

  skillBars.forEach((bar) => {

    skillObserver.observe(bar);
  });

  /* =========================================
     CONTACT FORM
  ========================================= */

  const form = document.querySelector("form");

  if (form) {

    form.addEventListener("submit", async (e) => {

      e.preventDefault();

      const submitButton =
        form.querySelector("button");

      submitButton.innerText = "Sending...";

      try {

        const response = await fetch(form.action, {

          method: "POST",

          body: new FormData(form),

          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {

          submitButton.innerText =
            "Message Sent ✓";

          form.reset();

          setTimeout(() => {

            submitButton.innerText =
              "Send Message";

          }, 3000);

        } else {

          submitButton.innerText =
            "Something Went Wrong";
        }

      } catch (error) {

        submitButton.innerText =
          "Network Error";
      }
    });
  }

  /* =========================================
     LOADER
  ========================================= */

  window.addEventListener("load", () => {

    const loader =
      document.querySelector(".loader");

    loader?.classList.add("loader-hidden");
  });

  /* =========================================
     NAVBAR BACKGROUND ON SCROLL
  ========================================= */

  const navbar =
    document.querySelector(".fixed-nav");

  window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

      navbar.style.background =
        "rgba(10,10,10,0.92)";

      navbar.style.borderBottom =
        "1px solid rgba(255,255,255,0.08)";

    } else {

      navbar.style.background =
        "rgba(10,10,10,0.7)";
    }
  });

  /* =========================================
     PORTFOLIO FILTER BUTTONS
  ========================================= */

  const filterButtons =
    document.querySelectorAll(".portfolio-filters button");

  filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");
    });
  });

});