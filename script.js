/**
 * ARYAN'S TECH BLOG - ADVANCED CORE ENGINE
 * This script handles dynamic loading, theme persistence, and UI effects.
 */

class TechBlog {
    constructor() {
        this.init();
    }

    init() {
        this.handleTheme();
        this.handleMobileMenu();
        this.observeScroll();
        this.setupSearch();
        this.updateYear();
    }

    // 1. PERSISTENT DARK MODE
    handleTheme() {
        const themeBtn = document.getElementById('themeToggle');
        if (!themeBtn) return;

        const savedTheme = localStorage.getItem('site-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(themeBtn, savedTheme);

        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('site-theme', target);
            this.updateThemeIcon(themeBtn, target);
        });
    }

    updateThemeIcon(btn, theme) {
        btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }

    // 2. MODERN INTERSECTION OBSERVER (Fade-in effects)
    observeScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card, .post, header').forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    // 3. LIVE SEARCH FILTERING
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.card, .post');

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(term) ? 'block' : 'none';
            });
        });
    }

    // 4. MOBILE NAVIGATION
    handleMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const nav = document.getElementById('primaryNav');
        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                const isOpen = nav.classList.toggle('open');
                toggle.setAttribute('aria-expanded', isOpen);
            });
        }
    }

    updateYear() {
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', () => new TechBlog());
document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal on Scroll Logic
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    // 2. Dynamic Image Loading
    // This helps placeholder images load smoothly
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => img.style.opacity = "1");
        img.style.transition = "opacity 0.5s ease";
    });
});
// Add to script.js
window.addEventListener('scroll', () => {
    if (window.innerWidth > 1024) {
        const scrolled = window.scrollY;
        const heroImg = document.querySelector('.hero-img');
        if(heroImg) {
            heroImg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});
const fsToggle = document.getElementById('fsToggle');

fsToggle.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message}`);
    });
    fsToggle.textContent = '📂 Exit Full';
  } else {
    document.exitFullscreen();
    fsToggle.textContent = '🖥️ Full View';
  }
});
const themeBtn = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// 1. Load the user's preference on startup
const savedTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);

// 2. Toggle on click
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Saves it for other pages
  });
}

    // 1. Run this IMMEDIATELY (at the top of the script)
    const html = document.documentElement;
    const current = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', current);

    // 2. Wait for the button to load
    window.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('themeToggle');
        
        if (btn) {
            btn.addEventListener('click', () => {
                const now = html.getAttribute('data-theme');
                const next = now === 'dark' ? 'light' : 'dark';
                
                html.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
                
                // Optional: Update the icon based on theme
                btn.innerHTML = next === 'dark' ? '☀️' : '🌙';
            });
        }
    });

document.addEventListener('DOMContentLoaded', async () => {
    const postContainer = document.getElementById('dynamicPosts');
    const searchInput = document.getElementById('mainSearch');
    const loader = document.getElementById('loader');
    
    // 1. DATA FETCHING (Simulating a Backend API)
    let allPosts = [];
    try {
        // In a real project, you'd fetch('data.json')
        // Here, we'll simulate the data for immediate use:
        allPosts = [
            { title: "AI Neural Networks", cat: "AI", img: "https://picsum.photos/id/0/800/500", desc: "deep dive into 2026 AI." },
            { title: "Mastering React 19", cat: "WebDev", img: "https://picsum.photos/id/1/800/500", desc: "The future of frontend." },
            { title: "Cybersecurity 101", cat: "Security", img: "https://picsum.photos/id/2/800/500", desc: "Protecting local data." }
        ];
    } catch (e) { console.error("Data error", e); }

    // 2. RENDERING FUNCTION
    const renderPosts = (data) => {
        postContainer.innerHTML = data.map(post => `
            <article class="post reveal">
                <img src="${post.img}" alt="img">
                <div class="post-content" style="padding:20px">
                    <span class="tag">${post.cat}</span>
                    <h3>${post.title}</h3>
                    <p>${post.desc}</p>
                </div>
            </article>
        `).join('');
    };

    // 3. LIVE SEARCH LOGIC
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allPosts.filter(p => 
            p.title.toLowerCase().includes(term) || 
            p.cat.toLowerCase().includes(term)
        );
        renderPosts(filtered);
    });

    // 4. THEME TOGGLE (Persistent)
    const themeBtn = document.getElementById('themeToggle');
    themeBtn.onclick = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const next = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    };

    // INIT
    setTimeout(() => {
        loader.style.display = 'none';
        renderPosts(allPosts);
        document.getElementById('count').innerText = allPosts.length;
    }, 1500); // Simulated Loading
});

// Scroll Reveal Animation
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.post').forEach(post => {
    post.classList.add('reveal-init');
    observer.observe(post);
});
document.addEventListener('DOMContentLoaded', () => {
    const pills = document.querySelectorAll('.pill');
    const posts = document.querySelectorAll('.post');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // 1. Update UI: Remove 'active' class from all, add to clicked
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filterValue = pill.getAttribute('data-filter');

            // 2. Filter Logic
            posts.forEach(post => {
                const postTag = post.getAttribute('data-tags');

                // If 'all' is selected OR the tag matches
                if (filterValue === 'all' || postTag === filterValue) {
                    post.style.display = 'flex'; // Or 'block' depending on your CSS
                    // Add a small delay for a smooth 'reveal' animation
                    setTimeout(() => {
                        post.style.opacity = '1';
                        post.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    post.style.display = 'none';
                    post.style.opacity = '0';
                    post.style.transform = 'translateY(20px)';
                }
            });
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('articleModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    // 1. Attach click listeners to ALL "Read More" buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-more-btn') || e.target.closest('.read-more-btn')) {
            e.preventDefault();
            
            // Find the parent post card
            const post = e.target.closest('.post');
            const title = post.querySelector('h3').innerText;
            const content = post.querySelector('p').innerText;
            const imgSrc = post.querySelector('img').src;

            // 2. Inject content into the Modal
            modalBody.innerHTML = `
                <img src="${imgSrc}" style="width:100%; border-radius:15px; margin-bottom:20px;">
                <h1 style="margin-bottom:15px;">${title}</h1>
                <p style="font-size:1.1rem; line-height:1.6;">${content} ... This is the full technical deep dive for the ${title} article. In a real project, this data could come from your data.json file.</p>
                <br>
                <button class="btn-primary" onclick="document.getElementById('articleModal').style.display='none'">Finish Reading</button>
            `;

            // 3. Show Modal
            modal.style.display = 'flex';
        }
    });

    // 4. Close Modal logic
    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
});
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('articleModal');
    const modalContent = document.getElementById('modalContent');

    // Attach the listener to the entire posts container
    const container = document.querySelector('.posts') || document.querySelector('.posts-grid');

    if (container) {
        container.addEventListener('click', (e) => {
            // This finds the closest article, even if you click an image or a button
            const post = e.target.closest('.post');
            
            if (post) {
                e.preventDefault();

                // Extract data with fallbacks (so it doesn't break if a class is missing)
                const title = post.querySelector('h3')?.innerText || "Untitled Post";
                const img = post.querySelector('img')?.src || "https://via.placeholder.com/600x400";
                const description = post.querySelector('p')?.innerText || "No description available.";
                const category = post.querySelector('.post-category')?.innerText || "General";

                // Inject into Modal
                modalContent.innerHTML = `
                    <div style="padding: 10px;">
                        <img src="${img}" style="width:100%; border-radius:15px; max-height:350px; object-fit:cover;">
                        <span class="badge" style="display:inline-block; margin-top:20px; background:var(--primary); color:white; padding:4px 12px; border-radius:50px; font-size:0.8rem;">${category}</span>
                        <h1 style="margin:15px 0; font-size:2rem; line-height:1.2;">${title}</h1>
                        <hr style="opacity:0.1; margin:20px 0;">
                        <p style="font-size:1.1rem; line-height:1.7; color:var(--text); opacity:0.9;">${description}</p>
                        <p style="margin-top:20px; line-height:1.7;">
                            This content is dynamically rendered using JavaScript Event Delegation. 
                            In a professional environment, this demonstrates efficient memory management 
                            by using a single event listener for multiple elements.
                        </p>
                    </div>
                `;

                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }
});
// Close modal with 'Esc' key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('articleModal');
    const modalContent = document.getElementById('modalContent');
    const loader = document.getElementById('topLoader');

    document.addEventListener('click', (e) => {
        const post = e.target.closest('.post');
        
        if (post) {
            e.preventDefault();

            // 1. START PROGRESS LOADER
            loader.style.width = '30%';
            
            setTimeout(() => {
                loader.style.width = '70%';
                
                // 2. FETCH DATA FROM CARD
                const title = post.querySelector('h3')?.innerText || "Article";
                const img = post.querySelector('img')?.src || "";
                const desc = post.querySelector('p')?.innerText || "";
                const tag = post.getAttribute('data-tags')?.split(' ')[0] || "Tech";

                // 3. INJECT & FINISH LOADER
                modalContent.innerHTML = `
                    <div class="modal-view">
                        <img src="${img}" style="width:100%; border-radius:12px; height:300px; object-fit:cover;">
                        <h2 style="margin-top:20px; font-size:2rem;">${title}</h2>
                        <span class="badge" style="background:var(--primary); color:white; padding:4px 12px; border-radius:50px; font-size:0.8rem;">${tag.toUpperCase()}</span>
                        <p style="margin-top:20px; line-height:1.8; opacity:0.8;">${desc}</p>
                        <div style="margin-top:30px; padding:20px; background:rgba(0,0,0,0.05); border-radius:10px;">
                            <strong>Developer Note:</strong> This view is generated via a centralized state-handler, proving modularity in the source code.
                        </div>
                    </div>
                `;

                loader.style.width = '100%';
                
                // 4. SHOW MODAL
                setTimeout(() => {
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    loader.style.width = '0'; // Reset for next time
                }, 200);
                
            }, 400); // Simulated "fetch" delay
        }
    });
});
