# LOOP

var.forEach(carros, (item, index)=>{
	console.log(item, index);
});

for (let i =0; i< carros.lenght; i++){
	console.log(carros[i], i);
}

## Loop de um Json:
Object.entries(json).forEach(([key, value]) => {
     console.log(`${key} ${value}`);
});

# MAP

const myMap = new Map()

// adicionar
myMap.set(‘apple’, fruit);
// Map(1) { “apple” => “fruit” }

// consultar
myMap.get(‘apple’’);

// deletar
myMap.delete(“apple”)
// true

// não existe mais na coleção
myMap.get(‘apple)
// undefined


Exemplo:

for ([key, value] of map){
	…
}
# FILTER

Filtra apenas valores que estão na array
cria novo array, não modifica o array original.

array.filter(callback, thisArg);


# SET

Só aceitam valores únicos

const myArray = [1,2,3];

const mySet = new Set(myArray);

Tamanho é com size

------

const mySet =  new Set();

mySet.add(1);

mySet.has(1);
// true

mySet.delete(5);


# SPREAD

…

typeof // mostra o tipo da variavel

	
# MODULOS


export { nomeFuncao} // Para exportar a função:

# ERROS

function tryCatchExemplo(string){
  try{
    executFuncao(string)
  }
  catch(e){
  console.log(e) // mostra apenas no console.
    throw e; // mostra erro no browser
  }
  
 
  finally {
    // instrucao finally SEMPRE executa, com erro ou não.
  }
    
  
  ---
  
  throw new ReferenceError("Mensagem"); // erro de referencia
  throw new TypeError("Mensagem"); // Erro de Tipo
  throw new RangeError("Mensagem"); //erro de reference
  
  if (e instanceof ReferenceError) {
    // Este erro é um reference error
    // e.name e.stack e.message
    throw e;
  }

# Objeto Error
	
new Error(message, fileName, lineNumber);
const MeuErro = new Error('Mensagem Invalida');
throw MeuErro;
	
# Erros podem ter nomes;
MeuErro.name = 'InvalidMessage';


# PROMISES

3 Estados: Pending, Fulfilled e Rejected

Estrutura:

const myPromise = new Promise((resolve, reject) =>{
	windows.setTimeout(() => {
		resolve(console.log('resolvida!'));
	}, 200);
});

async function resolvePromise() {
	const myPromise = new Promise((resolve, reject) =>{
	windows.setTimeout(() => {
		resolve(console.log('resolvida!'));
	}, 200);
 });

	const resolved = await myPromise
	.then((result) => result + ' passando pelo then')
	.then((result) => result + ' e agora acabou!')
	.catch((err) => console.log(err.message));
	return resolved;
}

Pode ser usado com try catch.

## Exemplo de uso com Database Realtime Firebase:

function getUsage(valor) {
    let id      = 'usage';
    let ref     = db.ref(id).child(chave).child(loja);

    return new Promise((resolve, reject) => {
        const onError = error => reject(error);
        const onData = snap => resolve(snap.val());

        ref.on("value", onData, onError);
    });
}
getUsage(chave, loja)
    .then((value) => {
       console.log('deu certo vem valor de retorno');
        })
    .catch((error) => {
        console.log(error);
        });



# FETCH

fecth('https://enderecoapi', {
	method: 'GET'
	cache: 'no-cache',
	})
	.then(response => response.json())
	.then(json => console.log(json))


# OOP

class ContaBancaria {
	constructor(agencia, numero, tipo){
		this.agencia = agencia;
		this.numero = numero;
		this.tipo = tipo;
		this._saldo = 0;
	}
	get saldo(){
		return this._saldo;
	}
	set saldo(valor){
		this._saldo = valor;
	}
	
	sacar(valor){
		if (valor > this._saldo){
			return 'Operação Negada';
		}
		this._saldo = this._saldo - valor;
		return this._saldo;
	}
	
	class ContaPoupanca extends ContaBancaria {
		constructor(agencia, numero){
			super(agencia, numero);
			this.tipo = 'poupança';
		}
	}
}