	var site = {url:""};

  function alert_msg(msg,type){
    if (type == 'error') {
      swal("Oops, An error occured",msg,type);
    } else if (type == 'success') {
      swal("Successful",msg,type);
    }
  }


  $(document).on('submit','#submitlogin', function(e){
    e.preventDefault();
    $('#button_action2').html('<i class="fa fa-refresh fa-spin"></i> Loading.....');
     $.ajax({
      type: "POST", 
      url:"includes/users.php?action=submitloginajax",
       data: $(this).serialize(),
       cache: false, 
       dataType: "JSON",
      success: function(response) {
        if ('error' in response) {
          setTimeout(function() {
          $('#button_action2').html('login');
          alert_msg(response.error,'error');
      }, 4000);
        } else {
          setTimeout(function() {
          $('#button_action2').html('login');
          alert_msg(response.success,'success');
          setTimeout(function() {
            window.location.href = 'authed';
          }, 5000);
      }, 5000);
        }
        
      }
    });
  });




  $(document).on('submit','#signupForm', function(e){
    e.preventDefault();
    $.ajax({
      type: "POST", url:"includes/library.php?action=msignup", data: $(this).serialize(), cache: false, dataType: "JSON",
      success: function(response) {
        if (response.status == 'success') {
          $.notify({
            icon: 'fa fa-info-circle',title: ' &nbsp; ',message: response.msg
          },{
            type: "success",delay: 0,placement: {from: "top",align: "center"}
          });
          if ('url' in response) {
            setTimeout(function() {
              window.location.assign(response.url);
            }, 2000);
          }
        } else if (response.status == 'error') {
          $.each(response, function(index, msg) {
            if (index == 'status') {
            } else {
              flash('danger',null,msg);
            }
          });
        }
      }
    });
  });

//----------------------------------

  $(document).on('submit','#submitFormacc', function(e){
    $('#button_actionacc').html('<i class="fa fa-refresh fa-spin"></i> Loading.....');
    e.preventDefault();
    $.ajax({
      type: "POST", 
      url:"includes/users.php?action=msignupajax",
       data: $(this).serialize(), cache: false, 
       dataType: "JSON",
      success: function(response) {
        if ('error' in response) {
          setTimeout(function() {
          $('#button_actionacc').html('register');
          alert_msg(response.error,'error');
      }, 2000);
        } else {
          setTimeout(function() {
          $('#button_actionacc').html('register');
          alert_msg(response.success,'success');
      }, 2000);
        }
        
      }
    });
  });





$(document).on('submit','#signupVeri', function(e){
    $('#regverify').html('<i class="fa fa-refresh fa-spin"></i> Loading.....');
    e.preventDefault();
    $.ajax({
      type: "POST", 
      url:"includes/users.php?action=regverify",
       data: $(this).serialize(), cache: false, 
       dataType: "JSON",
      success: function(response) {
        if ('error' in response) {
          setTimeout(function() {
          $('#regverify').html('regverify');
          alert_msg(response.error,'error');
      }, 2000);
        } else {
          setTimeout(function() {
          $('#regverify').html('regverify');
          alert_msg(response.success,'success');
      }, 2000);
        }
        
      }
    });
  });



$(document).on('submit','#loginVeri', function(e){
    $('#loginverify').html('<i class="fa fa-refresh fa-spin"></i> Loading.....');
    e.preventDefault();
    $.ajax({
      type: "POST", 
      url:"includes/users.php?action=loginverify",
       data: $(this).serialize(), cache: false, 
       dataType: "JSON",
      success: function(response) {
        if ('error' in response) {
          setTimeout(function() {
          $('#loginverify').html('loginverify');
          alert_msg(response.error,'error');
      }, 2000);
        } else {
          setTimeout(function() {
          $('#loginverify').html('loginverify');
          alert_msg(response.success,'success');
      }, 2000);
        }
        
      }
    });
  });




