
function adicionarAtividade() {
    var descricao = document.getElementById('descricao').value.trim();
    var dataEntrega = document.getElementById('dataEntrega').value.trim();
    var anexo = document.getElementById('anexo').files[0];

    if(descricao === "" && dataEntrega === ""){
        alert('Campo descricão ou data entrega vazios..')
    }
    else {
        var atividade = {
            descricao: descricao,
            dataEntrega: dataEntrega,
            anexo: anexo ? anexo.name : null
        };

        var atividades = JSON.parse(localStorage.getItem('atividades')) || [];
        atividades.push(atividade);
        localStorage.setItem('atividades', JSON.stringify(atividades));


        document.getElementById('descricao').value = '';
        document.getElementById('dataEntrega').value = '';
        document.getElementById('anexo').value = ''; 
    }

    document.getElementById('listaAtividades').style.display = 'none';
}


function exibirAtividades() {
    document.getElementById('listaAtividades').style.display = 'none';

    var tabelaAtividades = document.getElementById('tabelaAtividades');
    var tbody = tabelaAtividades.querySelector('tbody');
    tbody.innerHTML = ''; 

    var atividades = JSON.parse(localStorage.getItem('atividades')) || [];

    atividades.forEach(function(atividade, index) {
        var row = tbody.insertRow();

        // Colunas da tabela
        var descricaoCell = row.insertCell(0);
        descricaoCell.innerHTML = atividade.descricao;

        var dataEntregaCell = row.insertCell(1);
        dataEntregaCell.innerHTML = atividade.dataEntrega;

        var anexoCell = row.insertCell(2);
        anexoCell.innerHTML = atividade.anexo || 'Nenhum arquivo anexado';

        var acoesCell = row.insertCell(3);
        var editarButton = document.createElement('button');
        editarButton.innerHTML = 'Editar';
        editarButton.onclick = function() {
            editarAtividade(index);
        };
        acoesCell.appendChild(editarButton);

        var excluirButton = document.createElement('button');
        excluirButton.innerHTML = 'Excluir';
        excluirButton.onclick = function() {
            excluirAtividade(index);
        };
        acoesCell.appendChild(excluirButton);
    });

    var listaAtividades = document.getElementById('listaAtividades');
    if (atividades.length > 0) {
        listaAtividades.style.display = 'block'; 
    } else {
        listaAtividades.style.display = 'none'; 
    }
}

function editarAtividade(index) {

    var atividades = JSON.parse(localStorage.getItem('atividades')) || [];
    var atividade = atividades[index];

    document.getElementById('descricao').value = atividade.descricao;
    document.getElementById('dataEntrega').value = atividade.dataEntrega;
    atividades.splice(index, 1);

    localStorage.setItem('atividades', JSON.stringify(atividades));

    exibirAtividades();
}

function excluirAtividade(index) {
    var atividades = JSON.parse(localStorage.getItem('atividades')) || [];
    atividades.splice(index, 1);
    localStorage.setItem('atividades', JSON.stringify(atividades));

    exibirAtividades();
}

function listarAtividades() {
    var listaAtividades = document.getElementById('listaAtividades');
    var atividades = JSON.parse(localStorage.getItem('atividades')) || [];

    if (atividades.length == 0) {
        alert('Não há atividades para listar.');
    } else {
        listaAtividades.style.display = 'block';
        exibirAtividades();
    }
}

