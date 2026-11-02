/* ============================================================
   WEDE5020 Web Development - Part 3 JavaScript
   Includes: Lightbox Gallery, Dynamic Search Filter, Form Validation
   ============================================================ */

// The 'DOMContentLoaded' event ensures the HTML has fully loaded 
// before we try to attach event listeners or manipulate the DOM.
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LIGHTBOX GALLERY
    // ==========================================
    // Open Lightbox
    window.openLightbox = function (imageSrc) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        if (lightbox && lightboxImg) {
            lightbox.style.display = 'flex';
            lightboxImg.src = imageSrc;
        }
    };

    // Close Lightbox
    window.closeLightbox = function () {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.display = 'none';
        }
    };

    // ==========================================
    // 2. DYNAMIC SEARCH FILTER
    // ==========================================
    const searchInput = document.getElementById('searchInput');

    // Check if the search input exists on the current page
    if (searchInput) {
        searchInput.addEventListener('keyup', function () {
            // Get the search term and convert to lowercase for case-insensitive matching
            const filter = this.value.toLowerCase();

            // Get all the animal cards in the listing
            const animalCards = document.querySelectorAll('.animal-card');

            // Loop through each card and check if the text matches the search
            animalCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(filter)) {
                    // Show the card if it matches
                    card.style.display = '';
                } else {
                    // Hide the card if it doesn't match
                    card.style.display = 'none';
                }
            });
        });
    }

    // ==========================================
    // 3. FORM VALIDATION (Enquiry & Contact)
    // ==========================================
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            // Prevent the form from submitting normally to the server
            e.preventDefault();

            let isValid = true;
            const requiredInputs = form.querySelectorAll('[required]');

            // Clear any previous error messages and red borders
            form.querySelectorAll('.error-msg').forEach(msg => msg.remove());
            form.querySelectorAll('input, textarea').forEach(input => input.style.border = '');

            // Check each required input
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    // Highlight the empty field with a red border
                    input.style.border = '2px solid red';

                    // Create and insert an error message next to the field
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-msg';
                    errorMsg.style.color = 'red';
                    errorMsg.style.fontSize = '0.85rem';
                    errorMsg.style.display = 'block';
                    errorMsg.style.marginBottom = '10px';
                    errorMsg.textContent = ' This field is required.';

                    // Insert the error message right after the input
                    input.parentNode.insertBefore(errorMsg, input.nextSibling);
                }
            });

            // If all fields are filled, simulate a successful submission
            if (isValid) {
                alert('Form submitted successfully! (Demo)');
                form.reset(); // Clear the form
            }
        });
    });

});