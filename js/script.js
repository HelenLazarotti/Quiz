let perguntasFeitas = []

const perguntas = [
    //pergunta 0
    {pergunta: "Qual desses linguagens não é uma linguagem de programação? ",

    respostas: ["PHP", "JavaScript", "Python", "HTML"],

    correta: "r3"
    },
    //pergunta 1
    {
        pergunta: "Que ano surgiu a linguagem de programação JavaScript? ",

        respostas: ["1970", "1995", "1985", "2005"],

        correta: "r1"
    },
    //pergunta 2
    {
        pergunta: "Que linguagem é capaz de construir aplicações em rede? ",

        respostas: ["Python", "PHP", "Java", "C#"],

        correta: "r2"
    },
    //pergunta 3
    {
        pergunta: "Qual significado do operador relacional (!=), você sabe? ",

        respostas: ["Diferente de", "Igual", "Equivalente", "Não igual"],

        correta: "r0"
    }
]
var qtdPerguntas = perguntas.length - 1;
gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas){
//gerar numero aleatório

let aleatorio = (Math.random()* maxPerguntas).toFixed()

//converter para numero
aleatorio = Number(aleatorio);



if(!perguntasFeitas.includes(aleatorio)){
//significa: se não está nas perguntasFeitas.incluido()

    //colocar como pergunta feita:
    perguntasFeitas.push(aleatorio)

    //preencher o html com os dados da qustão sorteada:

    var p_selecionada = perguntas[aleatorio].pergunta;

//alimentar a pergunta vinda do sorteio
    $("#pergunta").html(p_selecionada);
    $("#pergunta").attr("data-indice", aleatorio)


    //colocar respostas

     for(i =0; i<4; i++){
//enquanto meu indice for menor que minhas perguntas, que nesse caso sao 4, eu incremento +1:
        $("#r" + i).html(perguntas[aleatorio].respostas[i])
    }

 //embaralhar respostas

    var pai = $("#respostas")
    var botoes = pai.children()
 //o children() serve p pegar todos os filhos do pai, ou seja, tudo que está dentro da div, entao nesse caso, vai pegar todos meus botões.

    for(i = 1; i < botoes.length; i++){
     pai.append(botoes.eq(Math.floor(Math.random()* botoes.length)))

     //gera uma sequência aleatória dos gotões
    }
} else {
    //se a pergunta já foi feita:

    console.log("A pergunta já foi feita, sorteie novamente.")

    if(perguntasFeitas.length < qtdPerguntas + 1) {
        return gerarPergunta(maxPerguntas);

    } else {
        console.log("Acabaram as perguntas")

        $("#quiz").addClass("oculto")

        $("#mensagem").html("Você venceu! Acertou todas perguntas.")

        $("#status").removeClass("oculto")
        }
    }

}

$(".resposta").click(function(){
//percorrer todas as respostas e desmarcar a classe selecionada

    $(".resposta").each(function(){
        if($(this).hasClass("selecionada")){
            $(this).removeClass("selecionada")
        }
    })


//adicionar a classe selecionada
        $(this).addClass("selecionada")
})//aqui eu tbm podia colocar o resetaBotoes(), ao invés de tudo isso.

$("#confirmar").click(function(){
//pegar o indice da pergunta:
    var indice = $("#pergunta").attr("data-indice");

//attr signidica atributo, nesse caso, que atributo vamos pegar.

//qual resposta certa:
    var respCerta = perguntas[indice].correta;

//qual resposta que o usuário selecionou:

    $(".resposta").each(function () { 
        if($(this).hasClass("selecionada")){
            var respostaEscolhida = $(this).attr("id")
        

            if(respCerta == respostaEscolhida){
                console.log("Acertou Criatura!")
                proximaPergunta();
            } else {
                $("#quiz").attr("data-status", "travado")
                $("#" + respCerta).addClass("correta")

                $("#" + respostaEscolhida).removeClass("selecionada")

                $("#" + respostaEscolhida).addClass("errada")

                setTimeout(function(){
                gameOver();
                },4000);
            }
        }
     })

})
function newGame(){

    perguntasFeitas = []
    resetaBotoes()
    gerarPergunta(qtdPerguntas)
    $("#quiz").removeClass("oculto")
    $("#status").addClass("oculto")

}

function proximaPergunta(){
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
}

function resetaBotoes(){
 //percorrer todas as respostas e desmarcar a classe selecionada
 $(".resposta").each(function(){
    if($(this).hasClass("selecionada")){
        $(this).removeClass("selecionada")
    } 
    else if($(this).hasClass("correta")){
        $(this).removeClass("correta")
    } 
    else if($(this).hasClass("errada")){
        $(this).removeClass("errada")
    } 
})
}

function gameOver(){
    $("#quiz").addClass("oculto")
    $("#mensagem").html("Game Over")
    $("#status").removeClass("oculto")
}

$("#novoJogo").click(function(){
    newGame();
})
