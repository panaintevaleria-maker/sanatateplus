
const bookingDoctors = [
    { id: "dc1", name: "Dr. Andrei Mureșan", specialty: "cardiologie" },
    { id: "dc2", name: "Dr. Camelia Nuță", specialty: "dermatologie" },
    { id: "dc3", name: "Dr. Radu Popescu", specialty: "neurologie" },
    { id: "dc4", name: "Dr. Sorin Ionel", specialty: "orl" },
    { id: "dc5", name: "Dr. Diana Groza", specialty: "endocrinologie" },
    { id: "dc6", name: "Dr. Elena Vasilescu", specialty: "pediatrie" },
    { id: "dc7", name: "Dr. Mihai Avram", specialty: "imagistica" },
    { id: "dc8", name: "Dr. Laura Stancu", specialty: "alergologie" }
];

document.addEventListener("DOMContentLoaded", function () {
    // Selectarea elementelor cheie din formular folosind ID-urile lor din HTML
    const specialtySelect = document.getElementById("bookingSpecialty");
    const doctorSelect = document.getElementById("bookingDoctor");
    const bookingForm = document.getElementById("bookingForm");

    // Secvență pentru actualizarea listei de medici la schimbarea specialității
    if (specialtySelect && doctorSelect) {
        specialtySelect.addEventListener("change", function () {
            const selectedSpecialty = this.value; 
            updateDoctorsDropdown(selectedSpecialty, doctorSelect); 
        });
    }

    // Secvență pentru gestionarea trimiterii formularului (Submit) și validarea acestuia
    if (bookingForm) {
        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault(); 
            
            // Verifică dacă toate câmpurile obligatorii din HTML5 sunt completate corect
            if (!this.checkValidity()) {
                e.stopPropagation(); 
                this.classList.add('was-validated'); 
            } else {
                handleBookingSubmit(this);
            }
        });
    }
});
function updateDoctorsDropdown(specialty, doctorDropdown) {
    // Resetează lista de medici și adaugă opțiunea implicită dezactivată
    doctorDropdown.innerHTML = '<option value="" selected disabled>Alege medicul...</option>';
    
    // Dacă utilizatorul a resetat câmpul sau nu a ales nicio specialitate, blochează lista de medici
    if (!specialty) {
        doctorDropdown.disabled = true;
        return;
    }
    const filteredDoctors = bookingDoctors.filter(doc => doc.specialty === specialty);

    filteredDoctors.forEach(doc => {
        const option = document.createElement("option");
        option.value = doc.id;         
        option.textContent = doc.name;   
        doctorDropdown.appendChild(option);
    });

    doctorDropdown.disabled = filteredDoctors.length === 0;
}


function handleBookingSubmit(form) {
    const patientName = document.getElementById("patientName").value;
    const bookingDate = document.getElementById("bookingDate").value;
    const bookingTime = document.getElementById("bookingTime").value;
    
    const doctorSelect = document.getElementById("bookingDoctor");
    const doctorName = doctorSelect.options[doctorSelect.selectedIndex] ? doctorSelect.options[doctorSelect.selectedIndex].text : "Nespecificat";

    const container = form.parentElement;

    // Generarea unui cod aleatoriu de programare (ex: SP-4829) format din litere și 4 cifre
    const bookingCode = "SP-" + Math.floor(1000 + Math.random() * 9000);

    // Înlocuirea completă a codului HTML din container cu șablonul biletului de confirmare
    container.innerHTML = `
        <div class="card border-0 shadow text-center p-5 animate__animated animate__fadeIn">
            <div class="mb-4 text-success">
                <i class="bi bi-calendar-check-fill" style="font-size: 4rem;"></i>
            </div>
            <h3 class="fw-bold text-dark mb-2">Programare Confirmată!</h3>
            <p class="text-muted">Vă mulțumim, <strong>${patientName}</strong>. Solicitarea dumneavoastră a fost procesată cu succes.</p>
            
            <div class="bg-light p-4 rounded-3 text-start mx-auto my-4 border" style="max-width: 450px;">
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-secondary">Cod Programare:</span>
                    <strong class="text-primary">${bookingCode}</strong>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-secondary">Medic:</span>
                    <strong class="text-dark">${doctorName}</strong>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-secondary">Data:</span>
                    <strong class="text-dark">${bookingDate}</strong>
                </div>
                <div class="d-flex justify-content-between">
                    <span class="text-secondary">Ora:</span>
                    <strong class="text-dark">${bookingTime}</strong>
                </div>
            </div>

            <p class="small text-muted"><i class="bi bi-info-circle"></i> Un SMS și un e-mail cu detaliile vizitei au fost trimise automat.</p>
            
            <div class="mt-2">
                <a href="index.html" class="btn btn-outline-primary rounded-pill px-4 me-2">Acasă</a>
                <button onclick="window.print()" class="btn btn-primary rounded-pill px-4"><i class="bi bi-printer"></i> Printează biletul</button>
            </div>
        </div>
    `;
}
