	ajaxForms.push({
		id: 'formAuth',
		init: function () 
		{
		},
		beforeSubmit: function (arr, $form, options)
		{
		},
		success: function (responseText, statusText, xhr, $form)
		{
			document.location.href = 'lk';			
		}			
	});

	ajaxForms.push({
		id: 'formReg',
		init: function () 
		{
			$('#formReg select[name=distr]').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
				$.ajax({type:'GET',
						url: "data-users",
						data:{ id: $('#formReg select[name=distr] option:selected').val() },
						success:function(data){
							parse_get_data($('#formReg select[name=user]'),data);							
							$('#formReg select[name=user]').selectpicker('refresh');
						}
				});	  
			});
		},
		beforeSubmit: function (arr, $form, options)
		{
			if ($('#formReg select[name=distr] option:selected').val() == '')
			{
				bootbox.alert('Выберите дистрибьютора из списка!');
				return false;				
			}
			
			if ($('#formReg select[name=user] option:selected').val() == '')
			{
				bootbox.alert('Выберите торгового представителя из списка!');
				return false;				
			}
		},
		success: function (responseText, statusText, xhr, $form)
		{
			bootbox.alert({
				message: responseText.message + ' ',
				callback: function() {				
					$('#modal-reg').modal('hide');
				}
			});
		}			
	});

	ajaxForms.push({			
		id: 'formRestore',
		init: function () 
		{
		},
		beforeSubmit: function (arr, $form, options)
		{
		},
		success: function (responseText, statusText, xhr, $form)
		{
			$('#modal-recovery').modal('hide');
			
			bootbox.alert({
				message: responseText.message + ' '
			});				
		}			
	});

	ajaxForms.push({
		id: 'formTT',
		init: function () 
		{			
			$('#formTT select[name=distr]').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
				$.ajax({type:'GET',
						url: "data-users",
						data:{ id: $('#formTT select[name=distr] option:selected').val() },
						success:function(data){
							parse_get_data($('#formTT select[name=user]'),data);							
							$('#formTT select[name=user]').selectpicker('refresh');
						}
				});	  
			});
		},
		beforeSubmit: function (arr, $form, options)
		{
			if ($('#formTT select[name=distr] option:selected').val() == '')
			{
				bootbox.alert('Выберите дистрибьютора из списка!');
				return false;				
			}
			
			if ($('#formTT select[name=user] option:selected').val() == '')
			{
				bootbox.alert('Выберите торгового представителя из списка!');
				return false;				
			}
		},
		success: function (responseText, statusText, xhr, $form)
		{
			bootbox.alert({
				message: responseText.message + ' ',
				callback: function() {				
					document.location.reload();
				}
			});
		}			
	});

	ajaxForms.push({
		id: 'formTTLink',
		init: function () 
		{
			$("#formTTLink input[name=tt]").autocomplete({
				source: function( request, response ) {
					
					$.ajax({
						url: "data-participant",
						data: {
							search: request.term
						},
						success: function( data ) {
							response( $.map( $.parseJSON(data), function( item ) {
								return {
									label: item.txt,
									value: item.txt,
									data: item.id
								}		  
							}));					
						}	
					});
				},
				minLength: 3,
				select: function( event, ui ) {
					$(event.target).trigger('change');
					$("#formTTLink input[name=participantid]").val(ui.item.data);
				}
			});				

		},
		beforeSubmit: function (arr, $form, options)
		{
			if ($form.find('input[name=participantid]').val() == "")
			{
				$form.find('input[name=tt]').val('');
				if ($form.find('input[name=tt]').hasClass('validate'))
					$form.find('input[name=tt]').addClass('is-invalid');				
				bootbox.alert('Выберите торговоую точку из списка!');
				return false;
			}
		},
		success: function (responseText, statusText, xhr, $form)
		{
			bootbox.alert({
				message: responseText.message + ' ',
				callback: function() {				
					document.location.reload();
				}
			});
		}			
	});

	ajaxForms.push({
		id: 'formFeedback',
		init: function () 
		{
		},
		beforeSubmit: function (arr, $form, options)
		{
		},
		success: function (responseText, statusText, xhr, $form)
		{
			// bootbox.alert(responseText.message + ' ', function() {
				// document.location.reload();
			// });   
			$('#modalThanks').modal('show');
			$('#formFeedback').resetForm();
		}			
	});
	
	ajaxForms.push({
		id: 'formPersonal',
		init: function () 
		{
			$.ajax({type:'GET',
					url:"https://cp.i-actions.ru/reports2/get.php",
					data:{act:'get_addr_str',country:$('#formPersonal input[name=country]').val(),region:$('#formPersonal input[name=region]').val(),area:$('#formPersonal input[name=area]').val(),settlement:$('#formPersonal input[name=settlement]').val()},
					dataType:'jsonp',
					success:function(data){
						$('#formPersonal input[name=city]').val(data.txt);
						$('#formPersonal input[name=city]').attr('title',data.txt);
						$('#formPersonal input[name=addr]').val(data.txt);			
					}
			});			
			$.ajax({type:'GET',
					url:"https://cp.i-actions.ru/reports2/get.php",
					data:{act:'get_street',country:$('#formPersonal input[name=country]').val(),region:$('#formPersonal input[name=region]').val(),area:$('#formPersonal input[name=area]').val(),settlement:$('#formPersonal input[name=settlement]').val(),street:$('#formPersonal select[name=street] option:selected').val()},
					dataType:'jsonp',
					success:function(data){
						parse_get_data($('#formPersonal select[name=street]'),data);
						$('#formPersonal select[name=street]').selectpicker('refresh');
					}
			});	  
	
			$("#formPersonal input[name=city]").autocomplete({
				source: function( request, response ) {
					$('#formPersonal input[name=country]').val('');
					$('#formPersonal input[name=region]').val('');
					$('#formPersonal input[name=area]').val('');
					$('#formPersonal input[name=settlement]').val('');
					$('#formPersonal select[name=street]').empty();
					
					$.ajax({
						url: "https://cp.i-actions.ru/reports2/get.php",
						dataType: "jsonp",
						data: {
							act: "get_addr_by_search",
							country: [1],
							search: request.term
						},
						success: function( data ) {
							response( $.map( data, function( item ) {
								return {
									label: item.txt,
									value: item.txt,
									data: item.id
								}		  
							}));					
						}	
					});
				},
				minLength: 3,
				select: function( event, ui ) {
					$(event.target).trigger('change');
					
					$('#formPersonal input[name=country]').val(ui.item.data.country);
					$('#formPersonal input[name=region]').val(ui.item.data.region);
					$('#formPersonal input[name=area]').val(ui.item.data.area);
					$('#formPersonal input[name=settlement]').val(ui.item.data.settlement);						
					
					$('#formPersonal input[name=addr]').val(ui.item.label);

					$('#formPersonal select[name=street]').addClass('ui-autocomplete-loading');
				
					$.ajax({
						type:'GET',
						url: "https://cp.i-actions.ru/reports2/get.php",
						data:{act:'get_street',country:ui.item.data.country,region:ui.item.data.region,area:ui.item.data.area,settlement:ui.item.data.settlement,street:$('#formPersonal select[name=street] option:selected').val()},
						dataType:'jsonp',
						success:function(data){
							$('#formPersonal select[name=street]').removeClass('ui-autocomplete-loading');
							parse_get_data($('#formPersonal select[name=street]'),data);
							$('#formPersonal select[name=street]').selectpicker('refresh');
						}
					});			
					
				}
			});	
			
		},
		beforeSubmit: function (arr, $form, options)
		{
			if (!innCheck($form.find('input[name=inn]').val()))
			{
				bootbox.alert('Некорректный ИНН!');
				return false;
			}
			if ($form.find('input[name=settlement]').val() == "")
			{
				$form.find('input[name=city]').val('');
				if ($form.find('input[name=city]').hasClass('validate'))
					$form.find('input[name=city]').addClass('is-invalid');				
				bootbox.alert('Выберите город регистрации из списка!');
				return false;
			}
			// if ($form.find('input[name="file[]"]').val() == "")
			// {
				// bootbox.alert('Не приложены сканы документов!');
				// return false;
			// }		
		},
		success: function (responseText, statusText, xhr, $form)
		{
			bootbox.alert({
				message: responseText.message + ' ',
				callback: function() {				
					document.location.reload();
				}
			});
		},
	});
	
	function parse_get_data(object,data)
	{
		object.empty().css('opacity','1').append("<option value=''>");

		if (data['data'].length)
		{
			for (optgrp in data['data'])
			{
				elem = jQuery("<optgroup label='"+data['data'][optgrp][0]+"'>");

				for(key in data['data'][optgrp][1]) {
					elem.append("<option value='"+data['data'][optgrp][1][key][0]+"'>"+data['data'][optgrp][1][key][1]);
				}

				object.append(elem);
			}
			if (data['selectedIndex'].length)
			{
				for(key in data['selectedIndex']) 
				{
					object.find('option[value='+data['selectedIndex'][key]+']').attr('selected','true');
				}
			}
		}
		else
			object.append("<option value='0'>Нет данных</option>");
			
		return ;
	}		
	