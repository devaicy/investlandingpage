$(document).ready(function() {
	$(document).on('submit', '#comment_form', function(event) {
		event.preventDefault();
		var comment = $('#comment').val();
		var email = $('#user_email').val();
		var name = $('#user_name').val();
		if ($('#cache_data').is(':checked')) {
			var cache_data = 'checked';
		} else {
			var cache_data = 'null';
		}
		var id = $(this).attr('name');
		var comment_id = $('#cast_comment_id').val();

		if (comment == '' || comment == 'your comment here' || email == '' || name == '') {
			$('.alert_msg').css('display', 'block');
			$('.alert_msg').html('<div class="bdr-3 alert alert-danger fade in alert-dismissible px-18 bottom-5"><a href="#" class="close" data-dismiss="alert" aria-label="close"><span class="fa fa-times"></span></a><span class="fa fa-info-circle fa-spin"></span>&nbsp;&nbsp;Fields cannot be empty</div><div class="clearfix"></div>').hide().slideDown(300).delay(6000).slideUp(500);
		} else {
			$.ajax({
				url: 'classes/process.php?action=addcomment',
				type: 'POST',
				dataType: 'JSON',
				data: {'post_id':id,'user_email':email,'user_comment':comment,'user_name':name,'comment_id':comment_id,'cache_data':cache_data},
				success: function(data){
					if ('error' in data) {
						$('.alert_msg').css('display', 'block');
						$('.alert_msg').html('<div class="bdr-3 alert alert-danger fade in alert-dismissible px-18 bottom-5"><a href="#" class="close" data-dismiss="alert" aria-label="close"><span class="fa fa-times"></span></a><span class="fa fa-info-circle fa-spin"></span>&nbsp;&nbsp;'+data.error+'</div><div class="clearfix"></div>').hide().slideDown(300).delay(6000).slideUp(500);
					} else {
						$('#comment').val('');
						$('#comment_content').load(location.href + " #comment_content>*","");
						$('.alert_msg').css('display', 'block');
						$('.alert_msg').html('<div class="bdr-3 alert alert-success fade in alert-dismissible px-18 bottom-5"><a href="#" class="close" data-dismiss="alert" aria-label="close"><span class="fa fa-times"></span></a><span class="fa fa-info-circle fa-spin"></span>&nbsp;&nbsp;'+data.success+'</div><div class="clearfix"></div>').hide().slideDown(300).delay(6000).slideUp(500);
					}
				}
			});
		}
	});

	// $(document).on('click', '#reply_btn', function(event) {
	// 	event.preventDefault();
	// 	swal('Reeply is Working');
	// });
	
	$(document).on('click', '#load_comments_btn', function() {
		$('#loader').slideDown(500).queue(function(next) {
			$('#load_comments').css('display', 'block').hide().delay(1000).slideDown(500);
			$(this).delay(1000).slideUp(500);
			next();
		});
		$('#load_comments_btn').delay(2000).slideUp(500);
	});

	$(document).on('click', '#how_btn', function() {
		$('#how_con').toggleClass('rota');
	});

});
function castID(comment_id) {
	$('#cast_comment_id').val(comment_id);
	$('#comment_btn').html('<span class="fa fa-comment"></span> <b><i>Add Reply</i></b>');
}

$(document).on('submit', '#subForm', function(event) {
	event.preventDefault();
	var email = $('#sub').val();
	if (email != '') {
		$.ajax({
			url: 'classes/process.php?action=subscribe',
			type: 'POST',
			dataType: 'JSON',
			data: {'email':email},
			success: function(data){
				if ('error' in data) {
					swal(data.error,'Email exists... Use another email please','error');
				} else {
					$('#sub').val('');
					swal(data.success,'A Confirmation mail will be sent shortly','success');
				}
			}
		});
	}
});

$(document).on('submit', '#contact-form', function(event) {
	event.preventDefault();
	var formdata = $(this).serialize();
	$.ajax({
		url: 'classes/process.php?action=contact',
		type: 'POST',
		dataType: 'JSON',
		data: formdata,
		success: function(response) {
			if ('error' in response) {
				swal(response.error,'An error has occurred, Please try again','error');
			} else {
				swal(response.success,'Check your inbox for reply','success');
			}
		}
	});
	
});

