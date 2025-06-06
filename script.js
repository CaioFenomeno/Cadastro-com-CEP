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

document.getElementById('cep').addEventListener('blur', buscarCEP);

function buscarCEP() {
  const cep = document.getElementById('cep').value;

  if (cep.length !== 8 || isNaN(cep)) {
    alert('CEP inválido. Digite um CEP com 8 números.');
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        alert('CEP não encontrado.');
        return;
      }

      document.getElementById('rua').value = data.logradouro || '';
      document.getElementById('bairro').value = data.bairro || '';
      document.getElementById('cidade').value = data.localidade || '';
      document.getElementById('estado').value = data.uf || '';
      salvarFormulario(); // Salva os dados atualizados
    })
    .catch(() => {
      alert('Erro ao buscar o CEP. Tente novamente.');
    });
}