$(document).on('submit','#id_verify', function(e){
  e.preventDefault();
  $('#block').html(`
  <div class="text-center" style="margin-top:200px;">
    <progress id="progressBar" value="1" style="width:60%;" max="100"></progress>
    <br><br>
    <p style="font-size:15px;color:#fff;font-weight:bold;lettter-spacing:1px">
      Uploading... &nbsp; <span id="pcent"></span>%
    </p>
  </div>
  `).fadeIn(500);
  var filer = $('#id-file').prop('files')[0];
  var form_data = new FormData();
  form_data.append('card', filer);
    $.ajax({
      xhr : function() {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(ev) {
          if (ev.lengthComputable) {
            // console.log('Byte loaded ' + ev.loaded); console.log('Total size ' + ev.total); console.log('Uploaded  ' + (ev.loaded/ev.total));
            var percent = Math.round((ev.loaded/ev.total) * 100);
            $('#progressBar').val(percent);
            $('#pcent').text(percent);
          }
        });
        return xhr;
      },
      type: "POST",url: site.url+"includes/library.php?action=idverify",dataType: "JSON",data: form_data,contentType: false,processData: false,
      success: function(response){
        $('#block').fadeOut(500);
        $('#id-file').val('');
        if (response.status == 'success') {
          $('.mid-section').load(location.href + " .mid-section>*","");
        $.notify(
          {icon: 'fa fa-info-circle',title: ' &nbsp; ',message: response.msg},
          {type: "success",placement: {from: "top",align: "center"}
        });
      } else if(response.status == 'error') {
        $.each(response, function(index, msg) {
          if (index == 'status') {
          } else {
            flash('danger',' &nbsp; ',msg);
          }
        });
      }
      }
  });
});



 $(document).on('submit','#withrawform', function(e){
    $('#withdraw').html('<i class="fa fa-refresh fa-spin"></i> Loading.....');
    e.preventDefault();
   // $("input:radio[name=wallet_id] :checked").val(); // gets the value of the selected gender
 // gets the user type
    $.ajax({
      type: "POST", 
      url:"../includes/library.php?action=withdrawFund",
       data: $(this).serialize(), cache: false, 
       dataType: "JSON",
      success: function(response) {
        if ('error' in response) {
          setTimeout(function() {
          $('#withdraw').html('withdraw');
          alert_msg(response.error,'error');
      }, 2000);
        } else {
          setTimeout(function() {
          $('#withdraw').html('withdraw');
          alert_msg(response.success,'success');
      }, 2000);
        }
        
      }
    });
  });


$(document).on('keyup','#mainp', function(e){
  $(this).addClass('fperror');
  if ($(this).val().length > 7){
    $(this).removeClass('fperror');
    $(this).addClass('fpsuccess');
  } else {
    $(this).addClass('fperror');
  }
});

$(document).on('keyup','#dummyp', function(e){
  var pass = $('#mainp');
  $(this).addClass('fperror');
  if ($(this).val() === pass.val() && $(this).val() != '') {
    $(this).removeClass('fperror');
    $(this).addClass('fpsuccess');
    pass.addClass('fpsuccess');
  } else {
    pass.removeClass('fpsuccess');
  }
});


$("#changetext").keydown(function (e) {
  if (e.keyCode == 32) {
    return false; // return false to prevent space from being added
  }
});

$(document).on('click', '.changer', function(e) {
  $('#msg').html('');
  $('#changetext').attr('placeholder', '');
  $('#changetext').val('');
  type = $(this).attr('type');
  placeholder = $(this).attr('place');
  change_id = $(this).closest('span').attr('id');
  $('#changetext').attr({dum: change_id, type: type, placeholder: placeholder});
  $('#changerBox').hide();
  $('#changerBox').css({'top':e.pageY+20,'left':e.pageX-120});
  $('#changerBox').show(400, function() {
    $('#changetext').focus();
    $(document).on('click', 'body', function(event) {
      $target = $(event.target);
        if(!$target.closest('#changerBox').length && !$target.closest('.changer').length && $('#changerBox').is(":visible")) {
          $('#changerBox').hide(500);
          $('#changetext').attr({dum: '', type: '', placeholder: ''});
      }
    });
  });
});

$(document).on('click', '#changebtn', function(e) {
  e.preventDefault();
  e.stopPropagation();
  content = $('#changetext').val();
  if (content == '' || content.length < 3) {
    $('#msg').html(`
      <div style="padding:5px;margin:0px;margin-bottom:5px;border-radius:2px;" class="alert alert-danger text-center">
      <span class="fa fa-warning"></span> input not invalid
      </div>
    `);
  } else {
    $('#msg').html('');
    chang_id = $('#changetext').attr('dum');
    var changed_ids = $('#save-profile-changes').attr('ids', $('#save-profile-changes').attr('ids')+','+chang_id);
    if (change_id == 'change-dob') {
      var dt = new Date(content).toDateString();
      $('#'+chang_id+' b').html(dt.substr(dt.indexOf(' ') + 1));
    } else {
      $('#'+chang_id+' b').html(content);
    }
    $('#changerBox').hide(500);
  }
});

