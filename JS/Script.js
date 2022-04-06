//Pegamos a janela que da acesso ao sessionStorage e salvamos em uma constante
const myStorage= window.sessionStorage;
//Pegamos o valor 'logado' do session storage para passar como argumento para algumas funções
let logado= myStorage.getItem('logado')
const buttonLogout= document.querySelector('#logout')
const formulario = document.querySelector ('form');
const button = formulario.querySelector('.todo-button');
const text = formulario.querySelector('.todo-input');
let ul = document.querySelector('.todo-list');
let vetor = [];
const filterTodo= formulario.querySelector('.filter-todo');
console.log (filterTodo);

checkLogado();

carregaStorage();

//Evento de click do botão ''sair''.
buttonLogout.addEventListener('click', function(){

    /*quando o evento de click for ativado removera a mensagem de logado do site passada
    pelo sessionStorage, assim fazendo com que 'logado' seja igual a false*/
    myStorage.removeItem('logado');
    //Quando logado for igual a 'false' fará o redirecionamento para a página de login
    location= 'login.html';
})

//Evento de click no botão "todo-button".
button.addEventListener ('click', function (evento) {
    evento.preventDefault();

        if(validaInformação(text)){
            alert('nenhum valor inserido')
        }else{
            armazena(text);

            addbutton()

            filter()
        }

});

/*função que checa de o valor passado pelo sessionStorage existe 'logado' 
caso sessionStorage não existir então será redirecionado para pagina 'login'*/
function checkLogado () {
    if(logado){
    }else{
        location= 'login.html';
    }
}

// Função que salva os dados no localStorage
function carregaStorage(){
    //Salva nodelist do localStorage com o nome de 'tarefa'
    let json = localStorage.getItem('tarefa'); 
    //SE a lista existir passa os valores da lista para o vetor, Assim armazena os valores da lista no vetor.
    if(json){
    vetor= JSON.parse(json);
    }
    /*percorre o vetor e salva os valores dentro da variável objeto,
    como a função é chamada logo quando logado ela salva apenas os valores que forma salvos no localStorage*/
    for (let i =0; i < vetor.length; i++){
    console.log (json);
        let objeto= vetor[i];
        //Passa os valores salvor no localStorage para a função addButton que cria os valores na lista.
        addbutton(objeto);
    }
}

const validaInformação= function(){
    //validação de valor.
    if(text.value == '') {
        return true;
    }
}
    
//armazena o valor digitado no array
function armazena () {
    let objeto= {
        texto: text.value,
        id: vetor.length + 1 + 'btn',
    }
    vetor.push (objeto);
    localStorage.setItem('tarefa', JSON.stringify(vetor))
    console.log (vetor); 
    return objeto;  
};

//Função que cria a div de cada tarefa e o li de cada tarefa
function addLista() {

        let divTodo= document.createElement('div');
        divTodo.classList.add('todo');
        ul.append(divTodo);
           
        //classList.add adiciona a class ao elemento div criado pelo atributo createElement acima.
        let tarefa= document.createElement('li');
        tarefa.classList.add('todo-item');
        divTodo.append(tarefa);
        tarefa.innerHTML=text.value;

        return divTodo;
        ;}

        
