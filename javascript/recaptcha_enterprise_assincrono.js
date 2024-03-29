// função que aguarda o token para usar no recaptcha enterprise v3
async function obterTokenRecaptcha() {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = "https://www.google.com/recaptcha/enterprise.js?render=" + publicKey;
                script.async = true;
                script.defer = true;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });

            const token = await new Promise((resolve, reject) => {
            grecaptcha.enterprise.ready(() => {
                grecaptcha.enterprise.execute(publicKey, { action: 'login' })
                    .then(resolve)
                    .catch(reject);
                });
            });

            console.log('Token do reCAPTCHA:', token);
            // Faça algo com o token aqui, como enviá-lo para o seu servidor.
            return token;
            
        }

/*
Antes usava assim, mas não estava carregando de forma assincrona:
async function carregarScript() {
            try {
                await $.getScript("https://www.google.com/recaptcha/enterprise.js?render=" + publicKey);
                //await grecaptcha.enterprise.ready()
                console.log('carregou script')
                return true
            } catch (error) {
                console.error("Ocorreu um erro ao carregar o script recaptcha: " + error);
                return false
            }
        }
        
        e depois :
        
        const response = await grecaptcha.enterprise.execute(publicKey, {action: modelo});
                return response;

*/
