// Formcarry Configuration
const FORMCARRY_CONFIG = {
    // Your Formcarry form ID
    formId: '5zQ6X2hYLyA',

    // Base Formcarry URL
    baseUrl: 'https://formcarry.com/s/',

    // Form submission settings
    settings: {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }
};

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
});

function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.action = FORMCARRY_CONFIG.baseUrl + FORMCARRY_CONFIG.formId;
        setupFormSubmission(contactForm);
    }

    // Complaints form (using same Formcarry form ID unless you have a different one)
    const complaintsForm = document.getElementById('complaint-form');
    if (complaintsForm) {
        complaintsForm.action = FORMCARRY_CONFIG.baseUrl + FORMCARRY_CONFIG.formId;
        setupFormSubmission(complaintsForm);
    }
}

function setupFormSubmission(form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Thank you! Your submission has been received.');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert('Sorry, there was an error submitting your form. Please try again.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}