/*Função recebe os valores dos objetos e também a função 'addlista' assim tendo essas 
funções pode adicionar os buttons necessários*/
function addbutton (objeto) {
    let div= addLista();
    /*cria o butão check dentro de cada li colocando sua classe e um id para 
    identificação de cada botão de acordo com o indice do array*/
    let buttonCheck=document.createElement('button');
        buttonCheck.classList.add('check-btn');
        buttonCheck.id=vetor.length + 'btn'
        div.classList= 'todo-nocheck'
        console.log(div)
        div.append(buttonCheck);
        buttonCheck.innerHTML='<i class="fas fa-check" aria-hidden="true">';

        //evento do botão check
        buttonCheck.addEventListener('click', function(b){
        //Parâmetro que pega as informações de cada botão clickado e salva na variável 'btncheck'
        let btnCheck= b.target;
        //Pega o pai do botão em que foi clickado ou seja a div do botão e salva na váriavel 'licheck'
        let liCheck= btnCheck.parentNode;
        /*Quando o evento de click acontecer muda a classe do li para 'todo-check' 
        aplicando a regra para está classen no css*/
        liCheck.classList= 'todo-check';
        console.log(liCheck)
        });


    //Cria o botão de excluir 
    let buttonTrash= document.createElement('button');
    //Adiciona a classe 'trash-btn' quando o botão for clickado
    buttonTrash.classList.add('trash-btn');
    //adivciona como filho o button a div que chama a função addLista() 
    div.appendChild(buttonTrash);
    buttonTrash.id=vetor.length + 'btn' 
    console.log (buttonTrash)
    //Escreve dentro do botão o icone da lixeira
    buttonTrash.innerHTML='<i class="fas fa-trash" aria-hidden="true"></i></button>'

    //Evento do botão de excluir
    buttonTrash.addEventListener('click', function(b){
        let btnTrash=b.target;
        let liTrash= (btnTrash.parentNode);
        console.log (liTrash)
        //remove a tarefa clickada do elemento ul excluindo a div
        ul.removeChild(liTrash)
        //comando de repetição para percorer o vetor
        for(let i = 0; i < vetor.length; i++){
            //se o id do objeto for igual ao id do botão então:
            if(vetor[i].id == buttonTrash.id){
            //remova esse item do array
            vetor.splice(objeto, 1)
            console.log (vetor)
                };
            };
        });
        return buttonCheck
    };


//função que filtra cada seleção utilizanbdo o switch
const filter= function(){
    filterTodo.addEventListener('click', function(){
        //pega o valor que está no filtro e salva dentro da variavel select
        let select= filterTodo.value
        switch(select){
            //se o valor for 'completed' execute está função
            case 'completed': filterCheck();
            break;
            case 'uncompleted': filterNocheck();
            break;
            case 'all': all();
            break;
            default:''
            }
        });   
    }  
    


function filterCheck() {
    /*com o querySelectorAll pegamos todos os elementos com a calsse todo-nochek/ todo-check 
    e criamos um nodeList em forma de array*/
    let no_check= document.querySelectorAll('.todo-nocheck')
    let recupera_check= document.querySelectorAll('.todo-check');
    /*percorremos o array da node list armazenados na variável no_check*/
    for(let i= 0; i < no_check.length; i++){
        //se a classlist na posição da no check for igual a 'todo-nocheck' então:
    if(no_check[i].classList == 'todo-nocheck'){
        //adicione o display none no elemento
        no_check[i].style= 'display: none;' 
        }
    }
    /*percorremos a node list para trazer o elemento de volta caso o filtro utilizado 
    anteriormente adicionou o display none a ele*/
    for(let i= 0; i < recupera_check.length; i++){
        //segue a mesma lógica acima
        if(recupera_check[i].classList == 'todo-check'){
            recupera_check[i].style= 'display: flex;'
        }
    }
}

function filterNocheck(){
    let check= document.querySelectorAll('.todo-check')
    let recupera_noCheck= document.querySelectorAll('.todo-nocheck')
    for(let i= 0; i < check.length; i ++){
    if (check[i].classList == 'todo-check'){
        check[i].style= 'display: none;';
        }
    }
    for(let i= 0; i < recupera_noCheck.length; i ++){
        if(recupera_noCheck[i].classList == 'todo-nocheck'){
            recupera_noCheck[i].style='display: check;'
        }
    }
}


function all(){
    let all_check= document.querySelectorAll('.todo-check');
    let all_no_check= document.querySelectorAll('.todo-nocheck');
    for(let i= 0; i < all_check.length; i++){
        if(all_check[i].classList == 'todo-check'){
            all_check[i].style= 'display: flex;'
        }
    }
    for(let i= 0; i< all_no_check.length; i++){
    if(all_no_check[i].classList == 'todo-nocheck'){
     all_no_check[i].style= 'display:flex;'
        }
    }
}


