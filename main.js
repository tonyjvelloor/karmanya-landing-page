document.addEventListener('DOMContentLoaded', () => {
    // 1. Form Submission Handling (Web3Forms AJAX)
    const leadForm = document.getElementById('leadCaptureForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.querySelector('.submit-btn');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Change button text to show loading
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            const formData = new FormData(leadForm);
            
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    leadForm.reset();
                    leadForm.style.display = 'none';
                    formSuccess.classList.remove('hidden');
                } else {
                    console.error(response);
                    alert("Something went wrong! Please try calling us instead.");
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                console.error(error);
                alert("Something went wrong! Please try calling us instead.");
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // 2. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Open the clicked one if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 4. Scroll Exit Popup Logic (70% scroll depth)
    const scrollPopup = document.getElementById('scrollPopup');
    const closePopupBtn = document.querySelector('.close-popup');
    let popupShown = false;

    if (scrollPopup && closePopupBtn) {
        window.addEventListener('scroll', () => {
            if (popupShown) return;
            
            const scrollPosition = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            
            // Calculate if scrolled 70% down
            if (scrollPosition / (documentHeight - windowHeight) > 0.7) {
                scrollPopup.classList.add('show');
                scrollPopup.classList.remove('hidden');
                popupShown = true; // Only show once per session
            }
        });

        closePopupBtn.addEventListener('click', () => {
            scrollPopup.classList.remove('show');
            setTimeout(() => scrollPopup.classList.add('hidden'), 500);
        });
    }
    
    // 5. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
});