$(document).on('click', '#undo-profile-changes', function(e) {
  e.preventDefault();
  $('.top-section').load(location.href + " .top-section>*","");
});

$(document).on('click', '#save-profile-changes', function(e) {
  e.preventDefault();
  gender = $('input[name=gender]:checked').val();
  user_t = $('input[name=user_type]:checked').val(); // gets the value of the selected gender
  if (user_t == 'on') {user_type='d';}else{user_type='p';} // gets the user type
  desc = $('#change-desc').val();
  first_name = $('#change-first-name b').html().replace(/\s/g,'');
  last_name = $('#change-last-name b').html().replace(/\s/g,'');
  // dob = $('#change-dob b').html();
  phone = $('#change-phone b').html().replace(/\s/g,'');
  swal({
    position:'center',type: 'info',allowOutsideClick:true,title:'Save profile changes',showCancelButton:true,cancelButtonColor:'#ff6666',reverseButtons:true,confirmButtonText:'Save changes',
    html: 'Apply changes made to your profile, cancel if no changes were made.',
  }).then((result)=>{
    if (result.value) {
      $.ajax({
        type: "POST", url: site.url+"/assets/php/Authed.php?action=save-changes", data: {'desc':desc,'user_type':user_type,'gender':gender,'first_name':first_name,'last_name':last_name,'phone':phone}, cache: false, dataType: "JSON",
        success: function(response) {
          if (response.status == 'success') {
            $.notify({
              icon: 'fa fa-info-circle',title: ' &nbsp; ',message: response.msg
            },{
              type: "success",placement: {from: "top",align: "center"}
            });
          } else if (response.status == 'error') {
            $.each(response, function(index, msg) {
              if (index == 'status') {
              } else {
                $.notify({
                  icon: 'fa fa-info-circle',title: ' &nbsp; ',message: msg
                },{
                  type: "danger",placement: {from: "top",align: "center"}
                });
              }
            });
          }
        }
      });
    }
  });
});


$(document).on('submit','#resetForm', function(e){
  e.preventDefault();
  $('#resetbtn').attr('disabled', 'disabled');
  $('#resetbtn').html('<span class="fa fa-refresh fa-spin"></span> Please wait...');
  $.ajax({
    type: "POST", url: "includes/library.php?action=resetpass", data: $(this).serialize(), cache: false, dataType: "JSON",
    success: function(response) {
      if (response.status == 'success') {
        swal({
          position:'top',type: 'success',allowOutsideClick:false,title:'Password reset successful',showCancelButton:false,confirmButtonText:'Go to dashboard',
          html: response.msg+'<br><a href="'+response.url+'">Continue to dashboard.</a>',
        }).then((result)=>{
          window.location.assign(response.url);
        });
      } else if (response.status == 'error') {
        swal('Password reset failed',response.msg,'error');
      }
      $('#resetbtn').html('<span class="fa fa-refresh fa-spin"></span>&nbsp; <b>Reset my password</b>');
      $('#resetbtn').removeAttr('disabled');
    }
  });
});


$(document).on('submit','#forgotform', function(e){
  e.preventDefault();
  $('#fogotBtn').attr('disabled', 'disabled');
  $('#fogotBtn').html('<span class="fa fa-refresh fa-spin"></span> Please wait...');
  $.ajax({
    type: "POST",  url:"includes/library.php?action=fpass", data: $(this).serialize(), cache: false, dataType: "JSON",
    success: function(response) {
      if (response.status == 'success') {
        swal('Link sent successfully',response.msg,'success');
      } else if (response.status == 'error') {
        swal('Reset link failed to send',response.msg,'error');
      }
      $('#fogotBtn').html('<span class="fa fa-check-square"></span> Send me a reset link');
      $('#fogotBtn').removeAttr('disabled');
    }
  });
});






  $(document).on('submit','#signupProcessForm', function(e){
    e.preventDefault();
    var input_type = $('#vtype').val();
    $('#finish').html(`
      <span class="fa fa-refresh fa-spin"></span> &nbsp; &nbsp; <b>Please wait...</b>
      `);
    $('#finish').attr('disabled', 'disabled');
    $.ajax({
      type: "POST", url:"../includes/library.php?action=regged", data: $(this).serialize(), cache: false, dataType: "JSON",
      success: function(response) {
        if (response.status == 'success') {
          if ('finish' in response) {
            swal({
              position:'top',
              type: 'success',
              allowOutsideClick:false,
              title:'Registration completed',
              showCancelButton:false,
              confirmButtonText:'Go to dashboard',
              html: response.msg+'<br><a href="'+response.url+'"> Continue to dashboard.</a>',
            }).then((result)=>{
              window.location.assign(response.url);
            });
          } else {
            $.notify({
              icon: 'fa fa-info-circle',title: ' &nbsp; ',message: response.msg
            },{
              type: "success",delay: 0,placement: {from: "top",align: "center"}
            });
          }
          if ('url' in response) {
            setTimeout(function() {
              window.location.assign(response.url);
            }, 2000);
          }
        } else if(response.status == 'error') {
          if (input_type == 'terms') {
            $('#finish').html(`
              <b>Finish</b>  &nbsp; &nbsp; <span class="fa fa-check-circle"></span>
            `);
            $('#finish').removeAttr('disabled');
          } else {
            $('#finish').html(`
              <b>Next</b>  &nbsp; &nbsp; <span class="fa fa-arrow-circle-right"></span>
            `);
            $('#finish').removeAttr('disabled');
          }
          $.each(response, function(index, msg) {
            if (index == 'status') {
            } else {
              flash('danger',' &nbsp; ',msg);
            }
          });
        }
      }
    });
  });


