import "./css/index.css"

const ccColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path"); // o querySelector tem a funcionalidade 
//de selecionar um elemento html para fazer a alteração que eu quiser (busca pelo seletor)
const ccColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type){
    const colors = {
        visa: ["#436D99", "#2D57F2"],
        mastercard: ["red", "white"],
        default: ["black", "gray"]
    };

    ccColor1.setAttribute("fill", colors[type][0]); // primeiro argumento é o nome do atributo que eu quero modificar e 
    //o segundo o que eu quero fazer
    ccColor2.setAttribute("fill", colors[type][1]);

    ccLogo.setAttribute("src", `cc-${type}.svg`)


}

setCardType("mastercard")