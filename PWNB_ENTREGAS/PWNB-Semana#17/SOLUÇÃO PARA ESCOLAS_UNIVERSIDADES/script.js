
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o formulário e adiciona um ouvinte para o evento de envio
    var form = document.querySelector('.login100-form');
    form.addEventListener('submit', function (event) {
        // Impede o envio padrão do formulário
        event.preventDefault();

    
        var email = document.querySelector('.input100[type="email"]').value;
        var senha = document.querySelector('.input100[type="password"]').value;


        if (email.trim() === '') {
            alert('Digite um Email valido');
            return; 
        }

        if (senha.trim() === '') {
            alert('A senha não pode ser vazia');
            return; 
        }

        if(email.includes('@aluno')){
            window.location.href = "/Home/homeAluno";
        }
        else if(email.includes('@professor')){
            window.location.href = "/Home/homeProfessor";
        }

    
        
    });
});
