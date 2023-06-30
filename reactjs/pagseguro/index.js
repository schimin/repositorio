import {EncryptCardPagSeguro, EncryptCardPagSeguroLoad} from './encrypt'

const chavePublicCripto = 'CHAVE PUBLICA DA ENCRIPTAÇÃO'


useEffect(() => {
    
    EncryptCardPagSeguroLoad() // Load do script

}, []);


const handleSubmit = async (e) => {

    let card = {
        publicKey: chavePublicCripto,
        holder: 'Nome do cliente no cartão',
        number: 'numero do cartão',
        expMonth: '00 mes do vencimento no cartão',
        expYear: '0000 ano de vencimento do cartão',
        securityCode: '0000 numero CVV do cartão',
    }

    let encryptCard = await EncryptCardPagSeguro(card)

    if (encryptCard.hasErrors) {
        // aviso de erro caso tenha algum problema na encriptação
    }

}

// segue os codigos...