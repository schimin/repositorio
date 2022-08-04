(async () => {
  let erros = [];
  let total = listaDeItens.length;
  let executado = 0;
  const promises = listaDeItens.map(async (item, index) => {
    return await $.post('pedidos/insert_item', item, function (result) {
      executado += 1;
      result = $.parseJSON(result);
      if (result.valor_total != '-1') {
        document.getElementById('valor_total_do_pedido').innerHTML = result.valor_total;
      } else if (result['msg'] != '') {
        erros.push(result['msg']);
      }
      if (executado > 0) {
        let percentual = (100 / total) * executado;
        console.log(percentual);
      }
    });
  });
  await Promise.all(promises);
  console.log('Finished!');
  fechaAvisoPost();
})();
