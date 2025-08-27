document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('nav ul li a, .fixed-nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Hero buttons scroll behavior
  const viewWorkBtn = document.querySelector('.primary');
  const contactBtn = document.querySelector('.secondary');

  viewWorkBtn?.addEventListener('click', () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  });

  contactBtn?.addEventListener('click', () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Animate skills bars on scroll into view
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.skill;
        entry.target.style.transition = 'width 1.5s ease-in-out';
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const navlinks = document.getElementById("nav-links");
  const navLinkItems = document.querySelectorAll(".nav-link");

  if (hamburger && navlinks) {
    const toggleMenu = () => {
      hamburger.classList.toggle("active");
      navlinks.classList.toggle("active");
      document.body.classList.toggle("no-scroll"); // prevent background scroll on mobile
    };

    hamburger.addEventListener("click", toggleMenu);

    navLinkItems.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navlinks.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });

    // Auto-reset menu if resized back to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        hamburger.classList.remove("active");
        navlinks.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    });
  }

  // Contact form handling
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      }).then(response => {
        if (response.ok) {
          document.getElementById("success-message").style.display = "block";
          form.reset();
        } else {
          alert("Something went wrong. Please try again.");
        }
      });
    });
  }

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section');
  const fixedNavLinks = document.querySelectorAll('.fixed-nav ul li a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    fixedNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Dark Mode Toggle
  const darkToggle = document.querySelector('.dark-mode-toggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    });

    // Load preference
    if (localStorage.getItem('dark-mode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }

  // Section fade-in animation on scroll
  const checkSectionVisibility = () => {
    const triggerBottom = window.innerHeight / 5 * 4;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  };

  window.addEventListener('scroll', checkSectionVisibility);
  checkSectionVisibility(); // Init on load
});
