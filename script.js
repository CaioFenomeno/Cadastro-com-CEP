document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-cadastro');

  // Restaura os dados do localStorage quando a página carrega
  restaurarFormulario();

  // Escuta mudanças em todos os campos e salva no localStorage
  form.addEventListener('input', salvarFormulario);
});

function salvarFormulario() {
  const dados = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    cep: document.getElementById('cep').value,
    rua: document.getElementById('rua').value,
    bairro: document.getElementById('bairro').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('estado').value
  };

  localStorage.setItem('formularioCadastro', JSON.stringify(dados));
}

function restaurarFormulario() {
  const dadosSalvos = localStorage.getItem('formularioCadastro');

  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);

    document.getElementById('nome').value = dados.nome || '';
    document.getElementById('email').value = dados.email || '';
    document.getElementById('cep').value = dados.cep || '';
    document.getElementById('rua').value = dados.rua || '';
    document.getElementById('bairro').value = dados.bairro || '';
    document.getElementById('cidade').value = dados.cidade || '';
    document.getElementById('estado').value = dados.estado || '';
  }
}
