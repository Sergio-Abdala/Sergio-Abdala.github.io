const palavras = [
    ['sagaz', 'que não se deixa enganar; esperto, perspicaz.'],
    ['negro'],
    ['mexer'],
    ['termo'],
    ['senso'],
    ['nobre'],
    ['algoz'],
    ['afeto'],
    ['plena'],
    ['etica', '', 'ética grafia correta com acento...'],
    ['sutil'],
    ['vigor'],
    ['audaz'],
    ['fazer'],
    ['sanar'],
    ['inato'],
    ['assim'],
    ['cerne'],
    ['ideia'],
    ['desde'],
    ['fosse'],
    ['poder'],
    ['moral'],
    ['torpe'],
    ['honra'],
    ['muito'],
    ['justo'],
    ['gozar'],
    ['anexo'],
    ['futil', '', 'fútil grafia correta com acento...'],
    ['foder'],
    ['comer']
]
//sortear palavra
let numSort = parseInt(Math.random() * palavras.length);
let strSorteada = palavras[numSort][0];//palavras[Math.random() * palavras.length][0];
console.log('sorteada => '+ strSorteada);
let palavra = new Array();
let cancelados = new Array();
let contPalavra = 0;
//identificar interação usuario
document.getElementById('delete').addEventListener('click', ()=>{
    alert('addevent deletar');
    palavra.pop();
    limpaTela();
    escreve();
});
document.getElementById('enter').addEventListener('click', ()=>{
    //alert('addevent enter');
    avalia();
});

function clicou(letra){
    //console.log(letra.length);
    if(letra.length>1){
        letra = letra.split('>')[1];//limpando hipertexto
        letra = letra.split('<')[0];//limpando hipertexto
    }    
    console.warn(letra);
    if(letra == 'delete'){
        //alert('delete');
        palavra.pop();
        limpaTela();
        escreve();
    }else if(letra == 'ENTER  confirm'){
        //alert('enter');
        avalia();
    }else{
        if(palavra.length < strSorteada.length){
            //avaliar letra cancelados
            let flagCancel = false;
            if(cancelados.length > 0){
                for (let i = 0; i < cancelados.length; i++) {
                    if(cancelados[i] === letra){
                        flagCancel = true;
                    }                
                }
            }            
            if(!flagCancel){
                palavra.push(letra);
                limpaTela();
                escreve();
            }else{
                alert('letra cancelada, esta letra ñ esta na palavra...');
            }
            
        }else{
            alert('precione ENTER confirm...')
        }        
    }    
}
//
function limpaTela(){
    strSorteada.length//tamanho da string
    document.getElementById('tela').innerHTML = '';
    for (let i = 0; i < strSorteada.length; i++) {
        const letra = strSorteada[i];
        console.warn(letra);
        document.getElementById('tela').innerHTML += ' <strong id="letra'+i+'">?<strong> ';
    }
}
function escreve(){
    if(palavra.length){
        for (let i = 0; i < palavra.length; i++) {
            const letra = palavra[i];
            document.getElementById('letra'+i).innerHTML = letra;            
        }
    }
}

function avalia(){
    //palavra usuario e sorteada tem mesmo tamanho
    if(palavra.length === strSorteada.length){
        for (let i = 0; i < palavra.length; i++) {
            const letra = palavra[i];
            //avaliar amarelo varrer array da palavra sorteada achando a letra é amarela
            for (let j = 0; j < strSorteada.length; j++)  {
                //const element = strSorteada[j];
                if(strSorteada[j].toUpperCase() === letra){
                    document.getElementById('letra'+i).style.color = 'orange';
                    document.getElementById(letra).style.background = 'green';
                }            
            }        
        }
        //avaliar verde
        let contVerde = 0;
        for (let i = 0; i < palavra.length; i++) {
            if(strSorteada[i].toUpperCase() === palavra[i]){
                document.getElementById('letra'+i).style.color = 'green';
                contVerde++;
            }
        }
        if(contVerde === palavra.length){
            alert('acertou a palavra');
        }else{
            contPalavra++;
                //avaliar vermelho lista de cancelados
                for(let i = 0; i < palavra.length; i++){
                    if(document.getElementById('letra'+i).style.color != 'orange' && document.getElementById('letra'+i).style.color != 'green'){
                        cancelados.push(palavra[i]);
                        document.getElementById('letra'+i).style.color = 'red';
                        document.getElementById(palavra[i]).style.background = 'red';
                    }
                }
                if (contPalavra < strSorteada.length) {
                        //passar palavra para tela2 h2 tag
                        for (let i = 0; i < palavra.length; i++) {
                            const element = palavra[i];
                            document.getElementById('tela2').innerHTML += '<strong style="color:'+document.getElementById('letra'+i).style.color+';">'+palavra[i]+'</strong>';
                        }
                        document.getElementById('tela2').innerHTML += '<br/>';
                        palavra = [];
                        limpaTela();
                }else{
                    alert('fim de jogo...');
                }
                
                console.log(cancelados);//pintar de vermelho no teclado, ñ executar inserir no array
        }        
    }else{
        alert('palavra menor que a esperada, falta letras...');
    }
}
