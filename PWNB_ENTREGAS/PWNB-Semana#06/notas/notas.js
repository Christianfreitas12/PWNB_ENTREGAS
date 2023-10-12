const materiasSelect = document.getElementById("materias");
const notas = document.querySelectorAll(".nota");

materiasSelect.addEventListener("change", function() {
    const selectedMateria = materiasSelect.value;

    notas.forEach(nota => {
        nota.style.display = "none";
    });

    document.getElementById(`nota-${selectedMateria}`).style.display = "block";
});