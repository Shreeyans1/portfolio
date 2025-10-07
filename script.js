// Smooth scrolling for nav links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const skillLevels = document.querySelectorAll(".skill-level");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const value = bar.getAttribute("data-skill");
      bar.style.width = value;
    }
  });
}, { threshold: 0.4 });

skillLevels.forEach(level => observer.observe(level));



