function adicionarAgenda() {
    var descricao = document.getElementById('descricao').value.trim();
    var data = document.getElementById('data').value.trim();

    if (descricao === "" && data === "") {
        alert('Campo descrição ou data vazios..');
    } else {
        var novaAgenda = {
            title: descricao,
            start: data
        };

        var agendas = JSON.parse(localStorage.getItem('agendas')) || [];
        agendas.push(novaAgenda);
        localStorage.setItem('agendas', JSON.stringify(agendas));

        document.getElementById('descricao').value = '';
        document.getElementById('data').value = '';
    }
}

function exibirAtividades() {
    document.getElementById('listaEventos').style.display = 'none';

    var listaEventos = document.getElementById('tabelaEventos');
    var tbody = listaEventos.querySelector('tbody');
    tbody.innerHTML = ''; 

    var eventos = JSON.parse(localStorage.getItem('agendas')) || [];

    eventos.forEach(function(evento, index) {
        var row = tbody.insertRow();

        var descricaoCell = row.insertCell(0);
        descricaoCell.innerHTML = evento.title;

        var dataEntregaCell = row.insertCell(1);
        dataEntregaCell.innerHTML = evento.start;

        var acoesCell = row.insertCell(2);
        var editarButton = document.createElement('button');
        editarButton.innerHTML = 'Editar';
        editarButton.onclick = function() {
            editarEvento(index);
        };
        acoesCell.appendChild(editarButton);

        var excluirButton = document.createElement('button');
        excluirButton.innerHTML = 'Excluir';
        excluirButton.onclick = function() {
            excluirEvento(index);
        };
        acoesCell.appendChild(excluirButton);
    });

    var listaEventos = document.getElementById('listaEventos');
    if (eventos.length > 0) {
        listaEventos.style.display = 'block'; 
    } else {
        listaEventos.style.display = 'none'; 
    }
}

function editarEvento(index) {
    var eventos = JSON.parse(localStorage.getItem('agendas')) || [];
    var evento = eventos[index];

    document.getElementById('descricao').value = evento.title; 
    document.getElementById('data').value = evento.start; 
    eventos.splice(index, 1);

    localStorage.setItem('agendas', JSON.stringify(eventos));

    exibirAtividades();
}

function excluirEvento(index) {
    var eventos = JSON.parse(localStorage.getItem('agendas')) || [];
    eventos.splice(index, 1);
    localStorage.setItem('agendas', JSON.stringify(eventos));

    exibirAtividades();
}

function listarAtividades() {
    var listaEventos = document.getElementById('listaEventos');
    var eventos = JSON.parse(localStorage.getItem('agendas')) || [];

    if (eventos.length == 0) {
        alert('Não há eventos para listar.');
    } else {
        listaEventos.style.display = 'block';
        exibirAtividades();
    }
}
