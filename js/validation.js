document.addEventListener('DOMContentLoaded', function() {
    
    const dateInput = document.getElementById('bookingDate') || document.querySelector('input[type="date"]');
    
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        
        const minDate = `${year}-${month}-${day}`;
        dateInput.setAttribute('min', minDate);
    }

    const forms = document.querySelectorAll('.needs-validation, #bookingForm, #contactForm');

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let isValid = true;

            form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
            form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

            const showError = (input, message) => {
                isValid = false;
                input.classList.add('is-invalid');
                
                let errorDiv = document.createElement('div');
                errorDiv.className = 'invalid-feedback';
                errorDiv.innerText = message;
                input.parentNode.appendChild(errorDiv);
            };

            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    showError(field, "Acest câmp este obligatoriu.");
                }
            });

            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    showError(emailInput, "Introdu o adresă de email validă (ex: nume@domeniu.com).");
                }
            }

            const phoneInput = form.querySelector('input[type="tel"]') || form.querySelector('#phone');
            if (phoneInput && phoneInput.value.trim()) {
                const curatat = phoneInput.value.replace(/\s+/g, '');
                const phoneRegex = /^\d{8}$/; 
                
                if (!phoneRegex.test(curatat)) {
                    showError(phoneInput, "Introdu un număr de telefon valid format din 8 cifre.");
                }
            }

            if (!isValid) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault(); 
                
                form.classList.add('was-validated');
                
                alert("Solicitarea a fost transmisă cu succes! Vă mulțumim!");
                
                form.reset();
                form.classList.remove('was-validated');
            }
            // -----------------------------------------------------
        });
    });
});
