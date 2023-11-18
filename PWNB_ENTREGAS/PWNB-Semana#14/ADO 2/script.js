

const cepRegex = /^\d{5}-\d{3}$/;

function buscarEndereco() {
    const cepInput = document.getElementById("cep");
    const logradouroInput = document.getElementById("endereco");
    const cidadeInput = document.getElementById("cidade");
    const ufInput = document.getElementById("uf");

    if (cepRegex.test(cepInput.value)) {
        const cep = cepInput.value.replace('-', '');

        //Logica para buscar as informações do CEP Na API via Json e preencher os campos automaticamnete
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


function incluirCliente() {
    const { nome, sobrenome, nascimento, cidade, cep, uf, endereco, numero, tipoCliente } = resgatarDados();
    if (!nome || !sobrenome || !nascimento || !cidade || !cep || !uf || !endereco || !numero || !tipoCliente) {
        alert("Todos os campos devem ser preenchidos");
        return;
    }

    const cliente = {
        nome,
        sobrenome,
        nascimento,
        cidade,
        cep,
        uf,
        endereco,
        numero,
        tipoCliente
    };

    const clientes = JSON.parse(localStorage.getItem("IncluirClientes")) || [];

    clientes.push(cliente);
    localStorage.setItem("IncluirClientes", JSON.stringify(clientes));

    //atualizarTabelaClientes();
    limparCampos();
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

function alterarCliente() {
    const { nome, sobrenome, nascimento, cidade, cep, uf, endereco, numero, tipoCliente } = resgatarDados();

    if (!nome || !sobrenome || !nascimento || !cidade || !cep || !uf || !endereco || !numero || !tipoCliente) {
        alert("Todos os campos devem ser preenchidos");
        return;
    }

    const index = obterIndiceClienteSelecionado();
    if (index !== -1) {
        const clientes = JSON.parse(localStorage.getItem("IncluirClientes")) || [];
        const cliente = clientes[index];

        // Atualiza os dados do cliente com os novos valores
        cliente.nome = nome;
        cliente.sobrenome = sobrenome;
        cliente.nascimento = nascimento;
        cliente.cidade = cidade;
        cliente.cep = cep;
        cliente.uf = uf;
        cliente.endereco = endereco;
        cliente.numero = numero;
        cliente.tipoCliente = tipoCliente;

        // Atualiza o localStorage com os dados modificados
        localStorage.setItem("IncluirClientes", JSON.stringify(clientes));

        // Atualiza a tabela de clientes e limpa os campos
        atualizarTabelaClientes();
        limparCampos();

        window.location.href = 'index.html';
    }
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



function preencherFormulario(index) {
    const clientes = JSON.parse(localStorage.getItem("clientes"));

    if (!clientes || index < 0 || index >= clientes.length) {
        console.error("Erro: Dados inválidos ou índice fora dos limites.");
        return;
    }

    const cliente = clientes[index];

    // Atualiza os valores no formulário
    document.getElementById("nome").value = cliente.nome;
    document.getElementById("sobrenome").value = cliente.sobrenome;
    document.getElementById("nascimento").value = cliente.nascimento;
    document.getElementById("cidade").value = cliente.cidade;
    document.getElementById("cep").value = cliente.cep;
    document.getElementById("uf").value = cliente.uf;
    document.getElementById("endereco").value = cliente.endereco;
    document.getElementById("numero").value = cliente.numero;
    document.getElementById("tipoCliente").value = cliente.tipoCliente;

    const corpoTabelaClientes = document.getElementById("corpoTabelaClientes");
    const rows = corpoTabelaClientes.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("selecionado");
    }

    rows[index].classList.add("selecionado");
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
    document.getElementById("nome").value = "";
    document.getElementById("sobrenome").value = "";
    document.getElementById("nascimento").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("uf").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("tipoCliente").value = "";
}

// const corpoTabelaClientes = document.getElementById("corpoTabelaClientes");

// corpoTabelaClientes.addEventListener("click", (event) => {
//     const row = event.target.parentNode;
//     if (row.tagName === "TR") {
//         const index = Array.from(row.parentNode.children).indexOf(row);
//         preencherFormulario(index);
//     }
// });

window.onload = function () {
    atualizarTabelaClientes();
};
