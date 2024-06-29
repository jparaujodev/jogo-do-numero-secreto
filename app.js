//Quero seleciona o campo h1 e o p do index para alterar o que esta escrito
//queryselector é usado para selecionar agum campo do index.html
//fazemos isso pois o htmlk não foi feito para ficar em constante alteração

//let titulo = document.querySelector('h1'); //essa linha seleciona o elemento  HTML  com a tag h1
//titulo.innerHTML = 'Jogo de adivinhação';//essa linha altera o conteúdo do h1

//let paragrafo =  document.querySelector('p');
//paragrafo.innerHTML = 'Digite um número'

//evite repetição de códigos, quando tiver código semelhantes e repetivos quanto mais conseguir compactar ou fazerem menos linhas melhor, são boas práticas 

//função com parametro (parametro é o que esta dentro do parenteses depois do nome da função)
let listaNumerosSorteados=[]; //declaração da lista de numeros 
let numeroMaximo = 25;
let numeroSecreto = gerarNumeroAleatorio(); //declaração da variavel numero secreto, que recebe a função de gerador de numero secreto
let tentativas = 1; //declaração da vriavel tentaiva semrpe começa com 1
 
function exibirTextoNaTela(tag, texto){ //função pra exibir texto na tela, onde ele pega tag e texto de um certo campo do HTML
	let campo = document.querySelector(tag);//aqui ele seleciona a tag
	campo.innerHTML = texto; //aqui ele diz pra inserir o valor  ou texto no campo
	responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
	

}

function mensagemInicial(){//função pra mensagem inicial
	exibirTextoNaTela('h1', 'Jogo do número secreto');//texto na tela
	exibirTextoNaTela('p', 'Escolha um número entre 1 e 25');//texto na tela
}

mensagemInicial();

//função sem parametros (parametro é o que esta dentro do parenteses depois do nome da função)

function verificarChute() {//função que verificar o chute
	let chute = document.querySelector('input').value; //com o .value ele pega apenas o valor número dessa tag
	if(chute == numeroSecreto){//se o chute for igual ao numero secreto
		let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';//se as tentativas forem maiors que 1  ele escreve "tenativas" na tela, caso seja 1  ele apresenta "tentativa" na tela
		exibirTextoNaTela('h1', `Parabéns, voce acertou com ${tentativas} ${palavraTentativa}!`);//exibi o texto na tela  com  condição da palavra tentativa 
		exibirTextoNaTela('p', 'Jogue novamente!');
		document.getElementById('reiniciar').removeAttribute('disabled');// aqui a ente habilia o botão reiniciar
	}else{
		if(chute > numeroSecreto){// se o chute for  maior que o numero 
			 exibirTextoNaTela('h1', 'Quase!');
			 exibirTextoNaTela('p', 'O chute foi maior!');
		}else{//caso seja menor...
			exibirTextoNaTela('h1', 'Quase!')
			exibirTextoNaTela('p', 'O chute foi menor!');
		}
		tentativas++;//somatória de tentativas

		limparCampo();// limpa o campo  onde digitamos o numero.
	
	}
}

function gerarNumeroAleatorio(){//função que gera numero aleatorio
	let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1); //varivel que vai trazer o numero aleatorio
	let quantidadeElementosLista = listaNumerosSorteados.length;
	if(quantidadeElementosLista == numeroMaximo){
		listaNumerosSorteados = [];

	}
	if(listaNumerosSorteados.includes(numeroEscolhido)){//se o numero escolhido estiver dentro da lista dos numeros sorteados já..
		return gerarNumeroAleatorio();//gere um novo numero
	}else{//se não
		listaNumerosSorteados.push(numeroEscolhido);//colocar o numero escolhido dentro da lista de numeros sorteados
		console.log(listaNumerosSorteados);//mostra a lista no console da web
		return numeroEscolhido;//e me retorna o numero que aleatório que n esta dentro da lista
	}

}

function limparCampo(){// função que limpa o campo
	chute = document.querySelector('input');//selecionamos o campo onde digitamos os numero 
	chute.value = '';//aqui ele vai limpar o campo 
	

}

function reiniciarJogo(){//aqui ele reiniciar o jogo
	numeroSecreto = gerarNumeroAleatorio();//gera mais um numero
	limparCampo();//limpa o campo
	tentativas = 1;//começa as tentativas
	mensagemInicial();
	document.getElementById('reiniciar').setAttribute('disabled', true)// aqui  ele desabilita o botão reiniciar umavez que ja foi apertado por tanto só poderemos apertar novamente após acertamos o numero.
}
