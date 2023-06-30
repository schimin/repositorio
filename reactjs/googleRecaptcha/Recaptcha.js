export async function ObterTokenRecaptchaLoad(_modelo){
    let nomeFuncao = 'ObterTokenRecaptchaLoad'
    try {
        let publicKey = 'CHAVE'
   

        const script = await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://www.google.com/recaptcha/enterprise.js?render=" + publicKey;
            script.async = false;
            script.defer = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });

        return script;
    } catch(error){
        //throw error;
        return false
    }
}

export async function ObterTokenRecaptcha(_modelo){ 
    let nomeFuncao = 'ObterTokenRecaptcha'
    try {
        let publicKey = 'CHAVE'

        const token = await new Promise((resolve, reject) => {
        window.grecaptcha.enterprise.ready(() => {
            window.grecaptcha.enterprise.execute(publicKey, { action: _modelo })
                .then(resolve)
                .catch(reject);
            });
        });

        return token;
    } catch(error){
       
        //throw error;
        return false

    }

}