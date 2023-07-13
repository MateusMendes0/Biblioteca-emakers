var botao = document.getElementById("change")
var html = document.getElementById("table")
let input = document.getElementById("input")
var all = document.getElementById("all_check")
let book = document.getElementById("input_book")
let library = document.getElementById("input_library")
let add = document.getElementById("add")
let user = document.getElementById("usuario")



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
        string += `<tr><td>${dados.library}</td><td>${dados.book}</td><td>${dados.id}</td><td>${avaliable}</td><td><button onclick="take(${dados.id})">Take</button></td></td></tr>`
    });
    string += `</table>`
    html.innerHTML = string
})

add.addEventListener("click", async function(){
    const livro = {
        library : library.value,
        book: book.value,
        };
        
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro),
        };


    const url = "http://localhost:3333/api/book"
    var data = await fetch(url, options)
})

async function take(num){
    const person = {
        person : user.value
        };
        
    const options = {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
        };


    const url = `http://localhost:3333/api/library/take/${num}`
    var data = await fetch(url, options)
}