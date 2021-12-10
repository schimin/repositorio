return $.ajax({
    url: `endereco.com.br`,
    type: 'POST',
    data: {'id': id},
    cache: false,
    dataType: 'json',
    //async: false,
    error: function (request, error) {
      console.log('error: ', request, error);
    },
    success:function(res){
        console.log('sucess: ', res);
    }
    })
    .always(function() {

    });