$(document).on('submit','#Sign_Form', function(e){
    e.preventDefault();
    $.ajax({
      type: "POST", url:"includes/library.php?action=loginajax", data: $(this).serialize(), cache: false, dataType: "JSON",
      success: function(response) {
        if (response.status == 'success') {
          $.notify({
            icon: 'fa fa-info-circle',title: ' &nbsp; ',message: ``
            +response.msg+`
            <div class="alert text-center"><a href="`+site.url+`/user/welcome"><i class="fa fa-link"></i> Please click here</a> if not redirected.</div>`
          },{
            type: "success",delay: 0,placement: {from: "top",align: "center"}
          });
          setTimeout(function() {
            window.location.assign(site.url+'/user/welcome');
          }, 2000);
        } else if(response.status == 'error') {
          $.notify({
            icon: 'fa fa-info-circle',title: ' &nbsp; ',message: response.msg
          },{
            type: "danger",placement: {from: "top",align: "center"}
          });
          if ('url' in response) {
            setTimeout(function() {
              window.location.assign(response.url);
            }, 2000);
          }
        }
      }
    });
  });



   $('#btcprice').on('change', function(){
if (this.value=='Bronze') 
{
  $("#var-btc-qun").show();
}
else
{
  $("var-btc-qun-hide").hide();
}

});

// popovers Initialization
$(function () {
$('.examplepop').popover({
popcon: 'popbody'
})
})   


$('#popnow').popover('show')

 $(document).ready(function(){

    $('[data-toggle="popover"]').popover({


        placement : 'top',

        trigger : 'hover'

    });

});    


function checkGender(gender){
  if (gender == 'm') {
    $('#gender-m').addClass('gend');
    $('#gender-f').removeClass('gend');
    $('#gender-o').removeClass('gend');
    $('#gender-div .fa-check').hide();
    $('#gender-m .fa-check').show();
  } else if (gender == 'f') {
    $('#gender-f').addClass('gend');
    $('#gender-m').removeClass('gend');
    $('#gender-o').removeClass('gend');
    $('#gender-div .fa-check').hide();
    $('#gender-f .fa-check').show();
  } else if (gender == 'o') {
    $('#gender-o').addClass('gend');
    $('#gender-m').removeClass('gend');
    $('#gender-f').removeClass('gend');
    $('#gender-div .fa-check').hide();
    $('#gender-o .fa-check').show();
  } else {
    $('#gender-m').removeClass('gend');
    $('#gender-f').removeClass('gend');
    $('#gender-o').removeClass('gend');
    $('#gender-div .fa-check').hide();
    flash('danger','Error : ','Gender selection is invalid');
  }
}

$('.box label').on('click', function(e) {
  e.stopPropagation();
  $(this).find('.fa').addClass('fa-check-circle');
});






