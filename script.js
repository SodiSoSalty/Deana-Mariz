document.addEventListener('DOMContentLoaded', () => {

    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-links');

    if (menu && menuLinks) {
        menu.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuLinks.classList.toggle('active');
        });
    }

    const modalHTML = `
        <div id="successModal" class="custom-modal-overlay">
            <div class="custom-modal">
                <div class="modal-icon"><i class="fa-regular fa-circle-check"></i></div>
                <h2>Inquiry Received</h2>
                <p>Thank you for reaching out. Deana Mariz will review your message and get back to you shortly.</p>
                <button class="modal-close-btn" id="closeModalBtn">Close</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeModalBtn');

    function closeModal() {
        modal.classList.remove('active');
        const btn = document.querySelector('.btn-submit');
        if (btn) {
            setTimeout(() => {
                btn.textContent = "Send Inquiry";
                btn.style.background = "transparent";
                btn.style.color = "#D4AF37";
            }, 500);
        }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    const inquiryForm = document.getElementById('inquiryForm');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const btn = document.querySelector('.btn-submit');
            if (btn) {
                btn.textContent = "Sending...";
                btn.style.background = "#D4AF37";
                btn.style.color = "#001233";
            }

            setTimeout(() => {
                if (btn) btn.textContent = "Message Sent!";
                this.reset();
                
                modal.classList.add('active');
            }, 1000); 
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});