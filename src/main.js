import "./css/index.css"
import IMask from "imask";

const ccColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path"); // o querySelector tem a funcionalidade 
//de selecionar um elemento html para fazer a alteração que eu quiser (busca pelo seletor)
const ccColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

// const ccDadosNumero = document.querySelector(".input-wrapper #card-number");
// const ccDados = document.querySelector(".cc-number");

// console.log(ccDados);
// console.log(ccDadosNumero);


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

setCardType("visa");

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
       console.log(foundMask)
       return foundMask;
    },
}
const cardNumberMask = IMask(cardNumber, cardNumberPattern);