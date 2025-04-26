const senhaCorreta = "d.pedro2";

function pedirSenha() {
    const senhaDigitada = prompt("Área restrita. Por favor, insira a senha de acesso:");
    if (senhaDigitada !== senhaCorreta) {
        alert("Senha incorreta. Você será redirecionado.");
        window.location.href = "index.html";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    pedirSenha();
    carregarContatos();
    document.getElementById('exportarCSV').addEventListener('click', exportarParaCSV);
});

function carregarContatos() {
    const listaContatos = document.getElementById('lista-contatos');
    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

    if (contatos.length === 0) {
        listaContatos.innerHTML = "<p>Nenhuma mensagem encontrada.</p>";
        return;
    }
    
    function exportarParaCSV() {
        let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
        if (contatos.length === 0) {
            alert("Nenhum contato para exportar.");
            return;
        }
    
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Nome,E-mail,Telefone,Assunto,Mensagem,Data\n";
    
        contatos.forEach(c => {
            let linha = [
                `${c.nome}`,
                `${c.email}`,
                `${c.telefone}`,
                `${c.assunto}`,
                `${c.mensagem.replace(/(\r\n|\n|\r)/gm, " ")}`,
                `${new Date(c.dataEnvio).toLocaleString('pt-BR')}`
            ].join(",");
            csvContent += linha + "\n";
        });
    
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "contatos_casa_imperial.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        carregarContatos();
        document.getElementById('exportarCSV').addEventListener('click', exportarParaCSV);
    });
    let tabela = `
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Assunto</th>
                    <th>Mensagem</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
    `;

    contatos.forEach(c => {
        tabela += `
            <tr>
                <td>${c.nome}</td>
                <td>${c.email}</td>
                <td>${c.telefone}</td>
                <td>${c.assunto}</td>
                <td>${c.mensagem}</td>
                <td>${new Date(c.dataEnvio).toLocaleString('pt-BR')}</td>
            </tr>
        `;
    });

    tabela += `
            </tbody>
        </table>
    `;

    listaContatos.innerHTML = tabela;
}

document.addEventListener('DOMContentLoaded', carregarContatos);