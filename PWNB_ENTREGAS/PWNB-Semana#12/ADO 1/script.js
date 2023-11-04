

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
};


const clientes = [];
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

    clientes.push(cliente);
    atualizarTabelaClientes();
    limparCampos();
}

function alterarCliente() {
    const { nome, sobrenome, nascimento, cidade, cep, uf, endereco, numero, tipoCliente} = resgatarDados();

    if (!nome || !sobrenome || !nascimento || !cidade || !cep || !uf || !endereco || !numero || !tipoCliente) {
        alert("Todos os campos devem ser preenchidos");
        return;
    }

    const index = obterIndiceClienteSelecionado();
    if (index !== -1) {
        const cliente = clientes[index];
        cliente.nome = nome;
        cliente.sobrenome = sobrenome;
        cliente.nascimento = nascimento;
        cliente.cidade = cidade;
        cliente.cep = cep;
        cliente.uf = uf;
        cliente.endereco = endereco;
        cliente.numero = numero;
        cliente.tipoCliente = tipoCliente;
        atualizarTabelaClientes();
        limparCampos();
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

function atualizarTabelaClientes() {
    const corpoTabelaClientes = document.getElementById("corpoTabelaClientes");
    corpoTabelaClientes.innerHTML = "";

    clientes.forEach((cliente, index) => {
        const row = corpoTabelaClientes.insertRow();
        row.insertCell(0).textContent = cliente.nome;
        row.insertCell(1).textContent = cliente.sobrenome;
        row.insertCell(2).textContent = cliente.nascimento;
        row.insertCell(3).textContent = cliente.cidade;
        row.insertCell(4).textContent = cliente.cep;
        row.insertCell(5).textContent = cliente.uf;
        row.insertCell(6).textContent = cliente.endereco;
        row.insertCell(7).textContent = cliente.numero;
        row.insertCell(8).textContent = cliente.tipoCliente;

        const alterarButton = document.createElement("button");
        alterarButton.textContent = "Alterar";
        alterarButton.onclick = () => preencherFormulario(index);
        row.insertCell(9).appendChild(alterarButton);

        const excluirButton = document.createElement("button");
        excluirButton.textContent = "Excluir";
        excluirButton.onclick = () => excluirCliente(index);
        row.insertCell(10).appendChild(excluirButton);
    });
}

function preencherFormulario(index) {
    const cliente = clientes[index];
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
    if (index >= 0 && index < clientes.length) {
        clientes.splice(index, 1);
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

const corpoTabelaClientes = document.getElementById("corpoTabelaClientes");
corpoTabelaClientes.addEventListener("click", (event) => {
    const row = event.target.parentNode;
    if (row.tagName === "TR") {
        const index = Array.from(row.parentNode.children).indexOf(row);
        preencherFormulario(index);
    }
});
