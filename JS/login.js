const login= 'nome@gmail.com'
const senha= '1234'
const pegaSenha= document.querySelector('#password')
const pegaLogin= document.querySelector('#email');
const buttonEntrar= document.querySelector('#entrar')


buttonEntrar.addEventListener('click', function(){
    // se a função de valida login for igual a verdadeiro chame afunção 'logado()'  
   if (validaLogin() === true){
        logando();
   }
})


function validaLogin (){
    if (pegaLogin.value !== login){
    alert('login invalido');
}else{
    if(pegaSenha.value !== senha){
        alert('Senha Invalida')
        }else{
    return true;
        }
}   
}


function logando(){

    let myStorage= window.sessionStorage;
    //pega o mystorage e passa o valor 'logado' como verdadeiro
    myStorage.setItem('logado', true)
    //redireciona para a página principal
    window.location= 'index.html'
}

