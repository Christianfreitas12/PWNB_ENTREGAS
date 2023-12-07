function exibirAtividades() {
    var tabelaAtividades = document.getElementById('tabelaAtividades');
    var tbody = tabelaAtividades.querySelector('tbody');
    tbody.innerHTML = ''; 

    var atividades = JSON.parse(localStorage.getItem('atividades')) || [];

    atividades.forEach(function(atividade, index) {
        var row = tbody.insertRow();

       
        var descricaoCell = row.insertCell(0);
        descricaoCell.innerHTML = atividade.descricao;

        var dataEntregaCell = row.insertCell(1);
        dataEntregaCell.innerHTML = atividade.dataEntrega;

        var anexoCell = row.insertCell(2);
        anexoCell.innerHTML = atividade.anexo || 'Nenhum arquivo anexado';        
    });
}

exibirAtividades();