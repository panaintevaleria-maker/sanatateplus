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

    // Identifică și selectează toate formularele ce necesită validare la trimitere.
    const forms = document.querySelectorAll('.needs-validation, #bookingForm, #contactForm');

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let isValid = true;

            // Resetează stările și șterge mesajele de eroare  din încercările anterioare.
            form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
            form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

            // Definește o funcție reutilizabilă pentru injectarea mesajelor de avertizare în interfață.
            const showError = (input, message) => {
                isValid = false;
                input.classList.add('is-invalid');
                
                let errorDiv = document.createElement('div');
                errorDiv.className = 'invalid-feedback';
                errorDiv.innerText = message;
                input.parentNode.appendChild(errorDiv);
            };

            // Verifică dacă utilizatorul a lăsat necompletate câmpurile marcate drept obligatorii.
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    showError(field, "Acest câmp este obligatoriu.");
                }
            });

            // Analizează structura sintactică a adresei de email folosind o expresie regulată.
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    showError(emailInput, "Introdu o adresă de email validă (ex: nume@domeniu.com).");
                }
            }

            //  Validează numărul de telefon eliminând spațiile și impunând lungimea de 8 cifre.
            const phoneInput = form.querySelector('input[type="tel"]') || form.querySelector('#phone');
            if (phoneInput && phoneInput.value.trim()) {
                const curatat = phoneInput.value.replace(/\s+/g, '');
                const phoneRegex = /^\d{8}$/; 
                
                if (!phoneRegex.test(curatat)) {
                    showError(phoneInput, "Introdu un număr de telefon valid format din 8 cifre.");
                }
            }

            //  Blochează expedierea dacă există erori, altfel confirmă succesul și resetează formularul.
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
        });
    });
});
