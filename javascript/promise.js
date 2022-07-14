// PROMISE
// Situações: Pending, Fulfilled e Rejected


const doSomeThingPromise = () =>
  new Promise((resolve, reject) => {
    setTimeout(function() {
      //faça algo
      resolve('First Data');
    }, 1000);
  });

const doOtherThingPromise = () =>
  new Promise((resolve, reject) => {
    setTimeout(function() {
      //faça algo
      resolve('First Data');
    }, 1000);
  });

// Execução sequencial
// Dessa forma apenas um catch para todos os erros.
doSomeThingpromise()
.then(data => {
  console.log(data);
  return doOtherThingPromise();
})
.then(data2 => console.log(data2))
.catch(error => console.log('Ops', error));

// Executa ao mesmo tempo
Promise.all([doSomeThingPromise(), doOtherThingPromise()]).then(data => {
  // fazer algo
}).catch(err => {
  // algo
});

// Qual resolver primeiro mostra o resultado antes
Promise.race([doSomeThingPromise(), doOtherThingPromise()]).then(data => {
  // fazer algo
}).catch(err => {
  // algo
});       
