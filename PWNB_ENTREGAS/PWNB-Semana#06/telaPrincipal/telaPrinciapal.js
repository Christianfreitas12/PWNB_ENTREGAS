const menuToggle = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
    menuToggle.style.zIndex = menu.classList.contains("show") ? "0" : "1";
});

document.addEventListener("click", (e) => {
if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
    menu.classList.remove("show");
    menuToggle.style.zIndex = "1";
}
});

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendario');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', 
        locale: 'pt-br', 
        events: [
            {
                title: 'Prova Fisica',
                start: '2023-10-10',
            },
            {
                title: 'Entrega de Atividade Matematica',
                start: '2023-10-15',
            },
        ],
    });

    calendar.render();
    });