document.addEventListener('DOMContentLoaded', () => {
    // 1. Form Submission to Google Sheets
    const form = document.getElementById('leadForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // NOTE: Replace this placeholder with the deployed Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyPsbTHLlJjdpxlqqgv0Pbp5pkoH6XoXCi8Y0iIt0HmYhahJ3cqoUB3Lbtleh4jEPUDnA/exec'; 

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Submitting...';
            submitBtn.disabled = true;

            if (scriptURL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                alert("Please add your Google Apps Script URL to main.js");
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    console.log('Success!', response);
                    window.location.href = "thank-you.html"; // Redirect on success
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert("There was an error submitting your request. Please try WhatsApp.");
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

    // 6. Dynamic Message Match from UTM / Query Parameters
    const adQ = window.__adQuery || (new URLSearchParams(window.location.search)).toString().toLowerCase();
    const headlineEl = document.querySelector('.main-headline');
    const subheadEl = document.querySelector('.sub-headline');
    const preheadEl = document.querySelector('.pre-headline');
    const concernSelect = document.querySelector('select[name="concern"]');

    if (headlineEl && adQ) {
        if (/knee|ghutn|janu|osteoarth|patell/.test(adQ)) {
            if (preheadEl) preheadEl.innerText = "Karmanya Ayurveda · Non-Surgical Knee Care Clinic · Pimple Saudagar, Pune";
            headlineEl.innerHTML = "Visit Our Ayurveda Clinic in Pimple Saudagar for <span class=\"text-gold\">Non-Surgical Knee Pain Relief.</span>";
            if (subheadEl) subheadEl.innerText = "Qualified BAMS doctors. Authentic Kerala Janu Basti & Patra Pinda Sweda for cartilage wear, stiffness & arthritis. Avoid knee surgery. Walk pain-free.";
            if (concernSelect) concernSelect.value = "knee";
        } else if (/sciatica|slip|disc|back|kamar|spine|lumbar|gridhrasi/.test(adQ)) {
            if (preheadEl) preheadEl.innerText = "Karmanya Ayurveda · Spine & Sciatica Decompression Clinic · Pimple Saudagar, Pune";
            headlineEl.innerHTML = "Visit Our Ayurveda Clinic in Pimple Saudagar for <span class=\"text-gold\">Non-Surgical Sciatica & Slip Disc Relief.</span>";
            if (subheadEl) subheadEl.innerText = "Qualified BAMS doctors. Authentic Kerala Kati Basti & classical nerve decompression for lumbar disc herniation & back stiffness. Avoid spinal surgery.";
            if (concernSelect) concernSelect.value = "back";
        } else if (/cervical|neck|shoulder|griva|spondylosis/.test(adQ)) {
            if (preheadEl) preheadEl.innerText = "Karmanya Ayurveda · Cervical & Neck Care Clinic · Pimple Saudagar, Pune";
            headlineEl.innerHTML = "Visit Our Ayurveda Clinic in Pimple Saudagar for <span class=\"text-gold\">Non-Surgical Cervical & Neck Pain Relief.</span>";
            if (subheadEl) subheadEl.innerText = "Relieve chronic desk neck strain, cervical spondylosis & radiating shoulder pain with classical Greeva Basti, Nasya & Kerala herbal fomentation.";
            if (concernSelect) concernSelect.value = "neck";
        }
    }
});
