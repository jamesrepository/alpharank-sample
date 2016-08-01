$(document).ready(function() {


  $('#contact_form').submit(function(e) {

  		// e.preventDefault();
  		var $name = $('#name').val();
      var $email = $('#email').val();
      var $phone = $('#phone').val();
      var $company = $('#company').val();
  		var $message = $('#message').val();
      var mails = {
  			name: $name,
  			email: $email,
  			phone: $phone,
  			company: $company,
        message: $message
  		};

      $.ajax({
        type: 'POST',
        url: '/',
        processData: true,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(mails),
        success: function(data) {
          if(data == "200") {
            console.log('success', data);
            window.location.href = '/email-sent';

          } else {
            window.location.href = '/email-error';
            console.log('success', data);
          }
        }
      });

  });

});
