/* =========================================
   script.js - Main JavaScript File
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    /* -----------------------------------------
       1. Mobile Menu Toggle
       ----------------------------------------- */
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-links');

    if (menu && menuLinks) {
        menu.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuLinks.classList.toggle('active');
        });
    }

    /* -----------------------------------------
       2. Dynamic Custom Modal Creation
       ----------------------------------------- */
    // Create the modal HTML structure using JS so we don't have to edit every HTML file
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
    
    // Inject it into the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeModalBtn');

    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        // Optional: Reset button text back to normal after closing
        const btn = document.querySelector('.btn-submit');
        if (btn) {
            setTimeout(() => {
                btn.textContent = "Send Inquiry";
                btn.style.background = "transparent";
                btn.style.color = "#D4AF37";
            }, 500);
        }
    }

    // Close event listeners
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(); // Close if clicking outside the box
        });
    }

    /* -----------------------------------------
       3. Contact Form Handling
       ----------------------------------------- */
    const inquiryForm = document.getElementById('inquiryForm');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // 1. Visual Feedback on Button
            const btn = document.querySelector('.btn-submit');
            if (btn) {
                btn.textContent = "Sending...";
                btn.style.background = "#D4AF37";
                btn.style.color = "#001233";
            }

            // 2. Simulate Delay (Network request), then show Modal
            setTimeout(() => {
                if (btn) btn.textContent = "Message Sent!";
                this.reset();
                
                // Show Custom Modal instead of alert
                modal.classList.add('active');
            }, 1000); 
        });
    }

    /* -----------------------------------------
       4. Active Page Highlight
       ----------------------------------------- */
    // Get the current page filename (e.g., 'about.html')
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        // Check if the link matches the current page
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    /* -----------------------------------------
       5. Scroll to Top Button
       ----------------------------------------- */
    // Create the button dynamically
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    // Show button when scrolling down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Scroll up when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});