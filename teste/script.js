var botao = document.getElementById("change")
var html = document.getElementById("testes")
let input = document.getElementById("input")
var all = document.getElementById("all_check")



botao.addEventListener("click", async function(){
    var data = await fetch("http://localhost:3333/api/library")
    var dados_json = await data.json();
    dados_json = dados_json.data
    var string = `<table class='tabela'>
    <tr>
      <th>Biblioteca</th>
      <th>ID</th>
    </tr>`

    dados_json.forEach(dados => {
        string += `<tr><td>${dados.library}</td><td>${dados.id}</td></tr>`
    });
    string += `</table>`
    html.innerHTML = string
})

search_button.addEventListener("click", async function(){
    var url = `http://localhost:3333/api/library/search/${input.value}` 
    if(all.checked){
        url = url+"?avaliable=false"
    }
    var data = await fetch(url, {
        method: 'GET'
      })
    var dados_json = await data.json();
    dados_json = dados_json.data
    var string = `<table class='tabela'>
    <tr>
      <th>Biblioteca</th>
      <th>Livro</th>
      <th>ID</th>
      <th>Disponível</th>>
    </tr>`

    dados_json.forEach(dados => {
        if(dados.person == null){
            var avaliable = 'Sim'
        }
        else{
            var avaliable = 'Não'
        }
        string += `<tr><td>${dados.library}</td><td>${dados.book}</td><td>${dados.id}</td><td>${avaliable}</td></tr>`
    });
    string += `</table>`
    html.innerHTML = string
})