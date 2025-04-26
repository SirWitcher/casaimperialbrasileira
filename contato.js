function abrirModal() {
    document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    const contato = {
        nome,
        email,
        telefone,
        assunto,
        mensagem,
        dataEnvio: new Date().toISOString()
    };

    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    contatos.push(contato);
    localStorage.setItem('contatos', JSON.stringify(contatos));

    abrirModal();

    document.getElementById('formulario').reset();
});

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        fecharModal();
    }
}