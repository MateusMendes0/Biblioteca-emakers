var botao = document.getElementById("change")
var html = document.getElementById("table")
let input = document.getElementById("input")
var all = document.getElementById("all_check")
let book = document.getElementById("input_book")
let library = document.getElementById("input_library")
let add = document.getElementById("add")
let user = document.getElementById("usuario")
let search_user = document.getElementById("search_user")

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
      <th>Disponível</th>
      <th>Ação</th>
      <th>Transferir</th>
    </tr>`
    dados_json.forEach(dados => {
        if(dados.person_id == null){
            var avaliable = 'Sim'
            var but = `<td><button type="button" onclick="take(${dados.id})">Pegar</button></td></td>`
        }
        else{
            var avaliable = 'Não'
            var but = ``
        }
        string += `<tr><td>${dados.library}</td><td>${dados.book}</td><td>${dados.id}</td><td>${avaliable}</td>`+but+`<td><button type="button" onclick="transferir(${dados.id})"><i class="fa-solid fa-arrow-right-arrow-left"></i></button></td></td></tr>`
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

async function return_book(num){
        
    const options = {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        }
        };


    const url = `http://localhost:3333/api/library/return/${num}`
    var data = await fetch(url, options)
}

async function transferir(num){

    let transfer = prompt('Digite o destino')

    let body = {
        library  : transfer
    }
        
    const options = {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body : JSON.stringify(body)
        };


    const url = `http://localhost:3333/api/library/transfer/${num}`
    var data = await fetch(url, options)
}

search_user.addEventListener("click", async function(){
    if(user.value == ""){
        var url = `http://localhost:3333/api/user/` 
        var data = await fetch(url, {
            method: 'GET'
        })
        var dados_json = await data.json();
        dados_json = dados_json.data
        var string = `
        <table class='tabela'>
        <tr>
        <th>Usuario</th>
        <th>ID</th>
        </tr>`
        dados_json.forEach(dados => {
            string += `<tr><td>${dados.person}</td><td>${dados.id}</td></tr>`
        })
        string += `</table>`
        html.innerHTML = string
}
    else{
        var url = `http://localhost:3333/api/user/${user.value}` 
        var data = await fetch(url, {
            method: 'GET'
        })
        var dados_json = await data.json();
        dados_json = dados_json.data
        var string = `
        <h1>Livros emprestados por ${dados_json.person}</h1>
        <table class='tabela'>
        <tr>
        <th>Livro</th>
        <th>ID Livro</th>
        <th>Ação</th>
        </tr>`
        dados_json.book_id.forEach(dados => {
            string += `<tr><td>${dados.book}</td><td>${dados.id}</td><td><button type="button" onclick="return_book(${dados.id})">Return</button></td></td></tr></tr>`
        })
        string += `</table>`
        html.innerHTML = string
}

})