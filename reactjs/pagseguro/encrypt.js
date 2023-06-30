export async function EncryptCardPagSeguroLoad(){
    let nomeFuncao = 'EncryptCardPagSeguroLoad'

    const pagSeguroScriptUrl = 'https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js';


    const script = document.createElement('script');
    script.src = pagSeguroScriptUrl;
    script.async = false;
    //script.onload = encryptCard;
    
    document.body.appendChild(script);

    return true;
    

}

export async function EncryptCardPagSeguro(cardData) {
    let nomeFuncao = 'EncryptCardPagSeguro'


    if (window.PagSeguro && window.PagSeguro.encryptCard) {
            const card = window.PagSeguro.encryptCard({
              publicKey: cardData.publicKey,
              holder: cardData.holder,
              number: cardData.number,
              expMonth: cardData.expMonth,
              expYear: cardData.expYear,
              securityCode: cardData.securityCode
            });

            const resposta = {
                hasErrors : card.hasErrors,
                errors: card.errors,
                encryptedCard: card.encryptedCard
            }
            return resposta
     
    } else {

            const resposta = {
                hasErrors : true,
                errors: 'Problema com criptografia do Pagseguro',
                encryptedCard: ''
            }
            return resposta;
           
    }
}