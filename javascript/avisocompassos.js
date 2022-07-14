avisoPost();
let passo = 1;
setInterval(()=>{
  fechaAvisoPost();
  swal({
    title: `Replicando Dados  ${passo}`,
    text: "Aguarde o processo ser finalizado",
    icon: 'warning',
    closeOnClickOutside: false,
    closeOnEsc: false,
    buttons:false,
  });

  setInterval(() => {
    setTimeout(() => {
      swal({
        title: `Replicando Dados  ${passo++}`,
        text: "Aguarde o processo ser finalizado",
        icon: 'warning',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons:false,
      });
    }, 2000);
  },1500);

},1500)


// No ultimo passo colocar:

swal({
			title: "Os dados foram replicados ",
			text: "Obrigado por aguardar.",
			icon: 'success',
			closeOnClickOutside: false,
			closeOnEsc: false,
		});