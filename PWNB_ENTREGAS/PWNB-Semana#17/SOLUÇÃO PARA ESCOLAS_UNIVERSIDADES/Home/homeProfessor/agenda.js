

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendario');
    const storedEvents = JSON.parse(localStorage.getItem('agendas')) || [];

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        events: storedEvents,
    });

    calendar.render();
});
