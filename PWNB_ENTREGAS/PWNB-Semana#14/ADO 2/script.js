



function buscarEndereco() {
    const cepInput = document.getElementById("cep");
    const logradouroInput = document.getElementById("endereco");
    const cidadeInput = document.getElementById("cidade");
    const ufInput = document.getElementById("uf");

    const cepRegex = /^\d{5}-\d{3}$/;

    if (cepRegex.test(cepInput.value)) {
        const cep = cepInput.value.replace('-', '');

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert("CEP não encontrado.");
                } else {
                    logradouroInput.value = `${data.logradouro}`;
                    cidadeInput.value = `${data.localidade}`;
                    ufInput.value = `${data.uf}`;
                }
            })
            .catch(error => {
                console.error("Ocorreu um erro na solicitação: " + error);
            });
    } else {
        alert("CEP inválido. O formato deve ser nnnnn-ccc.");
    }
}

function formatarCEP() {
    var cepInput = document.getElementById('cep');
    var cepValue = cepInput.value;
    cepValue = cepValue.replace(/\D/g, '');

    if (cepValue.length > 5) {
      cepValue = cepValue.substring(0, 5) + '-' + cepValue.substring(5);
    }

    cepInput.value = cepValue;
}


function incluirCliente() {
    const { nome, sobrenome, nascimento, cidade, cep, uf, endereco, numero, tipoCliente } = resgatarDados();
    if (!nome || !sobrenome || !nascimento || !cidade || !cep || !uf || !endereco || !numero || !tipoCliente) {
        alert("Todos os campos devem ser preenchidos");
        return;
    }

    const cliente = {
        nome, sobrenome, nascimento, cidade, cep, uf, endereco, numero, tipoCliente
    };

    const clientes = JSON.parse(localStorage.getItem("IncluirClientes")) || [];
    clientes.push(cliente);
    localStorage.setItem("IncluirClientes", JSON.stringify(clientes));

    limparCampos();
    atualizarTabelaClientes();
}
  

function atualizarTabelaClientes() {
    const corpoTabelaClientes = document.getElementById("corpoTabelaClientes");
    corpoTabelaClientes.innerHTML = "";

    const clientes = JSON.parse(localStorage.getItem("IncluirClientes")) || [];

   clientes.forEach((cliente, index) => {
        const row = corpoTabelaClientes.insertRow();
        row.insertCell(0).textContent = cliente.nome;
        row.insertCell(1).textContent = cliente.cidade;
        row.insertCell(2).textContent = cliente.nascimento;
        row.insertCell(3).textContent = cliente.cidade;
        row.insertCell(4).textContent = cliente.cep;
        row.insertCell(5).textContent = cliente.uf;
        row.insertCell(6).textContent = cliente.endereco;
        row.insertCell(7).textContent = cliente.numero;
        row.insertCell(8).textContent = cliente.tipoCliente;

        const alterarButton = document.createElement("button");
        alterarButton.textContent = "Alterar";
        alterarButton.onclick = () => alterarCliente();
        row.insertCell(9).appendChild(alterarButton);

        const excluirButton = document.createElement("button");
        excluirButton.textContent = "Excluir";
        excluirButton.onclick = () => excluirCliente(index); 
        row.insertCell(10).appendChild(excluirButton);
    });
}


function resgatarDados() {
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const nascimento = document.getElementById("nascimento").value;
    const cidade = document.getElementById("cidade").value;
    const cep = document.getElementById("cep").value;
    const uf = document.getElementById("uf").value;
    const endereco = document.getElementById("endereco").value;
    const numero = document.getElementById("numero").value;
    const tipoCliente = document.getElementById("tipoCliente").value;
    
    return { nome, sobrenome, nascimento, cidade, cep, uf, endereco, numero, tipoCliente };
}


function obterIndiceClienteSelecionado() {
    const corpoTabelaClientes = document.getElementById("corpoTabelaClientes");
    const rows = corpoTabelaClientes.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].classList.contains("selecionado")) {
            return i;
        }
    }
    return -1;
}

function excluirCliente(index) {
    const clientes = JSON.parse(localStorage.getItem("IncluirClientes")) || [];

    if (index >= 0 && index < clientes.length) {
        clientes.splice(index, 1);
        localStorage.setItem("IncluirClientes", JSON.stringify(clientes));

        atualizarTabelaClientes();
        limparCampos();
    }
}

function limparCampos() {
    const campos = ["nome", "sobrenome", "nascimento", "cidade", "cep", "uf", "endereco", "numero", "tipoCliente"];

    campos.forEach(campo => {
        document.getElementById(campo).value = "";
    });
}


window.onload = function () {
    atualizarTabelaClientes();
};
