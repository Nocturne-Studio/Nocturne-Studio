document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for navigation
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = document.querySelector(e.target.getAttribute('href'));
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Animated typing effect for hero text
  const heroText = document.querySelector('.hero-text p');
  const text = "A Multimedia Specialist's Journey Through Creativity";
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      heroText.textContent += text[index];
      index++;
      setTimeout(typeEffect, 100);
    }
  }

  typeEffect();

  // Load Portfolio from JSON
  async function loadPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const res = await fetch('portfolio.json');
    const projects = await res.json();

    projects.forEach(project => {
      const item = document.createElement('div');
      item.classList.add('portfolio-item');
      item.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">View Project</a>
      `;
      portfolioGrid.appendChild(item);
    });
  }

  loadPortfolio();

  // Load Blog Posts from Markdown
  async function loadBlogPosts() {
    const postsContainer = document.querySelector('.blog-posts');
    const posts = ['post1.md', 'post2.md']; // Add your posts here

    for (const post of posts) {
      const res = await fetch(`posts/${post}`);
      const markdown = await res.text();
      const html = new showdown.Converter().makeHtml(markdown);

      const article = document.createElement('article');
      article.classList.add('blog-post');
      article.innerHTML = html;
      postsContainer.appendChild(article);
    }
  }

  loadBlogPosts();

  // Search Blog Posts
  document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.blog-post').forEach(post => {
      const title = post.querySelector('h3').textContent.toLowerCase();
      post.style.display = title.includes(query) ? 'block' : 'none';
    });
  });

  // Dark Mode Toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
  });
});