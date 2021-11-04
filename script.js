const selecaoValue = document.querySelector('#selecao-veiculos')
const veiculosLista = document.querySelector('#veiculos')
const alerta = document.querySelector('#alerta')

const buscarListaFIPE = (itemSelecionado) => {
  return fetch(`https://parallelum.com.br/fipe/api/v1/${itemSelecionado}/marcas`)
  .then(resposta => resposta.json())
  .then(resposta => resposta)
  .catch((erro) => erro) 
}


const adicionaNovaLinha = ({nome}) => {
  return `<option value="${nome}">${nome}</option>`
}


const preencherDados = (itens) => {
  if(!itens) {
    alerta.textContent = 'Erro'
    return
  } else {
    const listaItens = itens
      .map(item => adicionaNovaLinha(item)).join()
      veiculosLista.innerHTML = listaItens
  }
}

let veiculoEscolha = null
selecaoValue.addEventListener('change', (evento)=>{
  veiculoEscolha = evento.target.value;
  buscarListaFIPE(veiculoEscolha).then((itens) => {
    preencherDados(itens)
  } )
})


veiculosLista.addEventListener('change', (evento)=>{
  let itemSelecionado = evento.target.value;
  alerta.textContent = `Voce selecionou o veiculo: ${veiculoEscolha} e a opção: ${itemSelecionado}`
})




