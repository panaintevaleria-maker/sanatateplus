document.addEventListener('DOMContentLoaded', function() {

    // 1. Smooth Scroll pentru link-urile interne (ancore)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Butonul Back to Top (Afișare / Ascundere / Comportament)
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('d-none');
                // Folosim requestAnimationFrame pentru a asigura fluiditatea opacității în browser
                requestAnimationFrame(() => { 
                    backToTopBtn.style.opacity = '1'; 
                });
            } else {
                backToTopBtn.style.opacity = '0';
                setTimeout(() => { 
                    if (window.scrollY <= 300) {
                        backToTopBtn.classList.add('d-none'); 
                    }
                }, 300); // Se ascunde după ce se termină tranziția de opacitate (0.3s)
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Contoare Animate (Statistici)
    const counters = document.querySelectorAll('.counter-number');
    
    const startCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            let count = 0;
    
            const duration = 2000; // Durata animației în milisecunde (2 secunde)
            const frameRate = 1000 / 60; // 60 cadre pe secundă
            const totalFrames = Math.round(duration / frameRate);
            
            const increment = target / totalFrames; 
            let frame = 0;

            const updateCount = () => {
                frame++;
                count += increment;

                if (frame < totalFrames) {
                    counter.innerText = Math.floor(count) + "+";
                    setTimeout(updateCount, frameRate);
                } else {
                    counter.innerText = target + "+";
                }
            };
            
            updateCount();
        });
    };

    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target); // Pornește animația o singură dată
                }
            });
        }, { threshold: 0.3 });

        const counterSection = counters[0].closest('section');
        if (counterSection) {
            observer.observe(counterSection);
        } else {
            startCounters();
        }
    }

    // 4. Slider Testimoniale (Carusel manual + automat)
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.remove('d-none');
                    slide.classList.add('active');
                } else {
                    slide.classList.add('d-none');
                    slide.classList.remove('active');
                }
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        // Schimbă automat testimonialul la fiecare 5 secunde
        const startAutoPlay = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetAutoPlay = () => {
            clearInterval(slideInterval);
            startAutoPlay();
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => { 
                nextSlide(); 
                resetAutoPlay(); 
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => { 
                prevSlide(); 
                resetAutoPlay(); 
            });
        }
        
        startAutoPlay();
    }
}); // <-- Aici lipsea paranteza de închidere a evenimentului DOMContentLoaded!