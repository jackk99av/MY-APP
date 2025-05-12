document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // Hero buttons scroll behavior
    const viewWorkBtn = document.querySelector('.primary');
    const contactBtn = document.querySelector('.secondary');
  
    viewWorkBtn.addEventListener('click', () => {
      const portfolioSection = document.getElementById('portfolio');
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    });
  
    contactBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  
    // Optional: animate skills bars on scroll into view
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = '80%'; // Customize skill bar fill
          entry.target.style.transition = 'width 1.5s ease-in-out';
        }
      });
    }, {
      threshold: 0.5
    });
  
    skillBars.forEach(bar => skillObserver.observe(bar));
    entry.target.style.width = entry.target.dataset.skill;

  });
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default form behavior
  
    const form = e.target;
  
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    }).then(response => {
      if (response.ok) {
        document.getElementById("success-message").style.display = "block";
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    });
  });
  const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.fixed-nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
// Dark Mode Toggle
document.querySelector('.dark-mode-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Section Animation on Scroll

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

// Initialize scroll
checkSectionVisibility();

  