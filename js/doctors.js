
document.addEventListener('DOMContentLoaded', function() {
    // Selectează câmpul de text pentru căutare folosind ID-ul său din HTML
    const searchInput = document.getElementById('doctorSearch');
    
    if (!searchInput) return;

    searchInput.addEventListener('keyup', function() {
        // Extrage textul introdus, îl transformă în litere mici și elimină spațiile inutile de la început și sfârșit
        const query = this.value.toLowerCase().trim();
        
        // Selectează toate cardurile de medici prezente pe ecran
        const cards = document.querySelectorAll('.doctor-card');
        

        cards.forEach(card => {
            // Extrage tot textul vizibil din card (nume, specialitate, etc.) și îl transformă în litere mici
            const cardContent = card.textContent.toLowerCase();
            
            // Verifică dacă textul din card conține cuvântul sau literele căutate
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
