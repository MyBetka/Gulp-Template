(function() {
  
	var app = {
		
		initialize : function () {			
			this.modules();
			this.setUpListeners();
		},
 
		modules: function () {
 
		},
 
		setUpListeners: function () {
			$('form').on('submit', app.submitForm);
			$('form').on('keydown', 'input', app.removeError)
		},
 
		submitForm: function (e) {
			e.preventDefault();

			var form = $(this),
				submitBtn = form.find('button[type="submit"]')


			if(app.validateform(form) === false) return false;

			submitBtn.attr('disabled', 'disabled');

			var str = form.serialize();

			$.ajax({
				url: '../form.php',
				type: 'POST',
				data: str
			})
			.done(function() {
				if(msg === "OK"){
					var result = "<div = 'bg-success'>Дякуєио за заявку! Ми вам передзвонимо!</div>"
					form.html(result);
				}else{
					form.html(msg);
				}
			})
			.always(function() {
				submitBtn.removeAttr('disabled')
			})
		},

		validateform: function (form){
			var inputs = form.find('input'),
				valid = true;


			$.each(inputs, function(index, val){
				var input = $(val),
					val = input.val(),
					inputPhone = $('#inputPhone'),
					inputPhoneVal = inputPhone.val(),
					InputPhoneGroup = inputPhone.parent(),
					re = /^[0-9]*$/,
					formGroup = input.parents('.form-group'),
					lable = formGroup.find('label').text().toLowerCase(),
					textError = 'Введите ' + lable;


				if(val.length === 0  || inputPhoneVal.length < 6 ){
					formGroup.addClass('has-error').removeClass('has-success');
					formGroup.prepend('<div class="error-text"><p>Введіть ' + lable + '</p></div>');
					valid = false;
				} else if(!re.test(inputPhoneVal)){
					formGroup.addClass('has-error').removeClass('has-success');
					InputPhoneGroup.prepend('<div class="error-text"><p>Ви ввели некоректний номер</p></div>');
					valid = false;
				} else{
					formGroup.addClass('has-success').removeClass('has-error');
				};



	
			});

			return valid;
		},

		removeError: function () {
			$(this).parents('.form-group').removeClass('has-error');
			var 
				formsGroupError = $('.form-group');
				
			for (var i = 0; i < formsGroupError.length; i++) {
				var formGroupError = formsGroupError[i];
				var errortext1 = $(this).parent().children().remove('.error-text');
			}
		}	
		
	}
 
	app.initialize();
 
}());