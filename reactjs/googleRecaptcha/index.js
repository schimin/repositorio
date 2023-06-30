
import { ObterTokenRecaptchaLoad, ObterTokenRecaptcha } from 'Recaptcha'


useEffect(() => {

    ObterTokenRecaptchaLoad('checkout')
},[])

const handleSubmit = async (e) => {

    let googleToken = await ObterTokenRecaptcha('checkout')

    if (!googleToken) { 
        // caso tenha dado alguma problema
    }
}