$(document).on('submit','#profileSignupProcessForm', function(e){
  e.preventDefault();
  $('#finish').html(`
    <span class="fa fa-refresh fa-spin"></span> &nbsp; &nbsp; <b>Please wait...</b>
  `);
  $('#finish').attr('disabled', 'disabled');
  var input_type = $('#vtype').val();
  var desc = $('#desc').val();
  if (desc.length < 20) {
    swal('Invalid Description length','Please provide a valid description','error');
    $('#finish').html(`
      <b>Next</b>  &nbsp; &nbsp; <span class="fa fa-arrow-circle-right"></span>
    `);
    $('#finish').removeAttr('disabled');
  } else if ($('#input-file').get(0).files.length === 0){
    swal('No picture selected','Please select a valid image to continue','error');
    $('#finish').html(`
      <b>Next</b>  &nbsp; &nbsp; <span class="fa fa-arrow-circle-right"></span>
    `);
    $('#finish').removeAttr('disabled');
  } else {
    $('#block').html(`
    <div class="text-center" style="margin-top:200px;">
      <progress id="progressBar" value="1" style="width:60%;" max="100"></progress>
      <br><br>
      <p style="font-size:15px;color:#fff;font-weight:bold;lettter-spacing:1px">
        Uploading... &nbsp; <span id="pcent"></span>%
      </p>
    </div>
    `).fadeIn(500);
    var filer = $('#input-file').prop('files')[0];
    var form_data = new FormData();
      form_data.append('file', filer);
      form_data.append('desc', desc);
      form_data.append('type', input_type);
      $.ajax({
        xhr : function() {
          var xhr = new window.XMLHttpRequest();
          xhr.upload.addEventListener('progress', function(ev) {
            if (ev.lengthComputable) {
              // console.log('Byte loaded ' + ev.loaded); console.log('Total size ' + ev.total); console.log('Uploaded  ' + (ev.loaded/ev.total));
              var percent = Math.round((ev.loaded/ev.total) * 100);
              $('#progressBar').val(percent);
              $('#pcent').text(percent);
            }
          });
          return xhr;
        },
        type: "POST",url: site.url+"inludes/library.php?action=regged",dataType: "JSON",data: form_data,contentType: false,processData: false,
        success: function(response){
          $('#block').fadeOut(400);
          if (response.status == 'success') {
          $.notify({
            icon: 'fa fa-info-circle',title: ' &nbsp; ',message: response.msg
          },{
            type: "success",delay: 0,placement: {from: "top",align: "center"}
          });
          if ('url' in response) {
            setTimeout(function() {
              window.location.assign(response.url);
            }, 2000);
          }
        } else if(response.status == 'error') {
          $.each(response, function(index, msg) {
            if (index == 'status') {
            } else {
              flash('danger',' &nbsp; ',msg);
            }
          });
          $('#finish').html(`
            <b>Next</b>  &nbsp; &nbsp; <span class="fa fa-arrow-circle-right"></span>
          `);
          $('#finish').removeAttr('disabled');
        }
        }
    });
  }
});

$(document).on('change','#input-file', function() {
  var filer = $('#input-file').prop('files')[0];
  var imagefile = filer.type;
  var match= ["image/jpeg","image/png","image/jpg"];
  if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))) {
    swal('Error invalid file','Please select a valid picture','error');
  } else if((filer.size/1000000) > 2.1){
    swal('Error on picture size','Image size greater than 2MB.<br>Try again with a different image!','error');
  } else {
    var reader = new FileReader();
    reader.onload = function(e) {
      data = '<br><img src="'+reader.result+'" width="100%"><br><br>';
    swal({
      position:'top',
      type: 'info',
      allowOutsideClick:false,
      title:'Set a profile picture',
      showCancelButton:true,
      cancelButtonColor:'#ff6666',
      reverseButtons:true,
      confirmButtonText:'Use picture',
      html: data,
    }).then((result)=>{
      if (result.value) {
        $('#upload-file-div').addClass('select-success');
        swal('Picture selected','Proceed to fill description field below.','success');
        $('#desc').focus();
      } else {
        $('#upload-file-div').removeClass('select-success');
        swal('No picture selected','Please select an image to proceed.','error');
        $('#input-file').val('');
      }
    });
    }
    reader.readAsDataURL(this.files[0]);
  }
  $('#upload-file-div').html(`<span class='fa fa-camera'></span>&nbsp; Upload another picture`);
});


  // ----------------------------------------


jQuery(function ($) {

    $(".sidebar-dropdown > a").click(function() {
  $(".sidebar-submenu").slideUp(200);
  if (
    $(this)
      .parent()
      .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .parent()
      .removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .next(".sidebar-submenu")
      .slideDown(200);
    $(this)
      .parent()
      .addClass("active");
  }
});

$("#close-sidebar").click(function() {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function() {
  $(".page-wrapper").addClass("toggled");
});


   
   
});


$('#collapseExample').collapse({
  toggle: false
})
//===================================

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "180px";
  document.getElementById("main").style.marginLeft = "180px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0"; 
} 

function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('number').value = value;
}