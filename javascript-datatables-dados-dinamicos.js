<table class="table table-striped tabelaPendentes" id="tabelaPendentes">
											<thead>
												<tr>
													<th class="centralizado">Cod. Entrega</th>
													<th class="centralizado">Descrição</th>
													<th class="centralizado">Realizada / Total</th>
													<th class="centralizado">Data</th>
													<th class="centralizado">Motorista / Veículo</th>
													<th class="centralizado">Status / Última Ação</th>
													<th class="centralizado">Opções</th>
												</tr>
											</thead>
											<tbody>	
											</tbody>
										</table>

$(document).ready( function () {
		$.fn.dataTable.moment('DD/MM/YYYY');
		$('table.tabelaPendentes').DataTable({
			stateSave: false,
			order: [[0, 'asc']],
			paging:   false,
			dom:'Bfrtip',
			"language": {
				"processing":"<div class='loader'></div>",
				"infoEmpty": "Tabela está vazia",
				"emptyTable": "<div style='margin: 0 auto' class='loader'></div>",
				"search": "",
				"searchPlaceholder": "Pesquisar",
				"info":    "Mostrando de _START_ a _END_ de _TOTAL_",
				"infoFiltered": "(filtrado do total de registros _MAX_)",
				"oPaginate": {
					"sFirst": "Início",
					"sPrevious": "Anterior",
					"sNext": "Próximo",
					"sLast": "Fim"
				}
			}
		});

function buscarPendentes() {
		console.log('acessou buscarPendentes');
		AvisoLoaderEntregas();	

		return $.ajax({
            url: BASE_URL+`logistica/entregas_pendentes`,
            type: 'POST',
            cache: false,
			dataType: 'json',
            //async: false,
            error: function (request, error) {
                    console.log('error: ', error);
					fechaAvisoPost();
					alert_simples_retorno(error);
                },
				success:function(res){
					fechaAvisoPost();
				$("table.tabelaPendentes").DataTable().destroy();
				
				if (res){
					console.log('tem res ', res, typeof res, res.length);
					if (res.length > 0 ) {
						//var res_ = JSON.parse(res);
						//console.log('tem res_ ', res_);
						//var res_ = res;
						var html = "";
		
						for (var i = 0; i < res.length; i++) {
							//var dados = JSON.stringify(res_[i]);
							let status = '';
							if (res[i].dh_created && res[i].dh_ultima_atualizacao == null){
								status = 'Enviado';
							}else if(res[i].dh_created == null){
								status = 'Não Enviado';
							}else {
								status = formataDataHoraUsBr(res[i].dh_ultima_atualizacao);
						
							}

							let dataFormatada =formataDataHoraUsBrData(res[i].Data);
							

							html += "<tr>";
							html += "<td class='centralizado'><small>"+ res[i].id +"</small></td>";
							html += "<td class='centralizado'><small>"+res[i].descricao_entrega +"</small></td>";
							html += "<td class='centralizado'><small>"+res[i].entrega_realizada +"/"+ res[i].NroPedidos+"</small></td>";
							html += "<td class='centralizado'><small >"+ dataFormatada +"</small></td>";
							html += "<td class='centralizado'>"+res[i].Motorista +" / "+res[i].placa+"</td>";
							html += "<td class='centralizado'>"+status+"</td>";
							html += "<td class='centralizado'>";

							if (res[i].dh_created == null) {
								let opcao = "pendentes";
								html += "<button type='button' class='btn btn-facebook p-1 ml-1 ' >";
								html += "<i onclick='enviar_mobile(" + res[i].id + ", this)' data-toggle='tooltip' data-placement='top' title='Enviar Mobile' class='mdi mdi-cellphone-android' id='enviarMobilePendentes'></i>";
								html += "</button>";

								html += "<button type='button' class='btn btn-facebook p-1 ml-1 ' >";
								html += "<i class='mdi mdi-check mouse' onclick='finalizarEntrega(" + res[i].id + ")' data-toggle='tooltip' data-placement='bottom' title='Clique aqui para marcar essa entrega como finalizada, e ela sairá da tela de pendentes.'></i>";
								html += "</button>";
								
							}else {
								if (res[i].dh_ultima_atualizacao == null) {
									html += "<button type='button' class='btn btn-facebook p-1 ml-1' >";
									html += "<i class='mdi mdi mdi-delete-forever mouse' onclick='enviar_cancelar(" + res[i].id + ", this)' data-toggle='tooltip' data-placement='top' title='Cancelar Mobile' id='cancelarMobilePendentes'></i>";
									html += "</button>";


								}
								html += "<button type='button' class='btn btn-facebook p-1 ml-1' >";
								html += "<i class='mdi mdi-information-variant mouse' onclick='buscar_detalhes(" + res[i].id + ")' data-toggle='tooltip' data-placement='top' title='Detalhes'></i>";
								html += "</button>";

								html += "<button type='button' class='btn btn-facebook p-1 ml-1' >";
								html += "<i class='mdi mdi-google-maps mouse' onclick='abrirMapa(" + res[i].id + ")' data-toggle='tooltip' data-placement='top' title='Mapa'></i>";
								html += "</button>";

							}

							
							
							
							html += "</td>";

							html += "</tr>";
							
						}

					}else {
						console.log('tem res mas ta zerado');
					}
				}else {
					console.log('nãp tem res ');
				}
                //var res_ = JSON.parse(res);
				
                //$("table.tabelaPendentes").html("").append(html);
                //console.log('OK', res_);
				
				$("table.tabelaPendentes tbody").html("").append(html);
				$.fn.dataTable.moment('DD/MM/YYYY');
                        var tableP = $("table.tabelaPendentes").DataTable({
                            stateSave: false,
							order: [[0, 'asc']],
                            paging: false,
                            dom:'Bfrtip',
							"columns": [
									{ "width": "5%" },
									{ "width": "15%" },
									{ "width": "5%" },
									{ "width": "10%" },
									{ "width": "25%" },
									{ "width": "20%" },
									{ "width": "20%" }
								],
                            "language": {
								"processing":"<div class='loader'></div>",
                                "infoEmpty": "Tabela está vazia",
								"emptyTable": "Nenhum resultado encontrado.",
                                "search": "",
                                "searchPlaceholder": "Pesquisar",
                                "info":    "Mostrando de _START_ a _END_ de _TOTAL_",
                                "infoFiltered": "(filtrado do total de registros _MAX_)",
                                "oPaginate": {
                                    "sFirst": "Início",
                                    "sPrevious": "Anterior",
                                    "sNext": "Próximo",
                                    "sLast": "Fim"
                                }
                                
                            }
                        });
				
						
					}
            
        })
        .fail(function() {
			fechaAvisoPost();
                alert( "erro");
            });
	}
