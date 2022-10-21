// AULA 1
import "./css/index.css"
import IMask from "imask";

const ccColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path"); // o querySelector tem a funcionalidade 
//de selecionar um elemento html para fazer a alteração que eu quiser (busca pelo seletor)
const ccColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type){
    const colors = {
        visa: ["#436D99", "#2D57F2"],
        mastercard: ["red", "white"],
        default: ["black", "gray"],
        //teste: ["#0B0928", "#F16529", "", "",]
    };

    ccColor1.setAttribute("fill", colors[type][0]); // primeiro argumento é o nome do atributo que eu quero modificar e 
    //o segundo o que eu quero fazer
    ccColor2.setAttribute("fill", colors[type][1]);

    ccLogo.setAttribute("src", `cc-${type}.svg`);
    
    //ccDados.setAttribute("cc-number", ccDadosNumero); 

}

// AULA 2
// site pra ver a documentação do iMask - imask.js.org
// CVC - security-code
const securityCode = document.getElementById('security-code'); // posso usar o querySelector tambem
const securityCodePattern = {
    mask: "0000"
};
const securityCodeMask = IMask(securityCode, securityCodePattern);

// expiration-date
const expirationDate = document.getElementById("expiration-date");
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2),
        }
    }
}
const expirationDateMask = IMask(expirationDate, expirationDatePattern);

// card-number
const cardNumber = document.getElementById("card-number");
const cardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardtype: "visa",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardtype: "mastercard",
        },
        {
            mask: "0000 0000 0000 0000",
            cardtype: "default",
        },
    ],
    dispatch: function(appended, dynamicMasked){
       const number = (dynamicMasked.value + appended).replace(/\D/g, "");
       const foundMask = dynamicMasked.compiledMasks.find( (item) => number.match(item.regex));
       //console.log(foundMask)
       return foundMask;
    },
}
const cardNumberMask = IMask(cardNumber, cardNumberPattern);

// AULA 3
// adicionando um evento ao clicar no botao
const addButton = document.querySelector("#add-card");
addButton.addEventListener("click", () => alert("Cartão adicionado."))

// desativando o reload da tela ai clicar no botao
document.querySelector("form").addEventListener("submit", (event) => event.preventDefault());

// pegando o input digitado no nome do titular e alterando na exibição do cartão
const cardHolder = document.querySelector("#card-holder");
cardHolder.addEventListener("input", () => {
    const ccHolder = document.querySelector(".cc-holder .value");
    //ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value;
    if(cardHolder.value.length === 0){
        ccHolder.innerText = "FULANO DA SILVA";
        return;
    }
    ccHolder.innerText = cardHolder.value;
    
})

// pegando o input do CVC e alterando na exibição do cartão
securityCodeMask.on("accept", () => updateCVC(securityCodeMask.value));

function updateCVC(code){
    const ccSecurity = document.querySelector(".cc-security .value");
    if(code.length === 0){
        ccSecurity.innerText = "1234"
        return;
    }
    ccSecurity.innerText = code;
}

//pegando o input do numero do cartão e alterando na exibição do cartão
cardNumberMask.on("accept", () => {
    const cardType = cardNumberMask.masked.currentMask.cardtype;
    setCardType(cardType);
    updateNumberCard(cardNumberMask.value)
});

function updateNumberCard(number){
    const ccNumber = document.querySelector(".cc-number");
    ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number;
}

expirationDateMask.on("accept", () =>{updateDate(expirationDateMask.value)});

function updateDate(date){
    const ccDate = document.querySelector(".cc-expiration .value");
    ccDate.innerText = date.length === 0 ? "11/22" : date;
}