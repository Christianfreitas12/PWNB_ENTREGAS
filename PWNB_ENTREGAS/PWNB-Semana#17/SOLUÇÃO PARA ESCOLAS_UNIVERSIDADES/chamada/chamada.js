function listarAtividades() {
    if (validarCampos()) {
        var listaAlunos = document.getElementById('listaAlunos');
  
        listaAlunos.style.display = 'block';
    }
}

function salvar(){
    location.reload();
}

function validarCampos() {
    var materia = document.getElementById('materia').value;
    var descricao = document.getElementById('descricao').value;
    var data = document.getElementById('data').value;

    if (materia === '' || descricao === '' || data === '') {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    var dataAtual = new Date();
    var dataSelecionada = new Date(data);
    
    var umaSemanaAntes = new Date(dataAtual);
    umaSemanaAntes.setDate(dataAtual.getDate() - 7);

    var umDiaDepois = new Date(dataAtual);
    umDiaDepois.setDate(dataAtual.getDate() + 1);

    if (dataSelecionada < umaSemanaAntes || dataSelecionada > umDiaDepois) {
        alert('A data deve estar dentro de uma semana para trás e um dia para frente em relação à data atual.');
        return false;
    }

    return true;
}