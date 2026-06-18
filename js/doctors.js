

document.addEventListener('DOMContentLoaded', function() {
    // Selectăm câmpul de căutare prin ID-ul său din HTML
    const searchInput = document.getElementById('doctorSearch');
    
    if (!searchInput) return;

    searchInput.addEventListener('keyup', function() {
        // Preluăm textul căutat și îl transformăm în litere mici pentru o căutare corectă
        const query = this.value.toLowerCase().trim();
        
        // Selectăm toate cardurile care au clasa '.doctor-card'
        const cards = document.querySelectorAll('.doctor-card');
        
        cards.forEach(card => {
            // Preluăm tot textul din interiorul cardului 
            const cardContent = card.textContent.toLowerCase();
            
            // Dacă textul căutat se află în interiorul cardului, îl afișăm, altfel îl ascundem
            if (cardContent.includes(query)) {
                
                card.style.display = "";
               
                card.style.opacity = "1";
                card.style.transition = "opacity 0.3s ease";
            } else {
                 card.style.display = "none";
            }
        });
    });
});